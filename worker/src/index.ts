/**
 * ilezaremont.pl — Cloudflare Worker API
 *
 * Flow:
 * 1. Stripe webhook → /webhook/stripe
 *    → saves order in KV
 *    → sends "preparing" email to customer
 *    → sends notification email to admin (Ewelina) with AUTHORIZE link
 *
 * 2. Admin clicks → /authorize/:orderId
 *    → shows order details + "Send report" button
 *
 * 3. Admin confirms → /send-report/:orderId
 *    → sends report PDF to customer via email
 *    → marks order as fulfilled
 */

export interface Env {
  ORDERS: KVNamespace;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  ADMIN_EMAIL: string;
  FROM_EMAIL: string;
  SITE_URL: string;
}

interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: string;
  city: string;
  serviceType: string;
  createdAt: string;
  status: 'pending' | 'authorized' | 'sent';
  stripeSessionId: string;
}

// ─── CORS helpers ───
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders },
  });
}

// ─── Stripe signature verification ───
async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const parts = signature.split(',').reduce(
    (acc, part) => {
      const [key, value] = part.split('=');
      if (key === 't') acc.timestamp = value;
      if (key === 'v1') acc.signatures.push(value);
      return acc;
    },
    { timestamp: '', signatures: [] as string[] },
  );

  const signedPayload = `${parts.timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return parts.signatures.includes(expectedSignature);
}

// ─── Email via Resend ───
async function sendEmail(
  env: Env,
  to: string,
  subject: string,
  html: string,
  attachments?: { filename: string; content: string }[],
): Promise<boolean> {
  const body: Record<string, unknown> = {
    from: `ilezaremont.pl <${env.FROM_EMAIL}>`,
    to: [to],
    subject,
    html,
  };
  if (attachments) {
    body.attachments = attachments;
  }

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    console.error('Resend error:', await resp.text());
  }
  return resp.ok;
}

// ─── Route: POST /webhook/stripe ───
async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  const body = await request.text();
  const signature = request.headers.get('Stripe-Signature');

  if (!signature) {
    return jsonResponse({ error: 'Missing signature' }, 400);
  }

  const isValid = await verifyStripeSignature(body, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!isValid) {
    return jsonResponse({ error: 'Invalid signature' }, 401);
  }

  const event = JSON.parse(body);

  if (event.type !== 'checkout.session.completed') {
    return jsonResponse({ received: true });
  }

  const session = event.data.object;
  const orderId = crypto.randomUUID().slice(0, 8);

  // Extract metadata — Stripe Payment Link sends custom_fields or metadata
  const order: Order = {
    id: orderId,
    customerEmail: session.customer_email || session.customer_details?.email || '',
    customerName: session.customer_details?.name || '',
    amount: session.amount_total / 100,
    currency: session.currency?.toUpperCase() || 'PLN',
    city: session.metadata?.miasto || session.custom_fields?.[0]?.text?.value || 'nie podano',
    serviceType: session.metadata?.typ || session.custom_fields?.[1]?.text?.value || 'remont',
    createdAt: new Date().toISOString(),
    status: 'pending',
    stripeSessionId: session.id,
  };

  // Save to KV (expire after 30 days)
  await env.ORDERS.put(`order:${orderId}`, JSON.stringify(order), {
    expirationTtl: 60 * 60 * 24 * 30,
  });

  // 1) Email to customer — "Your report is being prepared"
  await sendEmail(
    env,
    order.customerEmail,
    'Twoj raport jest w przygotowaniu — ilezaremont.pl',
    customerPendingEmailHtml(order),
  );

  // 2) Email to admin (Ewelina) — notification with authorize link
  const workerUrl = new URL(request.url).origin;
  const authorizeUrl = `${workerUrl}/authorize/${orderId}`;

  await sendEmail(
    env,
    env.ADMIN_EMAIL,
    `Nowe zamowienie #${orderId} — ${order.customerEmail}`,
    adminNotificationEmailHtml(order, authorizeUrl),
  );

  console.log(`Order ${orderId} created for ${order.customerEmail}`);
  return jsonResponse({ received: true, orderId });
}

// ─── Route: GET /authorize/:orderId ───
async function handleAuthorize(orderId: string, env: Env, request: Request): Promise<Response> {
  const data = await env.ORDERS.get(`order:${orderId}`);
  if (!data) {
    return htmlResponse('<h1>Zamowienie nie znalezione</h1><p>Link mogl wygasnac.</p>', 404);
  }

  const order: Order = JSON.parse(data);
  const workerUrl = new URL(request.url).origin;

  return htmlResponse(`
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Autoryzacja raportu #${order.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, sans-serif; background: #f1f5f9; padding: 2rem; }
        .card {
          max-width: 500px; margin: 2rem auto; background: white;
          border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 1.5rem; }
        .header h1 { font-size: 1.25rem; }
        .body { padding: 1.5rem; }
        .field { margin-bottom: 1rem; }
        .field label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
        .field p { font-size: 1rem; font-weight: 600; color: #1e293b; margin-top: 0.25rem; }
        .status {
          display: inline-block; padding: 0.25rem 0.75rem; border-radius: 999px;
          font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
        }
        .status.pending { background: #fef3c7; color: #92400e; }
        .status.authorized { background: #d1fae5; color: #065f46; }
        .status.sent { background: #dbeafe; color: #1e40af; }
        .btn {
          display: block; width: 100%; padding: 1rem; border: none; border-radius: 8px;
          font-size: 1rem; font-weight: 700; cursor: pointer; text-align: center;
          margin-top: 1.5rem; transition: all 0.2s;
        }
        .btn-send { background: #16a34a; color: white; }
        .btn-send:hover { background: #15803d; }
        .btn-done { background: #94a3b8; color: white; cursor: default; }
        .msg { margin-top: 1rem; padding: 1rem; border-radius: 8px; text-align: center; }
        .msg.success { background: #d1fae5; color: #065f46; }
        .msg.error { background: #fee2e2; color: #991b1b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Zamowienie #${order.id}</h1>
        </div>
        <div class="body">
          <div class="field">
            <label>Klient</label>
            <p>${order.customerEmail}</p>
          </div>
          <div class="field">
            <label>Imie</label>
            <p>${order.customerName || '—'}</p>
          </div>
          <div class="field">
            <label>Miasto</label>
            <p>${order.city}</p>
          </div>
          <div class="field">
            <label>Usluga</label>
            <p>${order.serviceType}</p>
          </div>
          <div class="field">
            <label>Kwota</label>
            <p>${order.amount} ${order.currency}</p>
          </div>
          <div class="field">
            <label>Data</label>
            <p>${new Date(order.createdAt).toLocaleString('pl-PL')}</p>
          </div>
          <div class="field">
            <label>Status</label>
            <p><span class="status ${order.status}">${
              order.status === 'pending' ? 'Oczekuje' :
              order.status === 'authorized' ? 'Autoryzowane' : 'Wyslane'
            }</span></p>
          </div>

          <div id="action">
            ${order.status === 'sent'
              ? '<button class="btn btn-done" disabled>Raport zostal juz wyslany</button>'
              : `<button class="btn btn-send" onclick="sendReport()">
                   Wyslij raport do klienta
                 </button>`
            }
          </div>
          <div id="message"></div>
        </div>
      </div>

      <script>
        async function sendReport() {
          const btn = document.querySelector('.btn-send');
          btn.textContent = 'Wysylanie...';
          btn.disabled = true;

          try {
            const resp = await fetch('${workerUrl}/send-report/${order.id}', {
              method: 'POST',
            });
            const data = await resp.json();

            if (resp.ok) {
              document.getElementById('action').innerHTML =
                '<button class="btn btn-done" disabled>Raport wyslany!</button>';
              document.getElementById('message').innerHTML =
                '<div class="msg success">Raport zostal wyslany na adres ${order.customerEmail}</div>';
            } else {
              throw new Error(data.error || 'Blad wysylki');
            }
          } catch (err) {
            document.getElementById('message').innerHTML =
              '<div class="msg error">Blad: ' + err.message + '</div>';
            btn.textContent = 'Wyslij raport do klienta';
            btn.disabled = false;
          }
        }
      </script>
    </body>
    </html>
  `);
}

// ─── Route: POST /send-report/:orderId ───
async function handleSendReport(orderId: string, env: Env): Promise<Response> {
  const data = await env.ORDERS.get(`order:${orderId}`);
  if (!data) {
    return jsonResponse({ error: 'Order not found' }, 404);
  }

  const order: Order = JSON.parse(data);

  if (order.status === 'sent') {
    return jsonResponse({ error: 'Report already sent' }, 400);
  }

  // TODO: In production, attach the actual generated PDF here.
  // For now, send a link to download or a placeholder.
  // You can either:
  // 1. Store the PDF in R2 and include a download link
  // 2. Attach the PDF as base64 in the email
  // 3. Generate and store on-demand

  const reportUrl = `${env.SITE_URL}/raport-przyklad.pdf`;

  await sendEmail(
    env,
    order.customerEmail,
    'Twoj raport jest gotowy — ilezaremont.pl',
    customerReportReadyEmailHtml(order, reportUrl),
  );

  // Update order status
  order.status = 'sent';
  await env.ORDERS.put(`order:${orderId}`, JSON.stringify(order), {
    expirationTtl: 60 * 60 * 24 * 30,
  });

  // Notify admin
  await sendEmail(
    env,
    env.ADMIN_EMAIL,
    `Raport wyslany — #${orderId} → ${order.customerEmail}`,
    `<p>Raport dla <strong>${order.customerEmail}</strong> (zamowienie #${orderId}) zostal wyslany.</p>`,
  );

  return jsonResponse({ success: true, sentTo: order.customerEmail });
}

// ─── Route: GET /orders (admin — list recent orders) ───
async function handleListOrders(env: Env): Promise<Response> {
  const list = await env.ORDERS.list({ prefix: 'order:' });
  const orders: Order[] = [];

  for (const key of list.keys) {
    const val = await env.ORDERS.get(key.name);
    if (val) orders.push(JSON.parse(val));
  }

  orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return jsonResponse(orders);
}

// ─── Email HTML templates ───
function customerPendingEmailHtml(order: Order): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 1.5rem; border-radius: 12px 12px 0 0; text-align: center;">
        <img src="https://ilezaremont.pl/images/logo@2x.png" alt="ilezaremont.pl - Mapa Cen Remontów" width="180" style="height: auto; display: inline-block; background: white; padding: 8px 16px; border-radius: 8px;" />
      </div>
      <div style="background: white; padding: 2rem; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1e293b;">Dziekujemy za zakup!</h2>
        <p style="color: #475569; line-height: 1.6;">
          Twoj indywidualny raport kosztow remontu jest w trakcie przygotowania.
          Otrzymasz go na ten adres email <strong>w ciagu maksymalnie 1 godziny</strong>.
        </p>
        <div style="background: #f8fafc; border-radius: 8px; padding: 1rem; margin: 1.5rem 0;">
          <p style="margin: 0; color: #64748b; font-size: 0.875rem;">Zamowienie #${order.id}</p>
          <p style="margin: 0.5rem 0 0; color: #1e293b; font-weight: 600;">${order.amount} ${order.currency}</p>
        </div>
        <p style="color: #475569; line-height: 1.6;">
          Raport zostanie przygotowany przez nasz zespol i dostarczony na adres: <strong>${order.customerEmail}</strong>
        </p>
        <p style="color: #94a3b8; font-size: 0.75rem; margin-top: 2rem;">
          W razie pytan: raport@ilezaremont.pl
        </p>
      </div>
    </div>
  `;
}

function adminNotificationEmailHtml(order: Order, authorizeUrl: string): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc2626; padding: 1.5rem; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 1.25rem;">Nowe zamowienie!</h1>
      </div>
      <div style="background: white; padding: 2rem; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0.5rem 0; color: #64748b; font-size: 0.875rem;">Email:</td>
            <td style="padding: 0.5rem 0; font-weight: 600;">${order.customerEmail}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #64748b; font-size: 0.875rem;">Imie:</td>
            <td style="padding: 0.5rem 0; font-weight: 600;">${order.customerName || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #64748b; font-size: 0.875rem;">Miasto:</td>
            <td style="padding: 0.5rem 0; font-weight: 600;">${order.city}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #64748b; font-size: 0.875rem;">Usluga:</td>
            <td style="padding: 0.5rem 0; font-weight: 600;">${order.serviceType}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #64748b; font-size: 0.875rem;">Kwota:</td>
            <td style="padding: 0.5rem 0; font-weight: 600;">${order.amount} ${order.currency}</td>
          </tr>
        </table>

        <a href="${authorizeUrl}" style="
          display: block; text-align: center; padding: 1rem;
          background: #16a34a; color: white; border-radius: 8px;
          text-decoration: none; font-weight: 700; font-size: 1rem;
          margin-top: 1.5rem;
        ">
          Przygotuj i wyslij raport
        </a>

        <p style="color: #94a3b8; font-size: 0.75rem; margin-top: 1rem; text-align: center;">
          Kliknij przycisk, aby zobaczyc szczegoly zamowienia i autoryzowac wyslanie raportu.
        </p>
      </div>
    </div>
  `;
}

function customerReportReadyEmailHtml(order: Order, reportUrl: string): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 1.5rem; border-radius: 12px 12px 0 0; text-align: center;">
        <img src="https://ilezaremont.pl/images/logo@2x.png" alt="ilezaremont.pl - Mapa Cen Remontów" width="180" style="height: auto; display: inline-block; background: white; padding: 8px 16px; border-radius: 8px;" />
      </div>
      <div style="background: white; padding: 2rem; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1e293b;">Twoj raport jest gotowy!</h2>
        <p style="color: #475569; line-height: 1.6;">
          Twoj indywidualny raport kosztow remontu zostal przygotowany i jest gotowy do pobrania.
        </p>

        <a href="${reportUrl}" style="
          display: block; text-align: center; padding: 1rem;
          background: #1e40af; color: white; border-radius: 8px;
          text-decoration: none; font-weight: 700; font-size: 1rem;
          margin: 1.5rem 0;
        ">
          Pobierz raport PDF
        </a>

        <div style="background: #f8fafc; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
          <p style="margin: 0; color: #475569; font-size: 0.875rem;">
            Zamowienie #${order.id} | ${order.amount} ${order.currency}
          </p>
        </div>

        <p style="color: #475569; line-height: 1.6; font-size: 0.875rem;">
          Raport jest Twoim indywidualnym dokumentem. Zawiera szczegolowa analize kosztow
          remontu dla Twojego miasta i wybranej uslugi. Jesli masz pytania, pisz na
          raport@ilezaremont.pl.
        </p>

        <p style="color: #94a3b8; font-size: 0.75rem; margin-top: 2rem;">
          ilezaremont.pl | Adsales sp. z o.o.
        </p>
      </div>
    </div>
  `;
}

// ─── Main router ───
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // POST /webhook/stripe
      if (path === '/webhook/stripe' && request.method === 'POST') {
        return handleStripeWebhook(request, env);
      }

      // GET /authorize/:orderId
      const authorizeMatch = path.match(/^\/authorize\/([a-z0-9-]+)$/);
      if (authorizeMatch && request.method === 'GET') {
        return handleAuthorize(authorizeMatch[1], env, request);
      }

      // POST /send-report/:orderId
      const sendMatch = path.match(/^\/send-report\/([a-z0-9-]+)$/);
      if (sendMatch && request.method === 'POST') {
        return handleSendReport(sendMatch[1], env);
      }

      // GET /orders (admin panel)
      if (path === '/orders' && request.method === 'GET') {
        return handleListOrders(env);
      }

      // Health check
      if (path === '/' || path === '/health') {
        return jsonResponse({ status: 'ok', service: 'ilezaremont-api' });
      }

      return jsonResponse({ error: 'Not found' }, 404);
    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  },
};

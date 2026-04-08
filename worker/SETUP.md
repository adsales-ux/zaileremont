# Instrukcja wdrozenia — ilezaremont-api Worker

## Jak to dziala

```
Klient placi na Stripe
        |
        v
Stripe webhook --> Worker /webhook/stripe
        |
        +--> Email do klienta: "Raport w przygotowaniu, max 1h"
        +--> Email do Eweliny: "Nowe zamowienie!" + link [Przygotuj i wyslij]
                                                        |
                                                        v
                                            Ewelina klika link
                                            /authorize/:orderId
                                            (widzi szczegoly zamowienia)
                                                        |
                                                        v
                                            Klika "Wyslij raport"
                                            POST /send-report/:orderId
                                                        |
                                                        v
                                            Email do klienta z PDF raportem
```

## Krok 1: Resend (darmowy serwis email)

1. Wejdz na https://resend.com i zaloz konto
2. Dodaj domene `ilezaremont.pl`:
   - Settings → Domains → Add Domain
   - Dodaj rekordy DNS (TXT, CNAME) w Cloudflare
   - Poczekaj na weryfikacje
3. Wygeneruj API Key: Settings → API Keys → Create API Key
4. Zapisz klucz (zaczyna sie od `re_...`)

## Krok 2: Stripe Webhook

1. Wejdz w Stripe Dashboard → Developers → Webhooks
2. Kliknij "Add endpoint"
3. URL: `https://ilezaremont-api.<twoj-account>.workers.dev/webhook/stripe`
   (lub pozniej wlasna domena, np. `https://api.ilezaremont.pl/webhook/stripe`)
4. Wybierz zdarzenie: `checkout.session.completed`
5. Zapisz "Signing secret" (zaczyna sie od `whsec_...`)

## Krok 3: Deploy Workera

```bash
cd worker/

# Zainstaluj zaleznosci
npm install

# Utworz KV namespace
npx wrangler kv namespace create ORDERS
# → Skopiuj ID i wklej do wrangler.toml

# Ustaw sekrety
npx wrangler secret put STRIPE_WEBHOOK_SECRET
# → Wklej whsec_...

npx wrangler secret put RESEND_API_KEY
# → Wklej re_...

# Deploy
npx wrangler deploy
```

## Krok 4: Wlasna domena (opcjonalnie)

1. W Cloudflare Dashboard → Workers → ilezaremont-api → Settings → Triggers
2. Dodaj Custom Domain: `api.ilezaremont.pl`
3. Zaktualizuj URL webhooka w Stripe na: `https://api.ilezaremont.pl/webhook/stripe`

## Krok 5: Stripe Payment Link — dodaj metadata

W Stripe Dashboard → Payment Links → Twoj link:
- Dodaj Custom Fields: "Miasto", "Typ uslugi"
- Lub dodaj metadata do sesji checkout

---

## Endpointy

| Metoda | URL                         | Opis                              |
|--------|-----------------------------|-----------------------------------|
| POST   | /webhook/stripe             | Odbiera platnosci ze Stripe       |
| GET    | /authorize/:orderId         | Panel autoryzacji (dla Eweliny)   |
| POST   | /send-report/:orderId       | Wysyla raport do klienta          |
| GET    | /orders                     | Lista zamowien (JSON)             |
| GET    | /health                     | Health check                      |

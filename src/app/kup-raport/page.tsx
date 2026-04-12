'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import CountdownTimer from '@/components/ui/CountdownTimer';

function KupRaportContent() {
  const searchParams = useSearchParams();
  const typ = searchParams.get('typ') || 'remont';
  const miasto = searchParams.get('miasto') || '';
  const ksztalt = searchParams.get('ksztalt') || '';
  const dlugosc = searchParams.get('dlugosc') || '';

  // URL step tracking for pixel integration
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('krok', 'zakup');
    window.history.replaceState({}, "", url.toString());
  }, []);
  const [email, setEmail] = useState('');

  const titleMap: Record<string, string> = {
    kuchnia: 'Kuchnia na wymiar',
    lazienka: 'Remont Åazienki',
    malowanie: 'Malowanie Åcian',
    plytki: 'UkÅadanie pÅytek',
    okna: 'Okna PCV',
    remont: 'Raport cenowy',
  };

  const title = titleMap[typ] || titleMap['remont'];

  const stripeUrl = `https://buy.stripe.com/4gM3cv2Ub3cu9vv7i800000`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Hero z inspiracjÄ */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
          <div className="grid grid-cols-3 h-52">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=350&fit=crop&q=80"
              alt="PiÄkna nowoczesna kuchnia"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=350&fit=crop&q=80"
              alt="Jasna kuchnia z drewnianymi szafkami"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=350&fit=crop&q=80"
              alt="Rodzina gotujÄca razem w kuchni"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
            <h1 className="text-3xl font-bold mb-1">
              Nie przepÅacaj za kuchniÄ marzeÅ
            </h1>
            <p className="text-white/80 text-lg">
              {title}{miasto ? ` â ${miasto}` : ''}{ksztalt ? ` (${ksztalt}` : ''}{dlugosc ? `, ${dlugosc} mb)` : ksztalt ? ')' : ''}
            </p>
          </div>
        </div>

        {/* Sekcja korzyÅci â co zyskujesz */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Co zyskujesz z raportem?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">ð°</span>
              <div>
                <p className="font-semibold text-slate-800">OszczÄdnoÅÄ 5 000 â 7 000 zÅ</p>
                <p className="text-sm text-slate-500">Wiesz ile naprawdÄ kosztuje kaÅ¼dy element. Nie dasz siÄ naciÄgnÄÄ wykonawcy ani salonowi meblowemu.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">â±ï¸</span>
              <div>
                <p className="font-semibold text-slate-800">OszczÄdnoÅÄ 20+ godzin</p>
                <p className="text-sm text-slate-500">Zamiast jeÅºdziÄ po 5 salonach i zbieraÄ wyceny â dostajesz porÃ³wnanie w jednym PDF w ciÄgu 1 godziny.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">ð¡ï¸</span>
              <div>
                <p className="font-semibold text-slate-800">Unikasz kosztownych bÅÄdÃ³w</p>
                <p className="text-sm text-slate-500">Checklista 15 checkpunktÃ³w ukÅadu kuchni â nie popeÅnisz bÅÄdÃ³w, ktÃ³re kosztujÄ tysiÄce zÅotych do naprawienia.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">ð¤</span>
              <div>
                <p className="font-semibold text-slate-800">Negocjujesz z pozycji siÅy</p>
                <p className="text-sm text-slate-500">20-punktowa checklista negocjacyjna â wiesz o co pytaÄ, czego wymagaÄ i jak zbiÄ cenÄ nawet o 15â20%.</p>
              </div>
            </div>
          </div>
        </div>


        {/* Karta produktu z pÅatnoÅciÄ */}
        <div className="bg-white rounded-xl border-2 border-orange-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-lg">PeÅny raport PDF</span>
                <p className="text-orange-100 text-sm mt-0.5">Dostajesz na e-mail w ciÄgu 1 godziny</p>
              </div>
              <div className="text-right">
                <span className="text-lg line-through text-white/50 decoration-red-300 decoration-2 block">69,99 zÅ</span>
                <span className="text-4xl font-extrabold">29,99 zÅ</span>
                <span className="block text-xs text-orange-200 font-medium mt-0.5">-57% taniej!</span>
              </div>
            </div>
            <CountdownTimer className="mt-3" />
          </div>

          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Co zawiera raport:</p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">â</span>
                Ceny minimalne, Årednie i maksymalne dla Twojego miasta
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">â</span>
                PorÃ³wnanie cen w 15 miastach Polski
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">â</span>
                Rozbicie kosztÃ³w element po elemencie
              </li>
              {typ === 'kuchnia' && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-bold">â</span>
                    Ceny u 4 dostawcÃ³w: IKEA, Agata, Castorama, stolarz
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-bold">â</span>
                    20-punktowa checklista negocjacyjna (jak zbiÄ cenÄ)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-bold">â</span>
                    15 checkpunktÃ³w optymalnego ukÅadu kuchni (uniknij bÅÄdÃ³w)
                  </li>
                </>
              )}
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">â</span>
                WzÃ³r umowy z wykonawcÄ + protokÃ³Å odbioru
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">â</span>
                Trend cenowy 12 miesiÄcy + prognoza
              </li>
            </ul>
          </div>

          <div className="border-t border-orange-100 px-6 py-5 bg-orange-50/30">
            {/* Formularz email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                E-mail (raport wyÅlemy na ten adres)
              </label>
              <input
                type="email"
                placeholder="twoj@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Button Stripe */}
            <a
              href={stripeUrl}
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-center shadow-lg hover:shadow-xl text-lg"
            >
              KupujÄ raport â <span className="line-through text-white/50 decoration-red-300 decoration-2 mr-1">69,99 zÅ</span> <span className="text-xl font-extrabold">29,99 zÅ</span>
            </a>

            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
              <span>BLIK</span>
              <span>Â·</span>
              <span>Karta</span>
              <span>Â·</span>
              <span>Przelew</span>
              <span>Â·</span>
              <span>Google Pay</span>
            </div>
          </div>
        </div>

        {/* Bez raportu vs z raportem */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-bold text-red-800 mb-2">Bez raportu:</p>
            <ul className="text-xs text-red-700 space-y-1.5">
              <li>Jedziesz do 5 salonÃ³w â tracisz weekendy</li>
              <li>Nie wiesz czy cena jest dobra</li>
              <li>Wykonawca zawyÅ¼a pozycje o 20â30%</li>
              <li>BÅÄdy w ukÅadzie kosztujÄ 3â8 tys. zÅ</li>
              <li>Nie wiesz o co pytaÄ przy odbiorze</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-bold text-green-800 mb-2">Z raportem za 29,99 zÅ:</p>
            <ul className="text-xs text-green-700 space-y-1.5">
              <li>PorÃ³wnanie 4 dostawcÃ³w w jednym raporcie</li>
              <li>Znasz cenÄ MIN, ÅR i MAX kaÅ¼dego elementu</li>
              <li>Checklista negocjacyjna â zbijasz cenÄ</li>
              <li>15 checkpunktÃ³w â zero kosztownych bÅÄdÃ³w</li>
              <li>WzÃ³r umowy + protokÃ³Å odbioru</li>
            </ul>
          </div>
        </div>

        {/* Social proof */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-amber-900 font-medium mb-2">Czy wiesz, Å¼e...</p>
          <p className="text-sm text-amber-800">
            Åredni Polak przepÅaca za remont kuchni od 3 000 do 8 000 zÅ, bo nie zna realnych cen rynkowych i nie wie o co pytaÄ wykonawcÄ.
            Nasz raport kosztuje mniej niÅ¼ kawa w salonie meblowym â a moÅ¼e zaoszczÄdziÄ Ci wielokrotnoÅÄ tej kwoty.
          </p>
        </div>

        {/* Jak to dziaÅa */}
        <div className="text-center mb-8">
          <h3 className="font-bold text-slate-800 mb-4">Jak to dziaÅa?</h3>
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-600">
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-orange-700">1</span>
              </div>
              <p className="font-medium text-slate-800">ZapÅaÄ 29,99 zÅ</p>
              <p className="mt-0.5">BLIK, karta lub przelew</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-orange-700">2</span>
              </div>
              <p className="font-medium text-slate-800">SprawdÅº e-mail</p>
              <p className="mt-0.5">Raport PDF w ciÄgu 1 godziny</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-orange-700">3</span>
              </div>
              <p className="font-medium text-slate-800">Negocjuj z wiedzÄ</p>
              <p className="mt-0.5">OszczÄdÅº nawet 7 000 zÅ</p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>â¡</span>
            <span>Dostawa w ciÄgu 1h</span>
          </div>
          <div className="flex items-center gap-1">
            <span>ð</span>
            <span>Bezpieczna pÅatnoÅÄ Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KupRaportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Åadowanie...</div>}>
      <KupRaportContent />
    </Suspense>
  );
        }

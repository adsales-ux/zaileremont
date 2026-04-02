import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metodologia wyceny — jak obliczamy ceny remontów | ilezaremont.pl',
  description:
    'Poznaj metodologię Price Map ilezaremont.pl. Jak obliczamy ceny remontów? Jakie są źródła danych? Jak działa algorytm? Transparent i oparty na danych.',
  keywords: [
    'metodologia',
    'algorytm',
    'ceny remontów',
    'wycena',
    'dane',
    'price map',
  ],
  openGraph: {
    title: 'Metodologia wyceny remontów',
    description: 'Transparent metodologia i algorytm obliczania cen remontów',
    type: 'website',
  },
};

export default function MetodologiaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Jak obliczamy ceny remontów',
    description: 'Transparent metodologia i algorytm obliczania cen remontów',
    author: {
      '@type': 'Organization',
      name: 'ilezaremont.pl',
    },
    dateModified: '2026-03-30',
  };

  return (
    <>
      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Jak obliczamy ceny remontów
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Nasza metodologia — transparentna i oparta na danych
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-16">
          {/* Section 1: Źródła Danych */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Źródła danych
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Nasze wyceny opierają się na wielowarstwowych danych zbieranych z trzech głównych źródeł:
            </p>

            <div className="space-y-6">
              {/* Data Source 1 */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  1. Dane od wykonawców
                </h3>
                <p className="text-slate-600">
                  Współpracujemy z siecią wykonawców z całej Polski. Zbieramy dane o cenach usług remontowych bezpośrednio od fachowców, co zapewnia nam dostęp do realnych cen rynkowych praktykowanych na terenie.
                </p>
              </div>

              {/* Data Source 2 */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  2. Cenniki materiałów budowlanych
                </h3>
                <p className="text-slate-600">
                  Monitorujemy ceny materiałów w największych sieciach marketów budowlanych (Leroy Merlin, Castorama, Praktiker, lokalne hurtownie). Dane aktualizujemy kwartalnie, aby odzwierciedlać zmiany cen na rynku.
                </p>
              </div>

              {/* Data Source 3 */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  3. Wskaźniki rynkowe GUS
                </h3>
                <p className="text-slate-600">
                  Wykorzystujemy oficjalne wskaźniki Głównego Urzędu Statystycznego: CPI dla usług budowlanych, indeksy produkcji budowlano-montażowej, dane o sezonowości pracy, oraz wskaźniki zatrudnienia w branży.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Model Algorytmiczny */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Model algorytmiczny
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Nasz algorytm uwzględnia wielowarstwowy system współczynników, które dostosowują ceny bazowe do konkretnych warunków:
            </p>

            <div className="mb-8 rounded-lg bg-slate-50 p-8">
              <h3 className="mb-6 text-lg font-semibold text-slate-900">
                Czynniki wpływające na wycenę:
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand-blue">
                    •
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Lokalizacja</p>
                    <p className="text-sm text-slate-600">
                      Miasto i województwo
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand-blue">
                    •
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Typ rynku</p>
                    <p className="text-sm text-slate-600">
                      Pierwotny vs wtórny
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand-blue">
                    •
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Standard wykończenia
                    </p>
                    <p className="text-sm text-slate-600">
                      Ekonomiczny, standard, premium
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand-blue">
                    •
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Złożoność prac
                    </p>
                    <p className="text-sm text-slate-600">
                      Prostota vs zaawansowanie
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand-blue">
                    •
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Sezonowość</p>
                    <p className="text-sm text-slate-600">
                      Zapotrzebowanie w danym okresie
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand-blue">
                    •
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Powierzchnia</p>
                    <p className="text-sm text-slate-600">
                      Metraż obiektu lub zakresu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
              <h3 className="mb-3 font-semibold text-slate-900">
                Rozkład cenowy i percentyle
              </h3>
              <p className="mb-4 text-slate-600">
                Model generuje rozkład cenowy z percentylami (10., 25., 50., 75., 90.), co pozwala na precyzyjne umiejscowienie Twojej wyceny na tle rynku. Mediana (50. percentyl) reprezentuje "środek" rynku, podczas gdy 10. i 90. percentyl pokazują najniższe i najwyższe ceny.
              </p>
              <p className="text-sm text-slate-600">
                Rozkład cen podlega rozkładowi logarytmiczno-normalnemu, co jest typowe dla cen usług — większość transakcji skupia się wokół wartości średniej, z długim ogonem wyższych cen dla projektów bardziej skomplikowanych.
              </p>
            </div>
          </div>

          {/* Section 3: Współczynniki Regionalne */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Współczynniki regionalne
            </h2>
            <p className="mb-8 text-slate-600">
              Warszawa jest naszym miastem referencyjnym (indeks = 1.00). Wszystkie inne miasta mają przypisane współczynniki, które odzwierciedlają ich pozycję na rynku remontów:
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">
                      Kategoria miasta
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">
                      Przykłady
                    </th>
                    <th className="px-6 py-3 text-right font-semibold text-slate-900">
                      Indeks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-3 text-slate-900">
                      Warszawa (referencja)
                    </td>
                    <td className="px-6 py-3 text-slate-600">Warszawa</td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-900">
                      1.00
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-3 text-slate-900">
                      Metropolie tier 1
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      Kraków, Wrocław, Poznań, Gdańsk
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-900">
                      0.88
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-3 text-slate-900">
                      Miasta duże (300k+)
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      Łódź, Szczecin, Bydgoszcz, Katowice
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-900">
                      0.82
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-3 text-slate-900">
                      Miasta średnie (100k-300k)
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      Radom, Kielce, Toruń, Gorzów Wielkopolski
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-900">
                      0.75
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-3 text-slate-900">
                      Miasta małe (20k-100k)
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      Suwałki, Bartoszyce, Żary, Nysa
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-900">
                      0.68
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-slate-900">
                      Miasta poniżej 20k / wieś
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      Gminy wiejskie, osiedla
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-900">
                      0.60
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-slate-600">
              Współczynnik mówi nam, ile procent ceny warszawskiej stanowi mediana wyceny w danym mieście. Na przykład, jeśli w Warszawie remont kosztuje 10 000 zł, w Krakowie wyniesie około 8 800 zł (10 000 × 0.88).
            </p>
          </div>

          {/* Section 4: Aktualizacja Danych */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Aktualizacja danych
            </h2>

            <div className="rounded-lg bg-green-50 p-6 border border-green-200">
              <p className="mb-3 text-slate-900">
                <span className="font-semibold">Model aktualizowany jest kwartalnie</span>
              </p>
              <p className="mb-4 text-slate-600">
                Ostatnia aktualizacja: <span className="font-semibold">marzec 2026</span>
              </p>
              <p className="text-slate-600">
                Każda aktualizacja uwzględnia najnowsze dane od wykonawców, zmiany cen materiałów budowlanych, wskaźniki GUS oraz nowe trendy na rynku remontów. Umożliwia to nam utrzymywanie wysokiej dokładności wycen przez cały rok.
              </p>
            </div>
          </div>

          {/* Section 5: Ograniczenia */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Ograniczenia i zastrzeżenia
            </h2>
            <p className="mb-6 text-slate-600">
              Transparentność jest dla nas ważna. Dlatego chcemy być szczerzy na temat tego, co nasze narzędzie może i czego nie może:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-lg bg-amber-50 p-4 border border-amber-200">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-900">
                  ⚠
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Ceny szacunkowe
                  </p>
                  <p className="text-sm text-slate-600">
                    Przedstawione ceny są szacunkowe i wynikają z modelowania statystycznego. Nie są to ceny gwarantowane.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-amber-50 p-4 border border-amber-200">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-900">
                  ⚠
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Indywidualne warunki
                  </p>
                  <p className="text-sm text-slate-600">
                    Rzeczywiste ceny mogą różnić się w zależności od indywidualnych warunków zlecenia: lokalizacji obiektu, stanu technicznego, dostępności materiałów, złożoności projektu, czasu realizacji i wielu innych czynników.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-amber-50 p-4 border border-amber-200">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-900">
                  ⚠
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Nie zastępuje wyceny
                  </p>
                  <p className="text-sm text-slate-600">
                    Nasz model nie zastępuje indywidualnej wyceny od wykonawcy. Zawsze warto poprosić o szczegółową ofertę.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-amber-50 p-4 border border-amber-200">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-900">
                  ⚠
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Punkt odniesienia do negocjacji
                  </p>
                  <p className="text-sm text-slate-600">
                    Zalecamy traktowanie wyników naszego kalkulatora jako punktu odniesienia do negocjacji, a nie jako ceny ostatecznej.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border border-blue-200">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Znasz już metodologię — teraz czas na wycenę
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/mapa-cen"
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white hover:bg-blue-800 transition-colors"
              >
                <span>Mapa Cen Remontów</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/kalkulator"
                className="flex items-center justify-center gap-2 rounded-lg bg-accent-orange px-6 py-3 font-semibold text-white hover:bg-orange-700 transition-colors"
              >
                <span>Oblicz koszt remontu</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

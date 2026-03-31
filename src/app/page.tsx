import Link from 'next/link';
import HeroSearchForm from '@/components/home/HeroSearchForm';
import CalculatorCards from '@/components/home/CalculatorCards';
import FAQAccordion from '@/components/home/FAQAccordion';

const FAQ_ITEMS = [
  {
    question: 'Jak dokładne są szacunki cen?',
    answer:
      'Nasze szacunki pochodzą z danych zebranych od ponad 500 zweryfikowanych wykonawców remontowych. Algorytm statystyczny analizuje oferty z Twojej lokalizacji, biorąc pod uwagę typ i rozmiar projektu. Dokładność wynosi zazwyczaj ±15%, choć może się różnić w zależności od specyfiki pracy.',
  },
  {
    question: 'Jak często aktualizowane są dane cenowe?',
    answer:
      'Ceny aktualizujemy kwartalnie, aby odzwierciedlać zmiany na rynku materiałów i siły roboczej. Ostatnia aktualizacja: marzec 2026. Monitorujemy także ceny materiałów budowlanych i wskaźniki GUS dla większej dokładności.',
  },
  {
    question: 'Czy mogę polegać na tych cenach przy rozmowach z wykonawcami?',
    answer:
      'Tak, nasze szacunki są dobrą bazą do negocjacji. Pokazują one mediany cenowe na rynku, co pomaga Ci zrozumieć, czy oferta od konkretnego wykonawcy jest konkurencyjna. Zawsze warto porównać kilka ofert i dostosować je do Twojej konkretnej sytuacji.',
  },
  {
    question: 'Co zawiera pełny raport cenowy?',
    answer:
      'Pełny raport zawiera: szczegółowy rozkład kosztów dla wybranej usługi, porównanie cen w Twojej lokalizacji i okolicy, wpływ różnych opcji na ostateczny koszt, listę zalecanego wyposażenia i materiałów, wskazówki negocjacyjne oraz linki do zaufanych dostawców.',
  },
  {
    question: 'Czy te ceny obejmują VAT?',
    answer:
      'Wyświetlane ceny to orientacyjne kwoty brutto (z VAT). Stawka VAT na usługi remontowe w budynkach mieszkalnych wynosi 8%. Przy większych projektach warto poprosić wykonawcę o osobną kalkulację z wyszczególnieniem kwot netto i brutto.',
  },
  {
    question: 'Czy mogę otrzymać spersonalizowaną wycenę?',
    answer:
      'Nasze kalkulatory dają szacunkowe ceny na podstawie ogólnych parametrów. Aby uzyskać dokładną wycenę, skontaktuj się z co najmniej trzema wykonawcami bezpośrednio. Oferujemy połączenia z partnerami, a otrzymany raport zawiera listę rekomendowanych specjalistów.',
  },
];

export default function Home() {
  const structuredDataFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataFAQ) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              Ile kosztuje Twój remont?
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Sprawdź ceny rynkowe w swoim mieście. Algorytm oparty na danych
              od wykonawców.
            </p>
          </div>

          {/* Search Form */}
          <div className="rounded-xl bg-white p-8 shadow-lg-card">
            <HeroSearchForm />
          </div>
        </div>
      </section>

      {/* Calculator Cards Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Wybierz usługę i poznaj koszt
            </h2>
            <p className="mt-4 text-slate-600">
              Kalkulatory dla najpopularniejszych usług remontowych
            </p>
          </div>

          <CalculatorCards />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Jak to działa?
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-brand-blue">1</span>
              </div>
              <h3 className="font-semibold text-slate-900">Wypełnij formularz</h3>
              <p className="mt-2 text-sm text-slate-600">
                Podaj miasto, rodzaj usługi i parametry projektu
              </p>

              {/* Connecting arrow */}
              <div className="absolute right-0 top-8 hidden -mr-4 h-0.5 w-4 bg-slate-300 sm:block" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl font-bold text-brand-green">2</span>
              </div>
              <h3 className="font-semibold text-slate-900">Otrzymaj wycenę</h3>
              <p className="mt-2 text-sm text-slate-600">
                Algorytm analizuje dane i wyznacza ceny dla Twojej lokalizacji
              </p>

              {/* Connecting arrow */}
              <div className="absolute right-0 top-8 hidden -mr-4 h-0.5 w-4 bg-slate-300 sm:block" />
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl font-bold text-accent-orange">3</span>
              </div>
              <h3 className="font-semibold text-slate-900">Pobierz raport</h3>
              <p className="mt-2 text-sm text-slate-600">
                Otrzymasz szczegółową analizę i porady dotyczące negocjacji
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Cen Teaser Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue to-blue-900 p-8 sm:p-12 text-white">
            <div className="grid gap-8 sm:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold">Mapa Cen Remontów</h2>
                <p className="mt-4 text-blue-100">
                  Interaktywna mapa pokazująca średnie ceny remontów w każdym
                  mieście Polski. Porównaj ceny w różnych województwach i
                  poznaj trendy rynkowe.
                </p>
                <Link
                  href="/mapa-cen"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-blue hover:bg-slate-50 transition-colors"
                >
                  Zobacz pełną mapę cen
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

              <div className="hidden sm:block">
                <div className="aspect-square rounded-lg bg-blue-800 p-8">
                  <div className="h-full rounded bg-blue-900 flex items-center justify-center">
                    <svg
                      className="h-24 w-24 text-blue-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6.447 3.268A1 1 0 0021 19.382V4.618a1 1 0 00-1.553-.894L9 7m0 13V7m6-4h.01M9 20h.01"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Jak wyliczamy ceny?
          </h2>

          <div className="space-y-6 text-slate-700">
            <p>
              Nasze ceny to wynik zaawansowanej analizy danych zbieranych z wielu źródeł.
              Każda wycena jest dostosowana do specyfiki Twojej lokalizacji, typu rynku
              i wymagań projektu.
            </p>

            <div className="rounded-lg bg-white p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Źródła danych:
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">•</span>
                  <span>Dane bezpośrednie od 500+ zweryfikowanych wykonawców</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">•</span>
                  <span>Cenniki materiałów od wiodących dystrybutorów</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">•</span>
                  <span>Wskaźniki GUS dotyczące kosztów pracy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">•</span>
                  <span>Współczynniki korekty dla każdego miasta i dzielnicy</span>
                </li>
              </ul>
            </div>

            <p>
              Algorytm wykorzystuje zaawansowaną analizę statystyczną i modele uczenia
              maszynowego, aby dostosować ceny do rzeczywistych warunków rynku. Wyniki
              są regularnie weryfikowane pod kątem dokładności.
            </p>

            <div className="text-center">
              <Link
                href="/metodologia"
                className="inline-flex items-center gap-2 text-brand-blue hover:text-blue-800 font-semibold"
              >
                Przeczytaj pełny opis metodologii
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

      {/* FAQ Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            Często zadawane pytania
          </h2>
          <p className="mb-12 text-center text-slate-600">
            Odpowiedzi na najczęstsze pytania dotyczące naszych kalkulatorów i cen
          </p>

          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-blue to-blue-900 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Gotów na wycenę?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Sprawdź ceny remontów w swoim mieście już teraz. To zajmie Ci
            zaledwie kilka minut.
          </p>
          <Link
            href="/kalkulator"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-orange px-8 py-4 font-semibold text-white hover:bg-orange-700 transition-colors"
          >
            Wybierz kalkulator
            <svg
              className="h-5 w-5"
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
      </section>
    </>
  );
}

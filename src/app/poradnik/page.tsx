import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poradnik remontowy — porady i cenniki 2026 | ilezaremont.pl',
  description:
    'Poradnik remontowy ilezaremont.pl. Artykuły, porady, cenniki usług remontowych, kosztorysy i wskazówki dla remontu domu lub mieszkania.',
  keywords: [
    'poradnik remontowy',
    'porady',
    'cenniki',
    'remont',
    'jak zrobić remont',
    '2026',
  ],
  openGraph: {
    title: 'Poradnik remontowy — porady i cenniki 2026',
    description: 'Artykuły, porady i cenniki usług remontowych',
    type: 'website',
  },
};

export default function PoradnikPage() {
  const articles = [
    {
      id: 'okna-pcv',
      title: 'Ile kosztują okna PCV w 2026 roku?',
      description:
        'Ceny okien jednoskrzydłowych, dwuskrzydłowych, balkonowych i dachowych. Dwuszybowe vs trzyszybowe. Porównanie cen z montażem w 15 miastach.',
      category: 'Okna PCV',
      link: '/kalkulator/okna-pcv',
      image: '🪟',
    },
    {
      id: 'meble-kuchenne',
      title: 'Meble kuchenne na wymiar — cennik 2026',
      description:
        'Ile kosztuje kuchnia na wymiar? Porównanie frontów (laminat, MDF, drewno), blatów i wyposażenia. Ceny za metr bieżący w Twojej lokalizacji.',
      category: 'Meble na wymiar',
      link: '/kalkulator/meble-na-wymiar',
      image: '🪑',
    },
    {
      id: 'remont-lazienki',
      title: 'Ile kosztuje remont łazienki w 2026 roku?',
      description:
        'Szczegółowy rozkład kosztów remontu łazienki. Sprawdź ceny robocizny, materiałów i wyposażenia. Porównaj ceny w różnych miastach.',
      category: 'Łazienka',
      link: '/kalkulator/remont-lazienki',
      image: '🚿',
    },
    {
      id: 'malowanie-scian',
      title: 'Cennik malowania ścian 2026 — aktualne ceny',
      description:
        'Ile kosztuje malowanie ścian? Sprawdź ceny usług malarskich, ceny farby i akcesoriów. Wskazówki praktyczne dla kupujących.',
      category: 'Prace malarskie',
      link: '/kalkulator/malowanie-scian',
      image: '🎨',
    },
    {
      id: 'jak-nie-przepacic',
      title: 'Jak nie przepłacić za remont — 10 porad',
      description:
        'Praktyczne porady, które pomogą Ci uniknąć przepłacenia za usługi remontowe. Jak negocjować ceny? Co sprawdzić u wykonawcy?',
      category: 'Poradnik',
      link: '#',
      image: '💡',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Poradnik remontowy
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Porady, artykuły i cenniki — wszystko co musisz wiedzieć o
              remontach
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-center text-slate-600">
              Poniżej znajdziesz artykuły i poradniki, które pomogą ci zrozumieć
              koszty remontów, znaleźć dobrego wykonawcę i podejmować świadome
              decyzje.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={article.link}
                className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white hover:shadow-lg hover:border-brand-blue transition-all"
              >
                {/* Image */}
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-5xl group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors">
                  {article.image}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-brand-blue">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {article.title}
                  </h3>

                  <p className="mb-4 flex-1 text-sm text-slate-600">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-2 text-brand-blue font-semibold">
                    <span>Przeczytaj więcej</span>
                    <svg
                      className="h-4 w-4 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 rounded-lg bg-slate-50 p-8 border border-slate-200 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              Więcej artykułów wkrótce
            </h2>
            <p className="text-slate-600">
              Pracujemy nad nowymi materiałami. Powróć tu wkrótce, aby
              poznać porady na temat:
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                Remont kuchni
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                Wymiana okien
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                Instalacja grzejników
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                Podłogi i drzwi
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                Jak wybrać wykonawcę
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                Planowanie budżetu
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-blue to-blue-900 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Potrzebujesz szybkiej wyceny?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Sprawdź koszt swojego remontu za pomocą naszych kalkulatorów. Otrzymasz
            szacunkową cenę w ciągu kilku minut.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/mapa-cen"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-blue hover:bg-slate-50 transition-colors"
            >
              Mapa Cen Remontów
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-orange px-6 py-3 font-semibold text-white hover:bg-orange-700 transition-colors"
            >
              Kalkulator kosztów
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
      </section>

      {/* Info Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Dlaczego warto czytać nasz poradnik?
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-brand-blue">✓</span>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Aktualne informacje
              </h3>
              <p className="text-sm text-slate-600">
                Artykuły aktualizujemy co roku, aby odzwierciedlały bieżące
                ceny i trendy.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">✓</span>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Praktyczne porady
              </h3>
              <p className="text-sm text-slate-600">
                Każdy artykuł zawiera konkretne wskazówki, które możesz
                zastosować od razu.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <span className="text-xl font-bold text-accent-orange">✓</span>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Bezstronne artykuły
              </h3>
              <p className="text-sm text-slate-600">
                Nie promujemy żadnych konkretnych marek. Fokus na faktach i
                wiedzy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MapaCenSearch from '@/components/mapa-cen/MapaCenSearch';
import MapaCenResult from '@/components/mapa-cen/MapaCenResult';
import Card from '@/components/ui/Card';
import { CityData } from '@/data/cities';

interface SearchState {
  city: CityData | null;
  serviceType: string;
}

export default function MapaCenPageClient() {
  const [searchState, setSearchState] = useState<SearchState>({
    city: null,
    serviceType: '',
  });

  const handleSearch = (city: CityData, serviceType: string) => {
    setSearchState({ city, serviceType });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
              Mapa Cen Remontów
            </h1>
            <p className="mt-4 text-lg text-slate-600 md:text-xl">
              Sprawdź aktualne ceny remontów w Twoim mieście. Porównaj oferty, analizuj trendy i podejmuj świadome decyzje.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <MapaCenSearch onSearch={handleSearch} />
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {searchState.city && searchState.serviceType && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <MapaCenResult city={searchState.city} serviceType={searchState.serviceType} />
          </div>
        </section>
      )}

      {/* Methodology Section */}
      <section className="border-t border-slate-200 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Jak działają nasze ceny?</h2>
          <p className="mt-4 text-slate-600">
            Nasza mapa cen bazuje na algorytmie zaileremont.pl, który uwzględnia wiele czynników:
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card padding="md" hover>
              <h3 className="font-bold text-slate-900">Lokalizacja</h3>
              <p className="mt-2 text-sm text-slate-600">
                Współczynniki dla każdego miasta i dzielnicy odzwierciedlają rzeczywisty rynek lokalny.
              </p>
            </Card>

            <Card padding="md" hover>
              <h3 className="font-bold text-slate-900">Typ usługi</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ceny zależy od rodzaju remontu - od prostych malowań po złożone remonty łazienek.
              </p>
            </Card>

            <Card padding="md" hover>
              <h3 className="font-bold text-slate-900">Standard pracy</h3>
              <p className="mt-2 text-sm text-slate-600">
                Pokazujemy ceny dla standardowego poziomu, ale możliwe są warianty ekonomiczne i premium.
              </p>
            </Card>

            <Card padding="md" hover>
              <h3 className="font-bold text-slate-900">Sezonowość</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ceny mogą się różnić w zależności od pory roku - lato jest droższe niż zima.
              </p>
            </Card>
          </div>

          <div className="mt-8">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 text-accent-orange font-semibold hover:text-orange-600"
            >
              Przeczytaj szczegółową metodologię
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Pytania i odpowiedzi</h2>

          <div className="mt-8 space-y-6">
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Jak dokładne są ceny z mapy?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Nasze ceny bazują na rzeczywistych danych z rynku i są aktualizowane co miesiąc. Jednak ostateczna wycena zawsze zależy od specyfiki projektu, materiałów i warunków na budowie. Polecamy traktować nasze ceny jako orientacyjne i zawsze prosić o wycenę od profesjonalistów.
              </p>
            </Card>

            <Card padding="md">
              <h3 className="font-bold text-slate-900">Dlaczego ceny się różnią między miastami?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Rynek remontów jest lokalny. Ceny zależy od kosztów pracy, dostępu do materiałów, konkurencji i siły nabywczej w danym regionie. Warszawa i inne metropolie mają wyższe ceny niż małe miasta.
              </p>
            </Card>

            <Card padding="md">
              <h3 className="font-bold text-slate-900">Czy mogę użyć tych cen do negocjacji?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Tak! Nasza mapa cen to doskonały punkt wyjścia do rozmów z wykonawcami. Pokazuje, ile powinni kosztować prace w Twoim mieście. Pamiętaj jednak, że ostateczna cena zależy od wielu czynników, w tym od doświadczenia wykonawcy i zakresu prac.
              </p>
            </Card>

            <Card padding="md">
              <h3 className="font-bold text-slate-900">Jak mogę uzyskać pełną wycenę?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Skorzystaj z naszego kalkulatora, aby uzyskać bardziej szczegółową wycenę na podstawie konkretnych parametrów Twojego projektu. Możesz wybrać dokładną wielkość pomieszczeń, materiały i standard pracy.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Mapa Cen Remontów',
            url: 'https://zaileremont.pl/mapa-cen',
            applicationCategory: 'UtilityApplication',
            description: 'Interaktywna mapa cen remontów w Polsce',
            offers: {
              '@type': 'Offer',
              price: '29',
              priceCurrency: 'PLN',
              description: 'Pełny raport cenowy',
            },
          }),
        }}
      />
    </main>
  );
}

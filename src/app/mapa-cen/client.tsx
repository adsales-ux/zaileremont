'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MapaCenSearch from '@/components/mapa-cen/MapaCenSearch';
import MapaCenResult from '@/components/mapa-cen/MapaCenResult';
import Card from '@/components/ui/Card';
import { CityData, CITIES } from '@/data/cities';

interface SearchState {
  city: CityData | null;
  serviceType: string;
}

const POPULAR_CITIES = [
  'warszawa', 'krakow', 'wroclaw', 'poznan', 'gdansk', 'lodz',
  'katowice', 'lublin', 'szczecin', 'bydgoszcz', 'rzeszow', 'bialystok',
];

export default function MapaCenPageClient() {
  const [searchState, setSearchState] = useState<SearchState>({
    city: null,
    serviceType: '',
  });

  const handleSearch = (city: CityData, serviceType: string) => {
    setSearchState({ city, serviceType });
  };

  const popularCityData = POPULAR_CITIES
    .map(slug => CITIES.find(c => c.slug === slug))
    .filter(Boolean) as CityData[];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Mapa Cen Remontów
            </h1>
            <p className="mt-4 text-lg text-blue-200 md:text-xl max-w-2xl mx-auto">
              Sprawdź aktualne ceny remontów w Twoim mieście. Porównaj oferty, analizuj trendy i podejmuj świadome decyzje.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2">
                <span className="text-2xl font-bold text-white">333</span>
                <span className="text-sm text-blue-200">miast</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2">
                <span className="text-2xl font-bold text-white">6</span>
                <span className="text-sm text-blue-200">kalkulatorów</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2">
                <span className="text-2xl font-bold text-white">16</span>
                <span className="text-sm text-blue-200">województw</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative -mt-8 z-10 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
            <MapaCenSearch onSearch={handleSearch} />
          </div>
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

      {/* Popular Cities */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popularne miasta</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularCityData.map((city) => (
              <Link
                key={city.slug}
                href={`/mapa-cen/${city.slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl">
                  {city.category === 'metropolis' ? '🏙️' : city.category === 'large' ? '🌆' : '🏘️'}
                </span>
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 text-center">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 py-12 md:py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Jak działają nasze ceny?</h2>
          <p className="mt-4 text-slate-600">
            Nasza mapa cen bazuje na algorytmie ilezaremont.pl, który uwzględnia wiele czynników:
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-4 rounded-xl bg-white border border-slate-200 p-5">
              <span className="text-3xl">📍</span>
              <div>
                <h3 className="font-bold text-slate-900">Lokalizacja</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Współczynniki dla każdego miasta odzwierciedlają rzeczywisty rynek lokalny.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-white border border-slate-200 p-5">
              <span className="text-3xl">🔧</span>
              <div>
                <h3 className="font-bold text-slate-900">Typ usługi</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Ceny zależą od rodzaju remontu - od malowania po remonty łazienek.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-white border border-slate-200 p-5">
              <span className="text-3xl">⭐</span>
              <div>
                <h3 className="font-bold text-slate-900">Standard pracy</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Pokazujemy ceny standardowe, ale możliwe są warianty ekonomiczne i premium.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-white border border-slate-200 p-5">
              <span className="text-3xl">📅</span>
              <div>
                <h3 className="font-bold text-slate-900">Sezonowość</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Ceny mogą się różnić w zależności od pory roku - lato jest droższe.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-600"
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
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Pytania i odpowiedzi</h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Jak dokładne są ceny z mapy?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Nasze ceny bazują na danych z rynku i są aktualizowane regularnie. Ostateczna wycena zawsze zależy od specyfiki projektu. Polecamy traktować nasze ceny jako orientacyjne.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Dlaczego ceny się różnią między miastami?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Rynek remontów jest lokalny. Ceny zależą od kosztów pracy, dostępu do materiałów, konkurencji i siły nabywczej w danym regionie.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Jak mogę uzyskać pełną wycenę?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Skorzystaj z naszego kalkulatora, aby uzyskać szczegółową wycenę na podstawie parametrów Twojego projektu.
              </p>
            </div>
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
            name: 'Mapa Cen Remontów - ilezaremont.pl',
            url: 'https://ilezaremont.pl/mapa-cen',
            applicationCategory: 'UtilityApplication',
            description: 'Interaktywna mapa cen remontów w 333 miastach Polski',
            offers: {
              '@type': 'Offer',
              price: '29.99',
              priceCurrency: 'PLN',
              description: 'Pełny raport cenowy PDF',
            },
          }),
        }}
      />
    </main>
  );
}

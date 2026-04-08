'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MapaCenSearch from '@/components/mapa-cen/MapaCenSearch';
import MapaCenResult from '@/components/mapa-cen/MapaCenResult';
import { CityData, CITIES } from '@/data/cities';

interface SearchState {
  city: CityData | null;
  serviceType: string;
}

const POPULAR_CITIES = ['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Szczecin', 'Lublin', 'Białystok', 'Rzeszów', 'Kielce'];

export default function MapaCenPageClient() {
  const [searchState, setSearchState] = useState<SearchState>({
    city: null,
    serviceType: '',
  });

  const handleSearch = (city: CityData, serviceType: string) => {
    setSearchState({ city, serviceType });
  };

  const totalCities = CITIES.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-700/50 px-4 py-1.5 text-sm font-medium text-blue-100 mb-6">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {totalCities} miast w bazie
            </div>
            <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl tracking-tight">
              Mapa Cen <span className="text-blue-300">Remontów</span>
            </h1>
            <p className="mt-5 text-lg text-blue-100/80 md:text-xl max-w-2xl mx-auto">
              Sprawdź aktualne ceny remontów w Twoim mieście. Porównaj oferty, analizuj trendy i podejmuj świadome decyzje.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-4">
                <p className="text-2xl font-bold text-white">{totalCities}</p>
                <p className="text-xs text-blue-200">Miast</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-4">
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-xs text-blue-200">Kalkulatorów</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-4">
                <p className="text-2xl font-bold text-white">16</p>
                <p className="text-xs text-blue-200">Województw</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 md:py-16 -mt-8 relative z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
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

      {/* Popular Cities Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Popularne miasta</h2>
          <p className="text-slate-500 mb-8">Sprawdź ceny remontów w największych polskich miastach</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {POPULAR_CITIES.map(cityName => {
              const city = CITIES.find(c => c.name === cityName);
              if (!city) return null;
              return (
                <Link
                  key={city.slug}
                  href={`/mapa-cen/${city.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{city.name}</span>
                  <span className="text-[10px] text-slate-400">{city.voivodeship}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Jak działają nasze ceny?</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Algorytm ilezaremont.pl analizuje wiele czynników, aby dostarczyć Ci najbardziej aktualne dane cenowe.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '\uD83D\uDCCD', title: 'Lokalizacja', desc: 'Współczynniki dla każdego miasta odzwierciedlają lokalny rynek.' },
              { icon: '\uD83D\uDD27', title: 'Typ usługi', desc: 'Od malowania ścian po remont łazienki — każda usługa ma swoją cenę.' },
              { icon: '\u2B50', title: 'Standard', desc: 'Ekonomiczny, standardowy i premium — trzy poziomy jakości.' },
              { icon: '\uD83D\uDCCA', title: 'Sezonowość', desc: 'Ceny uwzględniają wahania sezonowe — lato jest droższe niż zima.' },
            ].map((item, i) => (
              <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Pytania i odpowiedzi</h2>

          <div className="space-y-4">
            {[
              { q: 'Jak dokładne są ceny z mapy?', a: 'Nasze ceny bazują na rzeczywistych danych z rynku i są aktualizowane co miesiąc. Ostateczna wycena zawsze zależy od specyfiki projektu — polecamy prosić o wycenę od profesjonalistów.' },
              { q: 'Dlaczego ceny się różnią między miastami?', a: 'Rynek remontów jest lokalny. Ceny zależą od kosztów pracy, dostępu do materiałów, konkurencji i siły nabywczej w danym regionie.' },
              { q: 'Czy mogę użyć tych cen do negocjacji?', a: 'Tak! Nasza mapa cen to doskonały punkt wyjścia do rozmów z wykonawcami. Pokazuje, ile powinny kosztować prace w Twoim mieście.' },
              { q: 'Jak mogę uzyskać pełną wycenę?', a: 'Skorzystaj z naszego kalkulatora, a następnie zamów pełny raport cenowy w PDF za 29,99 zł z rozbitymi kosztami i listą kontrolną.' },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
            url: 'https://ilezaremont.pl/mapa-cen',
            applicationCategory: 'UtilityApplication',
            description: 'Interaktywna mapa cen remontów w Polsce',
            offers: {
              '@type': 'Offer',
              price: '29.99',
              priceCurrency: 'PLN',
              description: 'Pełny raport cenowy',
            },
          }),
        }}
      />
    </main>
  );
}

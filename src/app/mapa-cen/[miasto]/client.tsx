'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MapaCenSearch from '@/components/mapa-cen/MapaCenSearch';
import MapaCenResult from '@/components/mapa-cen/MapaCenResult';
import Card from '@/components/ui/Card';
import { CityData } from '@/data/cities';

interface MiastoPageProps {
  city: CityData;
}

const SERVICE_NAMES: Record<string, string> = {
  bathroom: 'Remont łazienki',
  painting: 'Malowanie ścian',
  tiles: 'Układanie płytek',
};

export default function MiastoPage({ city }: MiastoPageProps) {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSearch = (selectedCity: CityData, serviceType: string) => {
    setSelectedService(serviceType);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div>
            <Link href="/mapa-cen" className="text-accent-orange hover:text-orange-600 font-semibold text-sm">
              ← Powrót do mapy cen
            </Link>
            <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
              Ceny remontów w {city.name}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Mapa Cen 2026 — aktualne ceny dla usług remontowych w {city.name}, {city.voivodeship}
            </p>
          </div>

          {/* City Stats */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-700">Współczynnik miasta</p>
              <p className="mt-1 text-2xl font-bold text-blue-900">{city.coefficient.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Populacja</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900">{(city.population / 1000).toFixed(0)}k</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <p className="text-sm text-purple-700">Województwo</p>
              <p className="mt-1 text-2xl font-bold text-purple-900">{city.voivodeship}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <MapaCenSearch
              onSearch={handleSearch}
              initialCity={city}
              initialService={selectedService}
            />
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {selectedService && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <MapaCenResult city={city} serviceType={selectedService} />
          </div>
        </section>
      )}

      {/* Services Grid */}
      {!selectedService && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900">Popularne usługi w {city.name}</h2>
            <p className="mt-4 text-slate-600">
              Wybierz usługę, aby sprawdzić aktualne ceny
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {['bathroom', 'painting', 'tiles'].map((serviceType) => (
                <Card
                  key={serviceType}
                  padding="lg"
                  hover
                  className="cursor-pointer"
                  onClick={() => setSelectedService(serviceType)}
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    {SERVICE_NAMES[serviceType]}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Sprawdź ceny rynkowe dla tej usługi w {city.name}
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 text-accent-orange font-semibold hover:text-orange-600">
                    Sprawdź ceny
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">O cenach w {city.name}</h2>
          <p className="mt-4 text-slate-600">
            Ceny remontów w {city.name} bazują na rzeczywistych danych z lokalnego rynku. Współczynnik miasta wynoszący {city.coefficient.toFixed(2)} oznacza, że ceny pracy są {city.coefficient > 1.1 ? 'wyższe' : city.coefficient < 0.95 ? 'niższe' : 'zbliżone'} do średniej krajowej (Warszawa = 1.25).
          </p>
          <p className="mt-4 text-slate-600">
            Podane ceny to mediana rynkowa dla usług standardowych na rynku wtórnym. Rzeczywista wycena zawsze zależy od konkretnych warunków projektu, wybranego materiału i doświadczenia wykonawcy.
          </p>
        </div>
      </section>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `Mapa Cen Remontów - ${city.name}`,
            areaServed: {
              '@type': 'City',
              name: city.name,
            },
            serviceType: 'Usługi remontowe',
          }),
        }}
      />
    </main>
  );
}

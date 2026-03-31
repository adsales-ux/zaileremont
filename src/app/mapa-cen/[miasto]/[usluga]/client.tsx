'use client';

import React from 'react';
import Link from 'next/link';
import MapaCenResult from '@/components/mapa-cen/MapaCenResult';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CityData } from '@/data/cities';

interface UsluagPageProps {
  city: CityData;
  serviceType: string;
}

const SERVICE_NAMES: Record<string, string> = {
  bathroom: 'Remont łazienki',
  painting: 'Malowanie ścian',
  tiles: 'Układanie płytek',
};

const SERVICE_DESCRIPTIONS: Record<string, { short: string; long: string }> = {
  bathroom: {
    short: 'Kompleksowy remont łazienki',
    long: 'Remont łazienki to jeden z bardziej inwestycyjnych projektów domowych, ale znacznie podnosi komfort życia i wartość nieruchomości. W cenę remontów łazienki wchodzą: roboty rozbiórkowe, przygotowanie podłoża, hydroizolacja, układanie płytek, instalacje wodne i elektryczne oraz montaż elementów sanitarnych.',
  },
  painting: {
    short: 'Malowanie ścian i sufitów',
    long: 'Malowanie ścian to jeden z najtańszych sposobów na odnowienie wyglądu pomieszczeń. Cena zależy od stanu powierzchni, wybranej farby i liczby warstw. Profesjonalne malowanie wymaga dobrego przygotowania podłoża - czyszczenia, szpachlowania i gruntowania.',
  },
  tiles: {
    short: 'Układanie płytek ceramicznych',
    long: 'Układanie płytek to specjalistyczna usługa, która wymaga doświadczenia i precyzji. Cena zależy od rozmiaru płytek, wzoru ułożenia i typu spoin. Większe płytki są szybsze w wykonaniu, ale wymagają lepszego wyrównania podłoża.',
  },
};

export default function UsluagPage({ city, serviceType }: UsluagPageProps) {
  const serviceName = SERVICE_NAMES[serviceType] || serviceType;
  const description = SERVICE_DESCRIPTIONS[serviceType];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <section className="border-b border-slate-200 bg-white py-4 md:py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/mapa-cen" className="text-accent-orange hover:text-orange-600">
              Mapa cen
            </Link>
            <span>/</span>
            <Link href={`/mapa-cen/${city.slug}`} className="text-accent-orange hover:text-orange-600">
              {city.name}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{serviceName}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            {serviceName} w {city.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Ceny rynkowe 2026 — sprawdź ile kosztuje {serviceName.toLowerCase()} w {city.name}
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <MapaCenResult city={city} serviceType={serviceType} />
        </div>
      </section>

      {/* Information Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{description?.short}</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {description?.long}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Czynniki wpływające na cenę</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <span className="text-slate-600">
                    <span className="font-semibold text-slate-900">Wielkość powierzchni</span> — im większa powierzchnia, tym niższa cena za jednostkę
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <span className="text-slate-600">
                    <span className="font-semibold text-slate-900">Materiały</span> — jakość materiałów znacznie wpływa na ostateczną cenę
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <span className="text-slate-600">
                    <span className="font-semibold text-slate-900">Stan istniejący</span> — przygotowanie podłoża wpływa na koszt prac
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <span className="text-slate-600">
                    <span className="font-semibold text-slate-900">Doświadczenie wykonawcy</span> — profesjonaliści mogą pracować szybciej i lepiej
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center font-bold text-sm">
                    5
                  </span>
                  <span className="text-slate-600">
                    <span className="font-semibold text-slate-900">Pora roku</span> — ceny są wyższe w sezonie letnim niż zimą
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h4 className="font-bold text-blue-900">Rada profesjonalna</h4>
              <p className="mt-2 text-sm text-blue-700">
                Zawsze warto poprosić kilka ofert od różnych wykonawców. Ceny mogą się różnić, ale pamiętaj, że najtańsza oferta nie zawsze jest najlepszą opcją. Sprawdzaj referencje, zobacz poprzednie projekty i upewnij się, że wykonawca ma odpowiednie ubezpieczenie i doświadczenie.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Chcesz dokładnej wyceny?</h3>
              <p className="mt-2 text-slate-600">
                Sprawdź nasz kalkulator, który pozwoli Ci uzyskać bardziej spersonalizowaną wycenę na podstawie konkretnych parametrów Twojego projektu.
              </p>
              <Link href={`/kalkulator/${serviceType}`}>
                <Button
                  variant="cta"
                  size="lg"
                  className="mt-4"
                >
                  Otwórz kalkulator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Inne usługi w {city.name}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {['bathroom', 'painting', 'tiles'].map((service) => {
              if (service === serviceType) return null;
              return (
                <Link key={service} href={`/mapa-cen/${city.slug}/${service}`}>
                  <Card padding="md" hover className="h-full">
                    <h3 className="font-bold text-slate-900">
                      {SERVICE_NAMES[service]}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Sprawdź ceny w {city.name}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PriceSpecification',
            priceCurrency: 'PLN',
            name: `${serviceName} w ${city.name}`,
            description: description?.long,
            validFrom: new Date().toISOString().split('T')[0],
            areaServed: {
              '@type': 'City',
              name: city.name,
            },
          }),
        }}
      />
    </main>
  );
}

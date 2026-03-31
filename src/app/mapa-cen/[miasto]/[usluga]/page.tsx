import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/data/cities';
import UsluagPage from './client';

const VALID_SERVICES = ['bathroom', 'painting', 'tiles'];

const SERVICE_NAMES: Record<string, string> = {
  bathroom: 'Remont łazienki',
  painting: 'Malowanie ścian',
  tiles: 'Układanie płytek',
};

export async function generateStaticParams() {
  // Generate pages for top 10 cities × 3 services
  const topCities = CITIES.sort((a, b) => b.population - a.population).slice(0, 10);
  const params = [];

  for (const city of topCities) {
    for (const service of VALID_SERVICES) {
      params.push({
        miasto: city.slug,
        usluga: service,
      });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ miasto: string; usluga: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const city = getCityBySlug(params.miasto);
  const serviceName = SERVICE_NAMES[params.usluga];

  if (!city || !serviceName) {
    return {
      title: 'Nie znaleziono',
    };
  }

  return {
    title: `Ile kosztuje ${serviceName.toLowerCase()} w ${city.name} 2026 | Mapa Cen zaileremont.pl`,
    description: `Sprawdź ceny ${serviceName.toLowerCase()} w ${city.name}. Aktualne ceny rynkowe, porównanie z innymi miastami, szczegółowa analiza kosztów.`,
    keywords: `${serviceName.toLowerCase()} ${city.name}, cena ${serviceName.toLowerCase()} ${city.name}, wycena usługi`,
    openGraph: {
      title: `Ile kosztuje ${serviceName.toLowerCase()} w ${city.name} 2026`,
      description: `Sprawdź ceny ${serviceName.toLowerCase()} w ${city.name}`,
      type: 'website',
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const city = getCityBySlug(params.miasto);

  if (!city || !VALID_SERVICES.includes(params.usluga)) {
    notFound();
  }

  return <UsluagPage city={city} serviceType={params.usluga} />;
}

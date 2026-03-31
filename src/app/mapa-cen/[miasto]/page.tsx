import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/data/cities';
import MiastoPage from './client';

export async function generateStaticParams() {
  // Generate pages for top 15 cities
  const topCities = CITIES.sort((a, b) => b.population - a.population).slice(0, 15);
  return topCities.map((city) => ({
    miasto: city.slug,
  }));
}

interface PageProps {
  params: Promise<{ miasto: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const city = getCityBySlug(params.miasto);

  if (!city) {
    return {
      title: 'Nie znaleziono',
    };
  }

  return {
    title: `Ceny remontów w ${city.name} — Mapa Cen 2026 | zaileremont.pl`,
    description: `Sprawdź aktualne ceny remontów w ${city.name}. Remont łazienki, malowanie ścian, układanie płytek - porównaj ceny i znajdź najlepszą ofertę.`,
    keywords: `ceny remontów ${city.name}, usługi budowlane ${city.name}, remont ${city.name}`,
    openGraph: {
      title: `Ceny remontów w ${city.name} — Mapa Cen 2026`,
      description: `Sprawdź aktualne ceny remontów w ${city.name}`,
      type: 'website',
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const city = getCityBySlug(params.miasto);

  if (!city) {
    notFound();
  }

  return <MiastoPage city={city} />;
}

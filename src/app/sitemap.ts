import { MetadataRoute } from 'next';

// Top 15 miast dla stron lokalizacyjnych
const topCities = [
  'warszawa', 'krakow', 'wroclaw', 'poznan', 'gdansk',
  'lodz', 'katowice', 'lublin', 'bialystok', 'szczecin',
  'bydgoszcz', 'rzeszow', 'torun', 'kielce', 'olsztyn'
];

const services = [
  'remont-lazienki', 'malowanie-scian', 'ukladanie-plytek'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ilezaremont.pl';
  const now = new Date();

  // Strony statyczne
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kalkulator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kalkulator/remont-lazienki`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kalkulator/malowanie-scian`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kalkulator/ukladanie-plytek`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mapa-cen`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/metodologia`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/poradnik`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Strony miast: /mapa-cen/[miasto]
  const cityPages: MetadataRoute.Sitemap = topCities.map((city) => ({
    url: `${baseUrl}/mapa-cen/${city}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Strony miasto + usługa: /mapa-cen/[miasto]/[usluga]
  const cityServicePages: MetadataRoute.Sitemap = topCities.flatMap((city) =>
    services.map((service) => ({
      url: `${baseUrl}/mapa-cen/${city}/${service}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...cityPages, ...cityServicePages];
}

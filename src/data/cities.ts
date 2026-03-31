/**
 * Dane o miastach Polski dla systemu cenowego
 * Zawiera współczynniki, kategorię miasta, informacje o dzielnicach
 */

export type CityCategory = 'metropolis' | 'large' | 'medium' | 'small';

export interface WarszawaDistrict {
  id: string;
  name: string;
  polishName: string;
  coefficient: number; // współczynnik Wdzielnica
}

export interface CityData {
  id: string;
  name: string;
  slug: string;
  voivodeship: string;
  population: number;
  category: CityCategory;
  coefficient: number; // współczynnik Wmiejscowość
  districts?: WarszawaDistrict[];
}

// ============================================================================
// DZIELNICE WARSZAWY
// ============================================================================

const WARSAW_DISTRICTS: WarszawaDistrict[] = [
  { id: 'warszawa_mokotow', name: 'Mokotów', polishName: 'Mokotów', coefficient: 1.0 },
  { id: 'warszawa_srodmiescie', name: 'Śródmieście', polishName: 'Śródmieście', coefficient: 1.15 },
  { id: 'warszawa_wawer', name: 'Wawer', polishName: 'Wawer', coefficient: 0.92 },
  { id: 'warszawa_wlochy', name: 'Włochy', polishName: 'Włochy', coefficient: 0.95 },
  { id: 'warszawa_piaseczno', name: 'Piaseczno', polishName: 'Piaseczno', coefficient: 0.88 },
  { id: 'warszawa_praga_poludnie', name: 'Praga-Południe', polishName: 'Praga-Południe', coefficient: 0.98 },
  { id: 'warszawa_praga_polnoc', name: 'Praga-Północ', polishName: 'Praga-Północ', coefficient: 0.92 },
  { id: 'warszawa_zoliborz', name: 'Żoliborz', polishName: 'Żoliborz', coefficient: 1.05 },
  { id: 'warszawa_wola', name: 'Wola', polishName: 'Wola', coefficient: 1.02 },
  { id: 'warszawa_ochota', name: 'Ochota', polishName: 'Ochota', coefficient: 1.0 },
  { id: 'warszawa_bielany', name: 'Bielany', polishName: 'Bielany', coefficient: 0.98 },
  { id: 'warszawa_rembertow', name: 'Rembertów', polishName: 'Rembertów', coefficient: 0.85 },
];

// ============================================================================
// DZIELNICE KRAKOWA
// ============================================================================

const KRAKOW_DISTRICTS: WarszawaDistrict[] = [
  { id: 'krakow_stare_miasto', name: 'Stare Miasto', polishName: 'Stare Miasto', coefficient: 1.1 },
  { id: 'krakow_podgorze', name: 'Podgórze', polishName: 'Podgórze', coefficient: 0.95 },
  { id: 'krakow_nowa_huta', name: 'Nowa Huta', polishName: 'Nowa Huta', coefficient: 0.88 },
  { id: 'krakow_zwierzyniec', name: 'Zwierzyniec', polishName: 'Zwierzyniec', coefficient: 1.05 },
  { id: 'krakow_bronowice', name: 'Bronowice', polishName: 'Bronowice', coefficient: 0.92 },
  { id: 'krakow_krowodrza', name: 'Krowodrza', polishName: 'Krowodrza', coefficient: 0.98 },
];

// ============================================================================
// DZIELNICE WROCŁAWIA
// ============================================================================

const WROCLAW_DISTRICTS: WarszawaDistrict[] = [
  { id: 'wroclaw_stare_miasto', name: 'Stare Miasto', polishName: 'Stare Miasto', coefficient: 1.08 },
  { id: 'wroclaw_psie_pole', name: 'Psie Pole', polishName: 'Psie Pole', coefficient: 0.95 },
  { id: 'wroclaw_przedmiescie', name: 'Przedmieście', polishName: 'Przedmieście', coefficient: 0.90 },
  { id: 'wroclaw_fabryczna', name: 'Fabryczna', polishName: 'Fabryczna', coefficient: 0.92 },
];

// ============================================================================
// LISTA MIAST POLSKI
// ============================================================================

export const CITIES: CityData[] = [
  // ======================== METROPOLIE ========================
  {
    id: 'warsaw',
    name: 'Warszawa',
    slug: 'warszawa',
    voivodeship: 'Mazowieckie',
    population: 863700,
    category: 'metropolis',
    coefficient: 1.25,
    districts: WARSAW_DISTRICTS,
  },
  {
    id: 'krakow',
    name: 'Kraków',
    slug: 'krakow',
    voivodeship: 'Małopolskie',
    population: 804237,
    category: 'metropolis',
    coefficient: 1.15,
    districts: KRAKOW_DISTRICTS,
  },
  {
    id: 'wroclaw',
    name: 'Wrocław',
    slug: 'wroclaw',
    voivodeship: 'Dolnośląskie',
    population: 671648,
    category: 'metropolis',
    coefficient: 1.12,
    districts: WROCLAW_DISTRICTS,
  },
  {
    id: 'poznan',
    name: 'Poznań',
    slug: 'poznan',
    voivodeship: 'Wielkopolskie',
    population: 534813,
    category: 'metropolis',
    coefficient: 1.10,
  },
  {
    id: 'gdansk',
    name: 'Gdańsk',
    slug: 'gdansk',
    voivodeship: 'Pomorskie',
    population: 488106,
    category: 'metropolis',
    coefficient: 1.10,
  },

  // ======================== MIASTA DUŻE ========================
  {
    id: 'lodz',
    name: 'Łódź',
    slug: 'lodz',
    voivodeship: 'Łódzkie',
    population: 696127,
    category: 'large',
    coefficient: 1.05,
  },
  {
    id: 'katowice',
    name: 'Katowice',
    slug: 'katowice',
    voivodeship: 'Śląskie',
    population: 286801,
    category: 'large',
    coefficient: 1.08,
  },
  {
    id: 'szczecin',
    name: 'Szczecin',
    slug: 'szczecin',
    voivodeship: 'Zachodniopomorskie',
    population: 398627,
    category: 'large',
    coefficient: 1.05,
  },
  {
    id: 'gdynia',
    name: 'Gdynia',
    slug: 'gdynia',
    voivodeship: 'Pomorskie',
    population: 246316,
    category: 'large',
    coefficient: 1.08,
  },
  {
    id: 'lublin',
    name: 'Lublin',
    slug: 'lublin',
    voivodeship: 'Lubelskie',
    population: 335315,
    category: 'large',
    coefficient: 1.00,
  },
  {
    id: 'bydgoszcz',
    name: 'Bydgoszcz',
    slug: 'bydgoszcz',
    voivodeship: 'Kujawsko-Pomorskie',
    population: 360891,
    category: 'large',
    coefficient: 1.00,
  },
  {
    id: 'sopot',
    name: 'Sopot',
    slug: 'sopot',
    voivodeship: 'Pomorskie',
    population: 38236,
    category: 'large',
    coefficient: 1.12,
  },

  // ======================== MIASTA ŚREDNIE ========================
  {
    id: 'zabrze',
    name: 'Zabrze',
    slug: 'zabrze',
    voivodeship: 'Śląskie',
    population: 168628,
    category: 'medium',
    coefficient: 1.02,
  },
  {
    id: 'gliwice',
    name: 'Gliwice',
    slug: 'gliwice',
    voivodeship: 'Śląskie',
    population: 175397,
    category: 'medium',
    coefficient: 1.03,
  },
  {
    id: 'tychy',
    name: 'Tychy',
    slug: 'tychy',
    voivodeship: 'Śląskie',
    population: 128234,
    category: 'medium',
    coefficient: 1.02,
  },
  {
    id: 'ruda_slaska',
    name: 'Ruda Śląska',
    slug: 'ruda-slaska',
    voivodeship: 'Śląskie',
    population: 139893,
    category: 'medium',
    coefficient: 1.01,
  },
  {
    id: 'bytom',
    name: 'Bytom',
    slug: 'bytom',
    voivodeship: 'Śląskie',
    population: 170506,
    category: 'medium',
    coefficient: 1.00,
  },
  {
    id: 'chorzow',
    name: 'Chorzów',
    slug: 'chorzow',
    voivodeship: 'Śląskie',
    population: 112007,
    category: 'medium',
    coefficient: 1.01,
  },
  {
    id: 'sosnowiec',
    name: 'Sosnowiec',
    slug: 'sosnowiec',
    voivodeship: 'Śląskie',
    population: 214285,
    category: 'medium',
    coefficient: 1.00,
  },
  {
    id: 'kielce',
    name: 'Kielce',
    slug: 'kielce',
    voivodeship: 'Świętokrzyskie',
    population: 200769,
    category: 'medium',
    coefficient: 0.95,
  },
  {
    id: 'czestochowa',
    name: 'Częstochowa',
    slug: 'czestochowa',
    voivodeship: 'Śląskie',
    population: 222098,
    category: 'medium',
    coefficient: 0.98,
  },
  {
    id: 'radom',
    name: 'Radom',
    slug: 'radom',
    voivodeship: 'Mazowieckie',
    population: 214833,
    category: 'medium',
    coefficient: 0.95,
  },
  {
    id: 'bialystok',
    name: 'Białystok',
    slug: 'bialystok',
    voivodeship: 'Podlaskie',
    population: 292700,
    category: 'medium',
    coefficient: 0.98,
  },
  {
    id: 'rzeszow',
    name: 'Rzeszów',
    slug: 'rzeszow',
    voivodeship: 'Podkarpackie',
    population: 196146,
    category: 'medium',
    coefficient: 0.97,
  },
  {
    id: 'walbrzych',
    name: 'Wałbrzych',
    slug: 'walbrzych',
    voivodeship: 'Dolnośląskie',
    population: 117797,
    category: 'medium',
    coefficient: 0.92,
  },

  // ======================== MIASTA MAŁE (PRÓBKA) ========================
  {
    id: 'plock',
    name: 'Płock',
    slug: 'plock',
    voivodeship: 'Mazowieckie',
    population: 117576,
    category: 'small',
    coefficient: 0.90,
  },
  {
    id: 'opole',
    name: 'Opole',
    slug: 'opole',
    voivodeship: 'Opolskie',
    population: 127755,
    category: 'small',
    coefficient: 0.91,
  },
  {
    id: 'elblag',
    name: 'Elbląg',
    slug: 'elblag',
    voivodeship: 'Warmińsko-Mazurskie',
    population: 119236,
    category: 'small',
    coefficient: 0.88,
  },
  {
    id: 'slupsk',
    name: 'Słupsk',
    slug: 'slupsk',
    voivodeship: 'Pomorskie',
    population: 96388,
    category: 'small',
    coefficient: 0.88,
  },
  {
    id: 'chelm',
    name: 'Chełm',
    slug: 'chelm',
    voivodeship: 'Lubelskie',
    population: 63635,
    category: 'small',
    coefficient: 0.85,
  },
  {
    id: 'kalisz',
    name: 'Kalisz',
    slug: 'kalisz',
    voivodeship: 'Wielkopolskie',
    population: 101547,
    category: 'small',
    coefficient: 0.89,
  },
  {
    id: 'koszalin',
    name: 'Koszalin',
    slug: 'koszalin',
    voivodeship: 'Zachodniopomorskie',
    population: 107901,
    category: 'small',
    coefficient: 0.87,
  },
  {
    id: 'suwałki',
    name: 'Suwałki',
    slug: 'suwalki',
    voivodeship: 'Podlaskie',
    population: 69413,
    category: 'small',
    coefficient: 0.82,
  },
  {
    id: 'konin',
    name: 'Konin',
    slug: 'konin',
    voivodeship: 'Wielkopolskie',
    population: 77155,
    category: 'small',
    coefficient: 0.86,
  },
  {
    id: 'inowroclaw',
    name: 'Inowrocław',
    slug: 'inowroclaw',
    voivodeship: 'Kujawsko-Pomorskie',
    population: 73653,
    category: 'small',
    coefficient: 0.85,
  },
];

// ============================================================================
// FUNKCJE POMOCNICZE
// ============================================================================

/**
 * Pobiera dane miasta po ID
 */
export function getCityById(cityId: string): CityData | undefined {
  return CITIES.find((c) => c.id === cityId);
}

/**
 * Pobiera dane miasta po nazwie
 */
export function getCityByName(cityName: string): CityData | undefined {
  return CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
}

/**
 * Pobiera dane miasta po sługu
 */
export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * Pobiera listę dzielnic dla miasta
 */
export function getDistricts(cityId: string): WarszawaDistrict[] | undefined {
  const city = getCityById(cityId);
  return city?.districts;
}

/**
 * Pobiera współczynnik dzielnicy
 */
export function getDistrictCoefficient(cityId: string, districtId: string): number | undefined {
  const districts = getDistricts(cityId);
  if (!districts) return undefined;

  const district = districts.find((d) => d.id === districtId);
  return district?.coefficient;
}

/**
 * Pobiera wszystkie miasta z kategorią
 */
export function getCitiesByCategory(category: CityCategory): CityData[] {
  return CITIES.filter((c) => c.category === category);
}

/**
 * Pobiera wszystkie miasta z województwa
 */
export function getCitiesByVoivodeship(voivodeship: string): CityData[] {
  return CITIES.filter((c) => c.voivodeship === voivodeship);
}

/**
 * Sortuje miasta alfabetycznie
 */
export function sortCities(cities: CityData[]): CityData[] {
  return [...cities].sort((a, b) => a.name.localeCompare(b.name, 'pl'));
}

/**
 * Pobiera miasto alternatywne gdy podane nie istnieje
 */
export function getFallbackCity(cityId: string): CityData {
  const city = getCityById(cityId);
  if (city) return city;

  // Fallback do kategorii miasta
  const smallCities = getCitiesByCategory('small');
  return smallCities[0] || CITIES[0];
}

/**
 * Pobiera wszystkie miasta
 */
export function getAllCities(): CityData[] {
  return CITIES;
}

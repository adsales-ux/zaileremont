/**
 * Dane cenowe dla usług remontowych - rynek wtórny, Warszawa (Mokotów)
 * Ceny bazowe w PLN za jednostkę (m2, sztuka, itd.)
 * Wersja 2026
 */

// ============================================================================
// INTERFEJSY I TYPY
// ============================================================================

export interface PricingItem {
  id: string;
  name: string;
  unit: string;
  basePrice: number; // cena bazowa w PLN
  minPrice?: number;
  maxPrice?: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  items: PricingItem[];
}

export interface CityCoefficient {
  city: string;
  voivodeship: string;
  coefficient: number; // współczynnik Wmiejscowość
  districts?: DistrictCoefficient[];
}

export interface DistrictCoefficient {
  name: string;
  coefficient: number; // współczynnik Wdzielnica
}

export interface MarketTypeCoefficient {
  type: 'primary' | 'secondary' | 'cooperative';
  coefficient: number;
  description: string;
}

export interface StandardCoefficient {
  standard: 'economic' | 'standard' | 'premium';
  coefficient: number;
  description: string;
}

export interface SeasonCoefficient {
  season: 'winter' | 'spring' | 'summer' | 'autumn';
  coefficient: number;
  months: number[];
}

export interface PricingStructure {
  bathroom: Category;
  painting: Category;
  tiles: Category;
  cityCoefficients: CityCoefficient[];
  marketTypeCoefficients: MarketTypeCoefficient[];
  standardCoefficients: StandardCoefficient[];
  seasonCoefficients: SeasonCoefficient[];
}

// ============================================================================
// USŁUGI - REMONT ŁAZIENKI
// ============================================================================

const BATHROOM_ITEMS: PricingItem[] = [
  // Rozbiórkę i przygotowanie
  {
    id: 'bathroom_demolition_basic',
    name: 'Rozbiorka - standard',
    unit: 'm2',
    basePrice: 45,
    minPrice: 35,
    maxPrice: 60,
    description: 'Rozbiorka kafelek, usunięcie starych zainstalowań',
  },
  {
    id: 'bathroom_demolition_complex',
    name: 'Rozbiorka - skomplikowana',
    unit: 'm2',
    basePrice: 65,
    minPrice: 50,
    maxPrice: 85,
    description: 'Rozbiorka z koniecznym wzmocnieniem ścian lub ukłądaniem nowych fundamentów',
  },

  // Przygotowanie powierzchni
  {
    id: 'bathroom_surface_prep',
    name: 'Przygotowanie i wyrównanie ścian',
    unit: 'm2',
    basePrice: 35,
    minPrice: 25,
    maxPrice: 50,
    description: 'Uszkodzenia, gruntowanie, wyrównywanie',
  },

  // Hydroizolacja
  {
    id: 'bathroom_waterproofing_basic',
    name: 'Hydroizolacja - penetracyjna',
    unit: 'm2',
    basePrice: 25,
    minPrice: 18,
    maxPrice: 35,
    description: 'Preparaty penetracyjne, standardowa ochrona',
  },
  {
    id: 'bathroom_waterproofing_membrane',
    name: 'Hydroizolacja - membrana',
    unit: 'm2',
    basePrice: 55,
    minPrice: 40,
    maxPrice: 75,
    description: 'Wysokiej klasy membrana gumowa lub polimerowa',
  },

  // Tilework - płytki kafelkowe
  {
    id: 'bathroom_tiles_small',
    name: 'Układanie płytek - małych (10-20cm)',
    unit: 'm2',
    basePrice: 120,
    minPrice: 90,
    maxPrice: 150,
    description: 'Standardowy rozmiar płytek ceramicznych',
  },
  {
    id: 'bathroom_tiles_medium',
    name: 'Układanie płytek - średnich (25-40cm)',
    unit: 'm2',
    basePrice: 95,
    minPrice: 75,
    maxPrice: 125,
    description: 'Większe płytki, szybsze wykonanie',
  },
  {
    id: 'bathroom_tiles_large',
    name: 'Układanie płytek - dużych (>50cm)',
    unit: 'm2',
    basePrice: 130,
    minPrice: 100,
    maxPrice: 170,
    description: 'Duże formaty, wymagają doświadczenia',
  },
  {
    id: 'bathroom_tiles_mosaic',
    name: 'Układanie płytek - mozaika/skomplikowana',
    unit: 'm2',
    basePrice: 180,
    minPrice: 140,
    maxPrice: 220,
    description: 'Skomplikowane wzory, mozaiki, dekoracyjne',
  },

  // Spoinowanie
  {
    id: 'bathroom_grouting',
    name: 'Spoinowanie płytek',
    unit: 'm2',
    basePrice: 30,
    minPrice: 20,
    maxPrice: 45,
    description: 'Wypełnianie spoin standardową zaprawą',
  },
  {
    id: 'bathroom_grouting_epoxy',
    name: 'Spoinowanie - epoksydowe',
    unit: 'm2',
    basePrice: 55,
    minPrice: 40,
    maxPrice: 75,
    description: 'Wysoka odporność na wilgoć i zabrudzenia',
  },

  // Instalacje
  {
    id: 'bathroom_plumbing_basic',
    name: 'Instalacja wodno-kanalizacyjna - podstawowa',
    unit: 'punkt',
    basePrice: 250,
    minPrice: 180,
    maxPrice: 350,
    description: 'Jeden punkt (kran, odpływ)',
  },
  {
    id: 'bathroom_plumbing_complex',
    name: 'Instalacja wodno-kanalizacyjna - złożona',
    unit: 'punkt',
    basePrice: 400,
    minPrice: 300,
    maxPrice: 550,
    description: 'Nowe ścianki, przebicia, skomplikowana geometria',
  },

  // Elektryka
  {
    id: 'bathroom_electrical_basic',
    name: 'Instalacja elektryczna - podstawowa',
    unit: 'punkt',
    basePrice: 180,
    minPrice: 130,
    maxPrice: 250,
    description: 'Jeden punkt (gniazdko, włącznik)',
  },
  {
    id: 'bathroom_electrical_ventilation',
    name: 'Wentylacja - instalacja i montaż',
    unit: 'sztuka',
    basePrice: 350,
    minPrice: 250,
    maxPrice: 500,
    description: 'Kanały wentylacyjne, nawiewniki',
  },

  // Sufity i ściany działowe
  {
    id: 'bathroom_drywall',
    name: 'Ścianki działowe z gipsu cartonowego',
    unit: 'm2',
    basePrice: 60,
    minPrice: 45,
    maxPrice: 80,
    description: 'Montaż i szpachlowanie gipsokartonu',
  },
  {
    id: 'bathroom_suspended_ceiling',
    name: 'Sufity podweszane',
    unit: 'm2',
    basePrice: 45,
    minPrice: 35,
    maxPrice: 65,
    description: 'Sufity gipsowe lub PVC',
  },

  // Elementy sanitarne
  {
    id: 'bathroom_fixtures_installation',
    name: 'Montaż elementów sanitarnych',
    unit: 'sztuka',
    basePrice: 120,
    minPrice: 80,
    maxPrice: 180,
    description: 'Umywalka, toaleta, wanna (bez materiału)',
  },
  {
    id: 'bathroom_mirror_cabinet',
    name: 'Montaż szafki lub lustra',
    unit: 'sztuka',
    basePrice: 80,
    minPrice: 50,
    maxPrice: 120,
    description: 'Zawieszenie i podłączenie elektryczne',
  },

  // Malowanie i ostatni słowa
  {
    id: 'bathroom_painting',
    name: 'Malowanie sufitu i ścian',
    unit: 'm2',
    basePrice: 22,
    minPrice: 16,
    maxPrice: 35,
    description: 'Farba akrylowa, wodna odporna na wilgoć',
  },
];

// ============================================================================
// USŁUGI - MALOWANIE ŚCIAN I SUFITÓW
// ============================================================================

const PAINTING_ITEMS: PricingItem[] = [
  // Przygotowanie powierzchni
  {
    id: 'painting_surface_prep_light',
    name: 'Przygotowanie powierzchni - lekkie',
    unit: 'm2',
    basePrice: 8,
    minPrice: 5,
    maxPrice: 12,
    description: 'Czyszczenie, szpachlowanie drobnych ubytków',
  },
  {
    id: 'painting_surface_prep_medium',
    name: 'Przygotowanie powierzchni - średnie',
    unit: 'm2',
    basePrice: 15,
    minPrice: 10,
    maxPrice: 22,
    description: 'Usunięcie starych powłok, szpachlowanie',
  },
  {
    id: 'painting_surface_prep_heavy',
    name: 'Przygotowanie powierzchni - wyczerpujące',
    unit: 'm2',
    basePrice: 28,
    minPrice: 20,
    maxPrice: 40,
    description: 'Całkowite usunięcie powłok, grunty specjalne',
  },

  // Gruntowanie
  {
    id: 'painting_primer_standard',
    name: 'Gruntowanie - standardowe',
    unit: 'm2',
    basePrice: 8,
    minPrice: 5,
    maxPrice: 12,
    description: 'Standardowy grunt zbliżający',
    alt: 'Farba podstawowa, uniwersalna',
  },
  {
    id: 'painting_primer_special',
    name: 'Gruntowanie - specjalne',
    unit: 'm2',
    basePrice: 12,
    minPrice: 8,
    maxPrice: 18,
    description: 'Do drewna, metalu, powierzchni trudnych',
  },

  // Malowanie
  {
    id: 'painting_acrylic_2coats',
    name: 'Malowanie - farba akrylowa (2 warstwy)',
    unit: 'm2',
    basePrice: 20,
    minPrice: 15,
    maxPrice: 28,
    description: 'Farba akrylowa wodna, ekologiczna',
  },
  {
    id: 'painting_latex_2coats',
    name: 'Malowanie - farba lateksowa (2 warstwy)',
    unit: 'm2',
    basePrice: 25,
    minPrice: 20,
    maxPrice: 33,
    description: 'Wyższej klasy, bardziej trwała',
  },
  {
    id: 'painting_special_effects',
    name: 'Malowanie - efekty specjalne',
    unit: 'm2',
    basePrice: 40,
    minPrice: 30,
    maxPrice: 55,
    description: 'Dekoracyjne, tekstury, ombre',
  },

  // Lakierowanie drewna
  {
    id: 'painting_wood_varnish',
    name: 'Lakierowanie drewna',
    unit: 'm2',
    basePrice: 35,
    minPrice: 25,
    maxPrice: 50,
    description: 'Lakier poliuretanowy, 2-3 warstwy',
  },
  {
    id: 'painting_wood_stain',
    name: 'Barwienie drewna',
    unit: 'm2',
    basePrice: 28,
    minPrice: 20,
    maxPrice: 40,
    description: 'Drewn, olej, woski, lakier matowy',
  },
];

// ============================================================================
// USŁUGI - UKŁADANIE PŁYTEK
// ============================================================================

const TILES_ITEMS: PricingItem[] = [
  // Przygotowanie
  {
    id: 'tiles_surface_prep',
    name: 'Przygotowanie podłoża',
    unit: 'm2',
    basePrice: 20,
    minPrice: 15,
    maxPrice: 30,
    description: 'Wyrównanie, czyszczenie, gruntowanie',
  },

  // Standardowe płytki
  {
    id: 'tiles_ceramic_standard',
    name: 'Płytki ceramiczne - standard (20-30cm)',
    unit: 'm2',
    basePrice: 85,
    minPrice: 65,
    maxPrice: 110,
    description: 'Zwykłe płytki ceramiczne',
  },
  {
    id: 'tiles_ceramic_small',
    name: 'Płytki ceramiczne - małe (10-15cm)',
    unit: 'm2',
    basePrice: 110,
    minPrice: 85,
    maxPrice: 140,
    description: 'Więcej połączeń, trudniejsze',
  },
  {
    id: 'tiles_ceramic_large',
    name: 'Płytki ceramiczne - duże (>40cm)',
    unit: 'm2',
    basePrice: 105,
    minPrice: 80,
    maxPrice: 135,
    description: 'Mniej spoin, wymagające wyrównania',
  },

  // Gres i porcelana
  {
    id: 'tiles_porcelain_standard',
    name: 'Płytki gresowe/porcelanowe - standard',
    unit: 'm2',
    basePrice: 110,
    minPrice: 85,
    maxPrice: 140,
    description: 'Wysoka wytrzymałość, duża gęstość',
  },
  {
    id: 'tiles_porcelain_large',
    name: 'Płytki gresowe - duże (>60cm)',
    unit: 'm2',
    basePrice: 150,
    minPrice: 120,
    maxPrice: 190,
    description: 'Wymagają profesjonalizmu',
  },

  // Mozaiki i dekoracyjne
  {
    id: 'tiles_mosaic',
    name: 'Mozaika/płytki małe dekoracyjne',
    unit: 'm2',
    basePrice: 160,
    minPrice: 120,
    maxPrice: 210,
    description: 'Skomplikowane wzory, czasochłonne',
  },

  // Spoinowanie
  {
    id: 'tiles_grouting_sand',
    name: 'Spoinowanie - zaprawa cementowa',
    unit: 'm2',
    basePrice: 25,
    minPrice: 18,
    maxPrice: 35,
    description: 'Standardowa zaprawa',
  },
  {
    id: 'tiles_grouting_epoxy',
    name: 'Spoinowanie - żywica epoksydowa',
    unit: 'm2',
    basePrice: 50,
    minPrice: 35,
    maxPrice: 70,
    description: 'Wysoka odporność na wilgoć i chemię',
  },

  // Uszczelnianie
  {
    id: 'tiles_sealing',
    name: 'Uszczelnianie płytek - hydrofobizacja',
    unit: 'm2',
    basePrice: 15,
    minPrice: 10,
    maxPrice: 22,
    description: 'Ochrona naturalnego kamienia i porcelany',
  },
];

// ============================================================================
// WSPÓŁCZYNNIKI MIASTA I DZIELNIC WARSZAWY
// ============================================================================

const WARSAW_DISTRICTS: DistrictCoefficient[] = [
  { name: 'Mokotów', coefficient: 1.0 }, // bazowy
  { name: 'Śródmieście', coefficient: 1.15 },
  { name: 'Wawer', coefficient: 0.92 },
  { name: 'Włochy', coefficient: 0.95 },
  { name: 'Piaseczno', coefficient: 0.88 },
  { name: 'Praga-Południe', coefficient: 0.98 },
  { name: 'Praga-Północ', coefficient: 0.92 },
  { name: 'Żoliborz', coefficient: 1.05 },
  { name: 'Śródmieście', coefficient: 1.12 },
  { name: 'Wola', coefficient: 1.02 },
  { name: 'Ochota', coefficient: 1.0 },
  { name: 'Bielany', coefficient: 0.98 },
  { name: 'Rembertów', coefficient: 0.85 },
];

const KRAKOW_DISTRICTS: DistrictCoefficient[] = [
  { name: 'Stare Miasto', coefficient: 1.1 },
  { name: 'Podgórze', coefficient: 0.95 },
  { name: 'Nowa Huta', coefficient: 0.88 },
  { name: 'Zwierzyniec', coefficient: 1.05 },
  { name: 'Bronowice', coefficient: 0.92 },
  { name: 'Krowodrza', coefficient: 0.98 },
];

const WROCLAW_DISTRICTS: DistrictCoefficient[] = [
  { name: 'Stare Miasto', coefficient: 1.08 },
  { name: 'Psie Pole', coefficient: 0.95 },
  { name: 'Przedmieście', coefficient: 0.90 },
  { name: 'Fabryczna', coefficient: 0.92 },
];

// ============================================================================
// WSPÓŁCZYNNIKI MIAST POLSKI
// ============================================================================

const CITY_COEFFICIENTS: CityCoefficient[] = [
  // WARSZAWA - Wmiejscowość
  {
    city: 'Warszawa',
    voivodeship: 'Mazowieckie',
    coefficient: 1.25,
    districts: WARSAW_DISTRICTS,
  },

  // Pozostałe metropolie
  {
    city: 'Kraków',
    voivodeship: 'Małopolskie',
    coefficient: 1.15,
    districts: KRAKOW_DISTRICTS,
  },
  {
    city: 'Wrocław',
    voivodeship: 'Dolnośląskie',
    coefficient: 1.12,
    districts: WROCLAW_DISTRICTS,
  },
  {
    city: 'Poznań',
    voivodeship: 'Wielkopolskie',
    coefficient: 1.10,
  },
  {
    city: 'Gdańsk',
    voivodeship: 'Pomorskie',
    coefficient: 1.10,
  },
  {
    city: 'Gdynia',
    voivodeship: 'Pomorskie',
    coefficient: 1.08,
  },
  {
    city: 'Sopot',
    voivodeship: 'Pomorskie',
    coefficient: 1.12,
  },

  // Miasta dużej wielkości
  {
    city: 'Łódź',
    voivodeship: 'Łódzkie',
    coefficient: 1.05,
  },
  {
    city: 'Katowice',
    voivodeship: 'Śląskie',
    coefficient: 1.08,
  },
  {
    city: 'Szczecin',
    voivodeship: 'Zachodniopomorskie',
    coefficient: 1.05,
  },
  {
    city: 'Lublin',
    voivodeship: 'Lubelskie',
    coefficient: 1.00,
  },

  // Miasta średnie
  {
    city: 'Zabrze',
    voivodeship: 'Śląskie',
    coefficient: 1.02,
  },
  {
    city: 'Gliwice',
    voivodeship: 'Śląskie',
    coefficient: 1.03,
  },
  {
    city: 'Bydgoszcz',
    voivodeship: 'Kujawsko-Pomorskie',
    coefficient: 1.00,
  },
  {
    city: 'Radom',
    voivodeship: 'Mazowieckie',
    coefficient: 0.95,
  },
  {
    city: 'Częstochowa',
    voivodeship: 'Śląskie',
    coefficient: 0.98,
  },
  {
    city: 'Białystok',
    voivodeship: 'Podlaskie',
    coefficient: 0.98,
  },
  {
    city: 'Kielce',
    voivodeship: 'Świętokrzyskie',
    coefficient: 0.95,
  },
  {
    city: 'Rzeszów',
    voivodeship: 'Podkarpackie',
    coefficient: 0.97,
  },

  // Miasta małe (domyślnie)
  {
    city: 'Inne miasta',
    voivodeship: 'Polskie',
    coefficient: 0.90,
  },
];

// ============================================================================
// WSPÓŁCZYNNIKI TYPU RYNKU
// ============================================================================

const MARKET_TYPE_COEFFICIENTS: MarketTypeCoefficient[] = [
  {
    type: 'primary',
    coefficient: 1.15,
    description: 'Rynek pierwotny - nowe budownictwo',
  },
  {
    type: 'secondary',
    coefficient: 1.0,
    description: 'Rynek wtórny - istniejące budynki',
  },
  {
    type: 'cooperative',
    coefficient: 1.08,
    description: 'Spółdzielnia - specyficzne warunki',
  },
];

// ============================================================================
// WSPÓŁCZYNNIKI STANDARDU PRACY
// ============================================================================

const STANDARD_COEFFICIENTS: StandardCoefficient[] = [
  {
    standard: 'economic',
    coefficient: 0.85,
    description: 'Ekonomiczny - materiały budżetowe, szybko',
  },
  {
    standard: 'standard',
    coefficient: 1.0,
    description: 'Standardowy - dobre materiały, normalna jakość',
  },
  {
    standard: 'premium',
    coefficient: 1.35,
    description: 'Premium - wysokiej klasy materiały, najwyższa jakość',
  },
];

// ============================================================================
// WSPÓŁCZYNNIKI SEZONOWE
// ============================================================================

const SEASON_COEFFICIENTS: SeasonCoefficient[] = [
  {
    season: 'winter',
    coefficient: 0.95,
    months: [12, 1, 2],
    description: 'Zima - mniej pracy, rabaty',
  },
  {
    season: 'spring',
    coefficient: 1.1,
    months: [3, 4, 5],
    description: 'Wiosna - wysoki sezon',
  },
  {
    season: 'summer',
    coefficient: 1.15,
    months: [6, 7, 8],
    description: 'Lato - najwyższy sezon',
  },
  {
    season: 'autumn',
    coefficient: 1.0,
    months: [9, 10, 11],
    description: 'Jesień - normalnie',
  },
];

// ============================================================================
// STRUKTURA CENNIKOWA
// ============================================================================

export const PRICING_STRUCTURE: PricingStructure = {
  bathroom: {
    id: 'bathroom',
    name: 'Remont łazienki',
    items: BATHROOM_ITEMS,
  },
  painting: {
    id: 'painting',
    name: 'Malowanie',
    items: PAINTING_ITEMS,
  },
  tiles: {
    id: 'tiles',
    name: 'Układanie płytek',
    items: TILES_ITEMS,
  },
  cityCoefficients: CITY_COEFFICIENTS,
  marketTypeCoefficients: MARKET_TYPE_COEFFICIENTS,
  standardCoefficients: STANDARD_COEFFICIENTS,
  seasonCoefficients: SEASON_COEFFICIENTS,
};

// ============================================================================
// FUNKCJE POMOCNICZE
// ============================================================================

/**
 * Pobiera współczynnik miasta
 */
export function getCityCoefficient(city: string): CityCoefficient | undefined {
  return CITY_COEFFICIENTS.find(
    (c) => c.city.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Pobiera współczynnik dzielnicy
 */
export function getDistrictCoefficient(
  city: string,
  district: string
): number | undefined {
  const cityCoef = getCityCoefficient(city);
  if (!cityCoef || !cityCoef.districts) return undefined;

  const districtCoef = cityCoef.districts.find(
    (d) => d.name.toLowerCase() === district.toLowerCase()
  );
  return districtCoef?.coefficient;
}

/**
 * Pobiera współczynnik typu rynku
 */
export function getMarketTypeCoefficient(
  type: 'primary' | 'secondary' | 'cooperative'
): number {
  const coef = MARKET_TYPE_COEFFICIENTS.find((m) => m.type === type);
  return coef?.coefficient ?? 1.0;
}

/**
 * Pobiera współczynnik standardu
 */
export function getStandardCoefficient(
  standard: 'economic' | 'standard' | 'premium'
): number {
  const coef = STANDARD_COEFFICIENTS.find((s) => s.standard === standard);
  return coef?.coefficient ?? 1.0;
}

/**
 * Pobiera współczynnik sezonowy na podstawie miesiąca
 */
export function getSeasonCoefficient(month: number): number {
  const coef = SEASON_COEFFICIENTS.find((s) => s.months.includes(month));
  return coef?.coefficient ?? 1.0;
}

/**
 * Pobiera bazową cenę przedmiotu
 */
export function getItemBasePrice(category: string, itemId: string): number | undefined {
  const cat = PRICING_STRUCTURE[category as keyof PricingStructure];
  if (!cat || typeof cat === 'object' && !('items' in cat)) return undefined;

  const item = (cat as Category).items.find((i) => i.id === itemId);
  return item?.basePrice;
}

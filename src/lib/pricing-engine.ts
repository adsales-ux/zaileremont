/**
 * Silnik cenowy do obliczania cen usług remontowych
 * Wykorzystuje wielowarstwowy algorytm z współczynnikami:
 * - Zmiejscowości (Wmiejscowość)
 * - Dzielnicę (Wdzielnica)
 * - Sezon (Wsezon)
 * - Typ rynku (Wrynek)
 * - Standard pracy (Wstandard)
 * - Złożoność (Wskomplikowanie)
 *
 * Rozkład: lognormalny dla percentyli (p10, p25, p50, p75, p90)
 */

import {
  PRICING_STRUCTURE,
  getCityCoefficient,
  getDistrictCoefficient,
  getMarketTypeCoefficient,
  getStandardCoefficient,
  getSeasonCoefficient,
  PricingItem,
} from '../data/pricing';
import { getCityById, getDistrictCoefficient as getDistrictCoefficientFromCities } from '../data/cities';

// ============================================================================
// INTERFEJSY I TYPY
// ============================================================================

export interface PricingFormAnswers {
  // Lokalizacja
  city: string; // ID miasta lub nazwa
  district?: string; // ID dzielnicy (opcjonalnie)
  voivodeship?: string;

  // Typ usługi
  serviceType: 'bathroom' | 'painting' | 'tiles';

  // Parametry usługi
  area: number; // m2
  selectedItems: string[]; // lista ID wybranych przedmiotów
  complexity?: number; // 1-10, domyślnie 5

  // Parametry dodatkowe
  marketType: 'primary' | 'secondary' | 'cooperative'; // domyślnie secondary
  standard: 'economic' | 'standard' | 'premium'; // domyślnie standard
  month?: number; // 1-12, domyślnie bieżący miesiąc
}

export interface PriceBreakdown {
  basePrice: number;
  cityCoefficient: number;
  districtCoefficient: number;
  seasonCoefficient: number;
  marketTypeCoefficient: number;
  standardCoefficient: number;
  complexityCoefficient: number;
  finalCoefficient: number;
  totalPrice: number;
}

export interface PriceResult {
  currency: string;
  basePrice: number;
  minPrice: number;
  medianPrice: number;
  maxPrice: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  breakdown: PriceBreakdown;
  itemizedBreakdown?: ItemizedBreakdown[];
}

export interface ItemizedBreakdown {
  itemId: string;
  itemName: string;
  unit: string;
  basePrice: number;
  quantity: number;
  subtotal: number;
  finalPrice: number;
}

export interface CityComparison {
  city: string;
  coefficient: number;
  pricePerUnit: number;
  minPrice: number;
  medianPrice: number;
  maxPrice: number;
}

// ============================================================================
// ROZKŁAD LOGNORMALNY - GENERATORY PERCENTYLI
// ============================================================================

/**
 * Generuje rozkład lognormalny dla danej wartości środkowej (median)
 * Parametry: μ i σ dla ln(X)
 *
 * Medianą rozkładu lognormalnego jest: e^μ
 * Odchylenie standardowe i inne percentyle się liczą inaczej
 */
function generateLognormalDistribution(
  median: number,
  sigma: number = 0.25 // domyślna zmienność (25%)
): {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  min: number;
  max: number;
} {
  // μ = ln(median)
  const mu = Math.log(median);

  // Odwrotna CDF dla rozkładu lognormalnego
  const inverseNormalCDF = (p: number): number => {
    // Przybliżenie Hart's metody dla rozkładu normalnego
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;

    const t = Math.sqrt(-2 * Math.log(Math.min(p, 1 - p)));
    const c = [2.515517, 0.802853, 0.010328];
    const d = [1.432788, 0.189269, 0.001308];

    let num = c[0] + c[1] * t + c[2] * t * t;
    let den = 1 + d[0] * t + d[1] * t * t + d[2] * t * t * t;
    let z = t - num / den;

    return p < 0.5 ? -z : z;
  };

  const percentiles = {
    p10: Math.exp(mu + sigma * inverseNormalCDF(0.1)),
    p25: Math.exp(mu + sigma * inverseNormalCDF(0.25)),
    p50: Math.exp(mu + sigma * inverseNormalCDF(0.5)),
    p75: Math.exp(mu + sigma * inverseNormalCDF(0.75)),
    p90: Math.exp(mu + sigma * inverseNormalCDF(0.9)),
  };

  return {
    ...percentiles,
    min: Math.exp(mu + sigma * inverseNormalCDF(0.01)),
    max: Math.exp(mu + sigma * inverseNormalCDF(0.99)),
  };
}

// ============================================================================
// OBLICZANIE WSPÓŁCZYNNIKÓW
// ============================================================================

/**
 * Oblicza współczynnik miasta (Wmiejscowość)
 */
function calculateCityCoefficient(city: string): number {
  // Próba znalezienia po ID z listy miast
  const cityData = getCityById(city);
  if (cityData) return cityData.coefficient;

  // Próba znalezienia po nazwie z pricing data
  const pricingCity = getCityCoefficient(city);
  if (pricingCity) return pricingCity.coefficient;

  // Fallback
  return 0.9;
}

/**
 * Oblicza współczynnik dzielnicy (Wdzielnica)
 */
function calculateDistrictCoefficient(
  city: string,
  district?: string
): number {
  if (!district) return 1.0;

  // Próba z cities data
  const districtCoef = getDistrictCoefficientFromCities(city, district);
  if (districtCoef) return districtCoef;

  // Próba z pricing data
  const districtCoef2 = getDistrictCoefficient(city, district);
  if (districtCoef2) return districtCoef2;

  return 1.0;
}

/**
 * Oblicza współczynnik sezonowy (Wsezon)
 * Zależy od miesiąca w roku
 */
function calculateSeasonCoefficient(month?: number): number {
  const currentMonth = month ?? new Date().getMonth() + 1;
  return getSeasonCoefficient(currentMonth);
}

/**
 * Oblicza współczynnik typu rynku (Wrynek)
 */
function calculateMarketTypeCoefficient(
  marketType: 'primary' | 'secondary' | 'cooperative' = 'secondary'
): number {
  return getMarketTypeCoefficient(marketType);
}

/**
 * Oblicza współczynnik standardu pracy (Wstandard)
 */
function calculateStandardCoefficient(
  standard: 'economic' | 'standard' | 'premium' = 'standard'
): number {
  return getStandardCoefficient(standard);
}

/**
 * Oblicza współczynnik złożoności (Wskomplikowanie)
 * Na podstawie liczby wybranych opcji i podanego poziomu złożoności
 */
function calculateComplexityCoefficient(
  selectedItemsCount: number,
  complexityLevel: number = 5
): number {
  // Normalizacja poziomu złożoności do 1-10
  const normalized = Math.max(1, Math.min(10, complexityLevel));

  // Współczynnik bazowy z liczby przedmiotów
  // 1 przedmiot = 1.0, każdy dodatkowy +0.05
  const itemCoefficient = 1.0 + Math.max(0, (selectedItemsCount - 1) * 0.05);

  // Współczynnik z poziomu złożoności
  // 1-3 = 0.85-0.95 (ekonomicznie)
  // 5 = 1.0 (standard)
  // 7-10 = 1.15-1.4 (premium)
  const complexityCoefficient = 0.8 + (normalized / 10) * 0.6;

  // Średnia ważona
  return (itemCoefficient + complexityCoefficient) / 2;
}

/**
 * Oblicza finalny współczynnik (mnożenie wszystkich współczynników)
 */
function calculateFinalCoefficient(
  cityCoef: number,
  districtCoef: number,
  seasonCoef: number,
  marketTypeCoef: number,
  standardCoef: number,
  complexityCoef: number
): number {
  return cityCoef * districtCoef * seasonCoef * marketTypeCoef * standardCoef * complexityCoef;
}

// ============================================================================
// GŁÓWNE FUNKCJE CENOWE
// ============================================================================

/**
 * Oblicza podstawową cenę na podstawie wybranych przedmiotów i pola
 */
function calculateBasePriceFromItems(
  serviceType: 'bathroom' | 'painting' | 'tiles',
  selectedItems: string[],
  area: number
): { basePrice: number; itemized: ItemizedBreakdown[] } {
  const category = PRICING_STRUCTURE[serviceType];
  if (!category || typeof category !== 'object' || !('items' in category)) {
    return { basePrice: 0, itemized: [] };
  }

  let totalPrice = 0;
  const itemized: ItemizedBreakdown[] = [];

  for (const itemId of selectedItems) {
    const item = category.items.find((i) => i.id === itemId);
    if (!item) continue;

    // Oblicz ilość na podstawie jednostki
    let quantity = 1;
    if (item.unit === 'm2' || item.unit === 'm2') {
      quantity = area;
    } else if (item.unit === 'punkt' || item.unit === 'punkt') {
      // Dla punktów (kraniki, włączniki) - przypisz domyślnie 1-4
      quantity = Math.ceil(area / 10);
    }

    const subtotal = item.basePrice * quantity;
    totalPrice += subtotal;

    itemized.push({
      itemId: item.id,
      itemName: item.name,
      unit: item.unit,
      basePrice: item.basePrice,
      quantity,
      subtotal,
      finalPrice: subtotal, // będzie zaktualizowana w głównej funkcji
    });
  }

  return { basePrice: totalPrice, itemized };
}

/**
 * Główna funkcja - oblicza cenę usługi
 */
export function calculatePrice(answers: PricingFormAnswers): PriceResult {
  // ========== WALIDACJA I DEFAULTS ==========
  const marketType = answers.marketType ?? 'secondary';
  const standard = answers.standard ?? 'standard';
  const serviceType = answers.serviceType;
  const area = Math.max(1, answers.area);

  // ========== WYLICZANIE WSPÓŁCZYNNIKÓW ==========
  const cityCoef = calculateCityCoefficient(answers.city);
  const districtCoef = calculateDistrictCoefficient(answers.city, answers.district);
  const seasonCoef = calculateSeasonCoefficient(answers.month);
  const marketTypeCoef = calculateMarketTypeCoefficient(marketType);
  const standardCoef = calculateStandardCoefficient(standard);
  const complexityCoef = calculateComplexityCoefficient(
    answers.selectedItems.length,
    answers.complexity ?? 5
  );

  const finalCoef = calculateFinalCoefficient(
    cityCoef,
    districtCoef,
    seasonCoef,
    marketTypeCoef,
    standardCoef,
    complexityCoef
  );

  // ========== OBLICZANIE CENY BAZOWEJ ==========
  const { basePrice, itemized } = calculateBasePriceFromItems(
    serviceType,
    answers.selectedItems,
    area
  );

  // Jeśli nie ma wybranych przedmiotów, zwróć zero
  if (basePrice === 0 || answers.selectedItems.length === 0) {
    return {
      currency: 'PLN',
      basePrice: 0,
      minPrice: 0,
      medianPrice: 0,
      maxPrice: 0,
      p10: 0,
      p25: 0,
      p50: 0,
      p75: 0,
      p90: 0,
      breakdown: {
        basePrice: 0,
        cityCoefficient: cityCoef,
        districtCoefficient: districtCoef,
        seasonCoefficient: seasonCoef,
        marketTypeCoefficient: marketTypeCoef,
        standardCoefficient: standardCoef,
        complexityCoefficient: complexityCoef,
        finalCoefficient: finalCoef,
        totalPrice: 0,
      },
      itemizedBreakdown: itemized,
    };
  }

  // ========== OBLICZANIE CENY FINALNEJ ==========
  const totalPrice = Math.round(basePrice * finalCoef);

  // ========== ROZKŁAD LOGNORMALNY ==========
  // Zmienność (sigma) zależy od złożoności:
  // - złożone = wyższa zmienność (0.35)
  // - normalne = średnia (0.25)
  // - proste = niska (0.15)
  const sigma =
    complexityCoef > 1.1 ? 0.35 : complexityCoef < 0.95 ? 0.15 : 0.25;

  const distribution = generateLognormalDistribution(totalPrice, sigma);

  // ========== AKTUALIZACJA ITEMIZED BREAKDOWN ==========
  const itemMultiplier = finalCoef;
  const updatedItemized = itemized.map((item) => ({
    ...item,
    finalPrice: Math.round(item.subtotal * itemMultiplier),
  }));

  // ========== ZWRÓCENIE WYNIKU ==========
  return {
    currency: 'PLN',
    basePrice: Math.round(basePrice),
    minPrice: Math.round(distribution.min),
    medianPrice: totalPrice,
    maxPrice: Math.round(distribution.max),
    p10: Math.round(distribution.p10),
    p25: Math.round(distribution.p25),
    p50: Math.round(distribution.p50),
    p75: Math.round(distribution.p75),
    p90: Math.round(distribution.p90),
    breakdown: {
      basePrice: Math.round(basePrice),
      cityCoefficient: Math.round(cityCoef * 100) / 100,
      districtCoefficient: Math.round(districtCoef * 100) / 100,
      seasonCoefficient: Math.round(seasonCoef * 100) / 100,
      marketTypeCoefficient: Math.round(marketTypeCoef * 100) / 100,
      standardCoefficient: Math.round(standardCoef * 100) / 100,
      complexityCoefficient: Math.round(complexityCoef * 100) / 100,
      finalCoefficient: Math.round(finalCoef * 100) / 100,
      totalPrice,
    },
    itemizedBreakdown: updatedItemized,
  };
}

// ============================================================================
// PORÓWNANIE MIAST
// ============================================================================

/**
 * Generuje porównanie cen między miastami
 */
export function generateCityComparison(
  baseAnswers: PricingFormAnswers,
  citiesToCompare?: string[]
): CityComparison[] {
  const { city: baseCity, area, selectedItems, serviceType, ...rest } = baseAnswers;

  // Jeśli nie podano miast, porowniaj ze wszystkimi głównymi miastami
  const citiesForComparison =
    citiesToCompare ||
    [
      'warsaw',
      'krakow',
      'wroclaw',
      'poznan',
      'gdansk',
      'lodz',
      'lublin',
      'szczecin',
    ];

  return citiesForComparison
    .map((cityId) => {
      const cityData = getCityById(cityId);
      if (!cityData) return null;

      const result = calculatePrice({
        ...baseAnswers,
        city: cityId,
        district: undefined, // bez dzielnicy dla porównania
      });

      return {
        city: cityData.name,
        coefficient: cityData.coefficient,
        pricePerUnit: Math.round(result.medianPrice / area),
        minPrice: result.p10,
        medianPrice: result.p50,
        maxPrice: result.p90,
      };
    })
    .filter((c) => c !== null) as CityComparison[];
}

/**
 * Oblicza oczekiwaną zmienność ceny na podstawie parametrów
 */
export function calculatePriceVolatility(answers: PricingFormAnswers): {
  variability: number;
  description: string;
} {
  const complexity = answers.complexity ?? 5;
  const itemsCount = answers.selectedItems.length;

  // Zmienność rośnie z:
  // - większą złożonością
  // - większą liczbą elementów
  // - niezwykłością (poza standardem)
  const baseVolatility = complexity / 10; // 0.1 - 1.0
  const itemsVolatility = Math.min(0.3, itemsCount * 0.05);
  const standardVolatility =
    answers.standard === 'premium' ? 0.15 : answers.standard === 'economic' ? 0.1 : 0;

  const totalVariability = baseVolatility + itemsVolatility + standardVolatility;

  let description = 'Niska zmienność - przewidywalna cena';
  if (totalVariability > 0.4)
    description = 'Średnia zmienność - możliwe odchylenia';
  if (totalVariability > 0.7)
    description = 'Wysoka zmienność - szerokie spektrum cen';

  return {
    variability: Math.min(1, totalVariability),
    description,
  };
}

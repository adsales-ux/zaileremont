'use client';

import React, { useState } from 'react';
import StepIndicator from '@/components/ui/StepIndicator';
import Button from '@/components/ui/Button';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import SelectField from '@/components/ui/SelectField';
import NumberInput from '@/components/ui/NumberInput';
import RadioGroup from '@/components/ui/RadioGroup';
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import PriceResult from '@/components/ui/PriceResult';
import { CityData, getDistricts } from '@/data/cities';
import { calculatePrice, PricingFormAnswers } from '@/lib/pricing-engine';
import { PriceResult as PriceResultType } from '@/lib/pricing-engine';

interface FormState {
  // Step 1: Lokalizacja
  city: CityData | null;
  district: string;

  // Step 2: Typ nieruchomości
  propertyType: 'primary' | 'secondary' | 'cooperative';

  // Step 3: Wymiary
  area: number;
  wallHeight: number;
  sizeCategory: 'small' | 'medium' | 'large' | 'luxury' | null;

  // Step 4: Demontaż
  demolitionItems: string[];

  // Step 5: Prace przygotowawcze
  wallLeveling: 'yes' | 'no' | 'unknown';
  floorLeveling: 'yes' | 'no' | 'unknown';
  waterproofing: 'yes' | 'no';

  // Step 6: Instalacje
  installations: string[];

  // Step 7: Wykończenie
  wallType: 'tiles' | 'tiles-paint' | 'paint' | 'wallpaper';
  floorType: 'ceramic' | 'gres' | 'vinyl';
  tileFormat: 'small' | 'medium' | 'large' | 'mosaic';

  // Step 8: Wyposażenie
  fixtures: string[];

  // Step 9: Standard
  standard: 'economic' | 'standard' | 'premium';

  // Step 10: Zakres wyceny
  scope: 'labor' | 'labor-materials' | 'full';
}

const STEP_TITLES = [
  'Lokalizacja',
  'Typ nieruchomości',
  'Wymiary łazienki',
  'Prace demontażowe',
  'Prace przygotowawcze',
  'Instalacje',
  'Wykończenie',
  'Wyposażenie',
  'Wybrany standard',
  'Zakres wyceny',
];

const STEP_DESCRIPTIONS = [
  'Gdzie znajduje się Twoja łazienka?',
  'Jaki typ nieruchomości będzie remontowana?',
  'Jakie są wymiary Twojej łazienki?',
  'Które prace demontażowe będą potrzebne?',
  'Jakie prace przygotowawcze będą konieczne?',
  'Które instalacje będą wymieniane?',
  'Jak będzie wykończona łazienka?',
  'Jakie wyposażenie będzie zainstalowane?',
  'Jaki standard pracy Cię interesuje?',
  'Jaki zakres wyceny chciałbyś otrzymać?',
];

const SIZE_CATEGORIES = {
  small: { label: 'Mała (<4m²)', value: 'small', min: 1, max: 3.99 },
  medium: { label: 'Średnia (4-6m²)', value: 'medium', min: 4, max: 6 },
  large: { label: 'Duża (6-10m²)', value: 'large', min: 6.01, max: 10 },
  luxury: { label: 'Luksusowa (>10m²)', value: 'luxury', min: 10.01, max: 30 },
};

export default function BathroomCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [priceResult, setPriceResult] = useState<PriceResultType | null>(null);

  const [form, setForm] = useState<FormState>({
    city: null,
    district: '',
    propertyType: 'secondary',
    area: 5,
    wallHeight: 2.5,
    sizeCategory: null,
    demolitionItems: [],
    wallLeveling: 'unknown',
    floorLeveling: 'unknown',
    waterproofing: 'no',
    installations: [],
    wallType: 'tiles',
    floorType: 'ceramic',
    tileFormat: 'medium',
    fixtures: [],
    standard: 'standard',
    scope: 'full',
  });

  const districts = form.city ? getDistricts(form.city.id) : undefined;

  const handleNext = () => {
    if (currentStep < STEP_TITLES.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCalculate = async () => {
    if (!form.city) return;

    setIsLoading(true);

    // Build selected items based on form selections
    const selectedItems = buildSelectedItems();

    // Create pricing form answers
    const answers: PricingFormAnswers = {
      city: form.city.id,
      district: form.district || undefined,
      serviceType: 'bathroom',
      area: form.area,
      selectedItems,
      marketType: form.propertyType,
      standard: form.standard,
      complexity: calculateComplexity(),
    };

    try {
      const result = calculatePrice(answers);
      setPriceResult(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  const buildSelectedItems = (): string[] => {
    const items: string[] = [];

    // Demolition items
    if (form.propertyType === 'secondary') {
      if (form.demolitionItems.includes('tiles')) {
        items.push('bathroom_demolition_basic');
      }
      if (form.demolitionItems.includes('fixtures')) {
        items.push('bathroom_demolition_basic');
      }
    }

    // Surface preparation
    if (form.wallLeveling !== 'no' || form.floorLeveling !== 'no') {
      items.push('bathroom_surface_prep');
    }

    // Waterproofing
    if (form.waterproofing === 'yes') {
      items.push('bathroom_waterproofing_membrane');
    }

    // Wall finish
    if (form.wallType === 'tiles' || form.wallType === 'tiles-paint') {
      items.push(
        form.tileFormat === 'small'
          ? 'bathroom_tiles_small'
          : form.tileFormat === 'medium'
            ? 'bathroom_tiles_medium'
            : form.tileFormat === 'large'
              ? 'bathroom_tiles_large'
              : 'bathroom_tiles_mosaic'
      );
      items.push('bathroom_grouting');
    }
    if (form.wallType === 'paint' || form.wallType === 'tiles-paint') {
      items.push('bathroom_painting');
    }

    // Floor finish
    if (form.floorType) {
      items.push('bathroom_tiles_medium'); // Representing floor tiles
    }

    // Installations
    if (form.installations.includes('plumbing')) {
      items.push('bathroom_plumbing_basic');
    }
    if (form.installations.includes('electrical')) {
      items.push('bathroom_electrical_basic');
    }
    if (form.installations.includes('ventilation')) {
      items.push('bathroom_electrical_ventilation');
    }

    // Fixtures
    if (form.fixtures.length > 0) {
      items.push('bathroom_fixtures_installation');
    }
    if (form.fixtures.includes('mirror')) {
      items.push('bathroom_mirror_cabinet');
    }

    // Default item if none selected
    if (items.length === 0) {
      items.push('bathroom_surface_prep');
    }

    return items;
  };

  const calculateComplexity = (): number => {
    let complexity = 5; // base

    // More items = more complexity
    const selectedItems = buildSelectedItems();
    complexity += selectedItems.length * 0.5;

    // Waterproofing adds complexity
    if (form.waterproofing === 'yes') complexity += 1;

    // Premium standard increases complexity
    if (form.standard === 'premium') complexity += 2;

    return Math.min(10, complexity);
  };

  // Show result screen
  if (priceResult) {
    return (
      <div className="w-full space-y-6">
        <PriceResult
          serviceName="remontu łazienki"
          city={form.city?.name || 'nieznane miasto'}
          district={form.district ? districts?.find(d => d.id === form.district)?.name : undefined}
          area={form.area}
          marketType={
            form.propertyType === 'primary'
              ? 'pierwotny'
              : form.propertyType === 'cooperative'
                ? 'spółdzielczy'
                : 'wtórny'
          }
          minPrice={priceResult.p10}
          medianPrice={priceResult.p50}
          maxPrice={priceResult.p90}
          percentiles={{
            p10: priceResult.p10,
            p25: priceResult.p25,
            p50: priceResult.p50,
            p75: priceResult.p75,
            p90: priceResult.p90,
          }}
        />

        <button
          onClick={() => {
            setPriceResult(null);
            setCurrentStep(1);
          }}
          className="w-full rounded-lg border-2 border-slate-300 py-3 font-medium text-slate-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          Oblicz jeszcze raz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Step Indicator */}
      <div className="sticky top-0 z-10 bg-white py-4 -mx-4 px-4 sm:px-0">
        <StepIndicator currentStep={currentStep} totalSteps={STEP_TITLES.length} />
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {STEP_TITLES[currentStep - 1]}
          </h2>
          <p className="mt-2 text-slate-600">
            {STEP_DESCRIPTIONS[currentStep - 1]}
          </p>
        </div>

        {/* Step 1: Lokalizacja */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <CityAutocomplete
              label="Miasto"
              placeholder="Wpisz nazwę miasta..."
              value={form.city}
              onChange={(city) => setForm({ ...form, city, district: '' })}
            />

            {districts && districts.length > 0 && (
              <SelectField
                label="Dzielnica (opcjonalnie)"
                options={[
                  { value: '', label: 'Brak - cena dla całego miasta' },
                  ...districts.map((d) => ({ value: d.id, label: d.name })),
                ]}
                value={form.district}
                onChange={(e) =>
                  setForm({ ...form, district: e.target.value })
                }
              />
            )}
          </div>
        )}

        {/* Step 2: Typ nieruchomości */}
        {currentStep === 2 && (
          <RadioGroup
            name="propertyType"
            options={[
              {
                value: 'primary',
                label: 'Rynek pierwotny',
                description: 'Nowe budownictwo, projekt deweloperski',
              },
              {
                value: 'secondary',
                label: 'Rynek wtórny',
                description: 'Istniejący budynek, mieszkanie do remontu',
              },
              {
                value: 'cooperative',
                label: 'Budownictwo spółdzielcze',
                description: 'Mieszkanie w spółdzielni mieszkaniowej',
              },
            ]}
            value={form.propertyType}
            onChange={(value) =>
              setForm({
                ...form,
                propertyType: value as typeof form.propertyType,
              })
            }
          />
        )}

        {/* Step 3: Wymiary */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Powierzchnia (m²)"
                min={2}
                max={30}
                step={0.5}
                value={form.area}
                onChange={(value) =>
                  setForm({ ...form, area: value })
                }
                unit="m²"
              />

              <NumberInput
                label="Wysokość ścian (m)"
                min={2}
                max={4}
                step={0.1}
                value={form.wallHeight}
                onChange={(value) =>
                  setForm({
                    ...form,
                    wallHeight: value || 2.5,
                  })
                }
                unit="m"
              />
            </div>

            <div className="border-t pt-6">
              <p className="mb-4 text-sm font-medium text-slate-700">
                Lub wybierz gotową kategorię:
              </p>
              <RadioGroup
                name="sizeCategory"
                layout="horizontal"
                options={[
                  {
                    value: 'small',
                    label: SIZE_CATEGORIES.small.label,
                  },
                  {
                    value: 'medium',
                    label: SIZE_CATEGORIES.medium.label,
                  },
                  {
                    value: 'large',
                    label: SIZE_CATEGORIES.large.label,
                  },
                  {
                    value: 'luxury',
                    label: SIZE_CATEGORIES.luxury.label,
                  },
                ]}
                value={form.sizeCategory || ''}
                onChange={(value) => {
                  const cat = value as keyof typeof SIZE_CATEGORIES;
                  const mid = (SIZE_CATEGORIES[cat].min + SIZE_CATEGORIES[cat].max) / 2;
                  setForm({
                    ...form,
                    sizeCategory: value as typeof form.sizeCategory,
                    area: mid,
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Demontaż (only for secondary market) */}
        {currentStep === 4 && (
          <>
            {form.propertyType !== 'secondary' ? (
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  Prace demontażowe nie są wymagane dla rynku pierwotnego lub spółdzielni.
                  Przechodzimy do następnego kroku.
                </p>
              </div>
            ) : (
              <CheckboxGroup
                name="demolitionItems"
                options={[
                  {
                    value: 'tiles',
                    label: 'Skucie starych płytek',
                    description: 'Usunięcie kafli ze ścian i podłogi',
                  },
                  {
                    value: 'fixtures',
                    label: 'Demontaż sanitariatów',
                    description: 'Usunięcie umywalek, toalet, wanien',
                  },
                  {
                    value: 'pipes',
                    label: 'Demontaż instalacji',
                    description: 'Rozbiórkę starych rur i przewodów',
                  },
                  {
                    value: 'debris',
                    label: 'Wywóz gruzu',
                    description: 'Transport i usunięcie materiałów odpadowych',
                  },
                ]}
                values={form.demolitionItems}
                onChange={(values) =>
                  setForm({ ...form, demolitionItems: values })
                }
              />
            )}
          </>
        )}

        {/* Step 5: Prace przygotowawcze */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <RadioGroup
              label="Wyrównanie ścian"
              name="wallLeveling"
              options={[
                { value: 'yes', label: 'Tak - ściany wymagają wyrównania' },
                { value: 'no', label: 'Nie - ściany są wyrównane' },
                { value: 'unknown', label: 'Nie wiem - wymaga oceny' },
              ]}
              value={form.wallLeveling}
              onChange={(value) =>
                setForm({
                  ...form,
                  wallLeveling: value as typeof form.wallLeveling,
                })
              }
            />

            <RadioGroup
              label="Wyrównanie podłogi"
              name="floorLeveling"
              options={[
                { value: 'yes', label: 'Tak - podłoga wymaguje wyrównania' },
                { value: 'no', label: 'Nie - podłoga jest wyrównana' },
                { value: 'unknown', label: 'Nie wiem - wymaga oceny' },
              ]}
              value={form.floorLeveling}
              onChange={(value) =>
                setForm({
                  ...form,
                  floorLeveling: value as typeof form.floorLeveling,
                })
              }
            />

            <RadioGroup
              label="Hydroizolacja"
              name="waterproofing"
              options={[
                {
                  value: 'yes',
                  label: 'Tak - zastosuj membranę hydroizolacyjną',
                  description: 'Wysoka ochrona przed wilgocią',
                },
                {
                  value: 'no',
                  label: 'Nie - standard bez dodatkowej hydroizolacji',
                  description: 'Standardowa ochrona płytkami',
                },
              ]}
              value={form.waterproofing}
              onChange={(value) =>
                setForm({
                  ...form,
                  waterproofing: value as typeof form.waterproofing,
                })
              }
            />
          </div>
        )}

        {/* Step 6: Instalacje */}
        {currentStep === 6 && (
          <CheckboxGroup
            name="installations"
            options={[
              {
                value: 'plumbing',
                label: 'Wymiana hydrauliki',
                description: 'Nowe rury wodne i kanalizacyjne',
              },
              {
                value: 'electrical',
                label: 'Wymiana elektryki',
                description: 'Nowe gniazda, wyłączniki, oświetlenie',
              },
              {
                value: 'floorHeating',
                label: 'Ogrzewanie podłogowe',
                description: 'Mata lub system grzejny w podłodze',
              },
              {
                value: 'ventilation',
                label: 'Wentylacja mechaniczna',
                description: 'System wentylacji i kanały powietrzne',
              },
            ]}
            values={form.installations}
            onChange={(values) =>
              setForm({ ...form, installations: values })
            }
          />
        )}

        {/* Step 7: Wykończenie */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <RadioGroup
              label="Wykończenie ścian"
              name="wallType"
              options={[
                { value: 'tiles', label: 'Tylko płytki ceramiczne' },
                {
                  value: 'tiles-paint',
                  label: 'Płytki + malowanie górnych ścian',
                },
                { value: 'paint', label: 'Malowanie (bez płytek)' },
                { value: 'wallpaper', label: 'Tapeta' },
              ]}
              value={form.wallType}
              onChange={(value) =>
                setForm({
                  ...form,
                  wallType: value as typeof form.wallType,
                })
              }
            />

            <RadioGroup
              label="Typ podłogi"
              name="floorType"
              options={[
                {
                  value: 'ceramic',
                  label: 'Płytki ceramiczne',
                  description: 'Klasyczne i trwałe',
                },
                {
                  value: 'gres',
                  label: 'Gres/porcelana',
                  description: 'Wysoka wytrzymałość',
                },
                {
                  value: 'vinyl',
                  label: 'Winyl LVT',
                  description: 'Nowoczesny i wygodny',
                },
              ]}
              value={form.floorType}
              onChange={(value) =>
                setForm({
                  ...form,
                  floorType: value as typeof form.floorType,
                })
              }
            />

            <RadioGroup
              label="Format płytek"
              name="tileFormat"
              options={[
                { value: 'small', label: 'Małe (10-20cm)', description: 'Klasyczne' },
                { value: 'medium', label: 'Średnie (25-40cm)', description: 'Popularne' },
                { value: 'large', label: 'Duże (>50cm)', description: 'Nowoczesne' },
                {
                  value: 'mosaic',
                  label: 'Mozaika/dekoracyjne',
                  description: 'Artystyczne',
                },
              ]}
              value={form.tileFormat}
              onChange={(value) =>
                setForm({
                  ...form,
                  tileFormat: value as typeof form.tileFormat,
                })
              }
            />
          </div>
        )}

        {/* Step 8: Wyposażenie */}
        {currentStep === 8 && (
          <CheckboxGroup
            name="fixtures"
            options={[
              {
                value: 'tub-shower',
                label: 'Wanna/Prysznic',
                description: 'Wymiana uzbrojenia',
              },
              {
                value: 'toilet',
                label: 'WC',
                description: 'Kompakt lub podwieszane',
              },
              {
                value: 'sink',
                label: 'Umywalka',
                description: 'Nablatowa lub wpuszczana',
              },
              {
                value: 'mirror',
                label: 'Szafka z lustrem',
                description: 'Przechowywanie i funkcjonalność',
              },
              {
                value: 'radiator',
                label: 'Grzejnik łazienkowy',
                description: 'Elektroniczny lub tradycyjny',
              },
            ]}
            values={form.fixtures}
            onChange={(values) =>
              setForm({ ...form, fixtures: values })
            }
          />
        )}

        {/* Step 9: Standard */}
        {currentStep === 9 && (
          <RadioGroup
            name="standard"
            options={[
              {
                value: 'economic',
                label: 'Ekonomiczny',
                description: 'Materiały budżetowe, szybka realizacja. Koszt: -15% vs standard',
              },
              {
                value: 'standard',
                label: 'Standard',
                description: 'Dobre materiały, normalna jakość. Najpopularniejszy wybór',
              },
              {
                value: 'premium',
                label: 'Premium',
                description: 'Materiały premium, najwyższa jakość. Koszt: +35% vs standard',
              },
            ]}
            value={form.standard}
            onChange={(value) =>
              setForm({
                ...form,
                standard: value as typeof form.standard,
              })
            }
          />
        )}

        {/* Step 10: Zakres wyceny */}
        {currentStep === 10 && (
          <RadioGroup
            name="scope"
            options={[
              {
                value: 'labor',
                label: 'Tylko robocizna',
                description: 'Koszt pracy bez materiałów',
              },
              {
                value: 'labor-materials',
                label: 'Robocizna + materiały budowlane',
                description: 'Bez wyposażenia (umywalek, wanien itp.)',
              },
              {
                value: 'full',
                label: 'Wszystko razem',
                description: 'Robocizna + materiały + wyposażenie',
              },
            ]}
            value={form.scope}
            onChange={(value) =>
              setForm({
                ...form,
                scope: value as typeof form.scope,
              })
            }
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 border-t pt-6">
        <Button
          variant="secondary"
          size="md"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex-1"
        >
          Wstecz
        </Button>

        {currentStep < STEP_TITLES.length ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            className="flex-1"
          >
            Dalej
          </Button>
        ) : (
          <Button
            variant="cta"
            size="md"
            onClick={handleCalculate}
            disabled={!form.city || isLoading}
            className="flex-1"
          >
            {isLoading ? 'Obliczanie...' : 'Oblicz cenę'}
          </Button>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-blue"></div>
            </div>
            <p className="text-sm text-slate-600">Obliczam cenę dla Twojej łazienki...</p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import StepIndicator from '@/components/ui/StepIndicator';
import Button from '@/components/ui/Button';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
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

  // Step 2: Powierzchnia
  areaInputMethod: 'direct' | 'dimensions';
  directArea: number;
  roomLength: number;
  roomWidth: number;
  roomHeight: number;
  numberOfRooms: number;

  // Step 3: Stan ścian
  wallCondition: 'good' | 'minor' | 'gypsum' | 'wallpaper' | null;

  // Step 4: Sufit
  paintCeiling: boolean;

  // Step 5: Rodzaj farby
  paintType: 'acrylic' | 'latex' | 'ceramic' | 'specialist' | null;

  // Step 6: Liczba warstw
  coatCount: 2 | 3;

  // Step 7: Dodatkowe
  additionalServices: string[];
  radiatorCount: number;
}

const STEP_TITLES = [
  'Lokalizacja',
  'Powierzchnia',
  'Stan ścian',
  'Sufit',
  'Rodzaj farby',
  'Liczba warstw',
  'Dodatkowe',
];

const STEP_DESCRIPTIONS = [
  'Gdzie znajduje się Twoje mieszkanie?',
  'Jak duża jest powierzchnia do malowania?',
  'W jakim stanie są Twoje ściany?',
  'Czy chcesz malować sufit?',
  'Jaki rodzaj farby prefehujesz?',
  'Ile warstw farby chciałbyś?',
  'Czy potrzebujesz dodatkowych usług?',
];

const WALL_CONDITIONS = [
  { label: 'Ściany w dobrym stanie (tylko malowanie)', value: 'good' },
  { label: 'Drobne ubytki (szpachlowanie + malowanie)', value: 'minor' },
  { label: 'Wymagają gładzi gipsowej', value: 'gypsum' },
  { label: 'Po tapecie (zdjęcie + przygotowanie)', value: 'wallpaper' },
];

const PAINT_TYPES = [
  { label: 'Akrylowa (ekonomiczna)', value: 'acrylic' },
  { label: 'Lateksowa zmywalna (standard)', value: 'latex' },
  { label: 'Ceramiczna (premium)', value: 'ceramic' },
  { label: 'Specjalistyczna (łazienka/kuchnia)', value: 'specialist' },
];

const COAT_OPTIONS = [
  { label: '2 warstwy (standard)', value: 2 },
  { label: '3 warstwy (intensywne kolory)', value: 3 },
];

const ADDITIONAL_SERVICES = [
  { id: 'furniture_protection', label: 'Zabezpieczenie mebli/podłóg' },
  { id: 'radiators', label: 'Malowanie grzejników' },
  { id: 'door_frames', label: 'Malowanie framug' },
];

export default function PaintingCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [priceResult, setPriceResult] = useState<PriceResultType | null>(null);

  const [form, setForm] = useState<FormState>({
    city: null,
    district: '',
    areaInputMethod: 'direct',
    directArea: 30,
    roomLength: 5,
    roomWidth: 4,
    roomHeight: 2.7,
    numberOfRooms: 2,
    wallCondition: 'good',
    paintCeiling: false,
    paintType: 'latex',
    coatCount: 2,
    additionalServices: [],
    radiatorCount: 0,
  });

  const districts = form.city ? getDistricts(form.city.id) : undefined;

  // Calculate wall area based on dimensions
  const calculateWallArea = (): number => {
    if (form.areaInputMethod === 'direct') {
      return form.directArea;
    }

    // Calculate perimeter and subtract ~10% for windows/doors
    const perimeter = 2 * (form.roomLength + form.roomWidth);
    const wallArea = perimeter * form.roomHeight * form.numberOfRooms * 0.9;
    return Math.round(wallArea);
  };

  const currentArea = calculateWallArea();
  const ceilingArea = form.paintCeiling
    ? Math.round(form.roomLength * form.roomWidth * form.numberOfRooms)
    : 0;
  const totalArea = currentArea + ceilingArea;

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

  const buildSelectedItems = (): string[] => {
    const items: string[] = [];

    // Surface preparation based on wall condition
    if (form.wallCondition === 'good') {
      items.push('painting_surface_prep_light');
    } else if (form.wallCondition === 'minor') {
      items.push('painting_surface_prep_medium');
    } else if (form.wallCondition === 'gypsum' || form.wallCondition === 'wallpaper') {
      items.push('painting_surface_prep_heavy');
    }

    // Priming
    items.push('painting_primer_standard');

    // Paint type - add based on coat count
    if (form.paintType === 'acrylic') {
      items.push('painting_acrylic_2coats');
      if (form.coatCount === 3) {
        items.push('painting_acrylic_2coats');
      }
    } else if (form.paintType === 'latex') {
      items.push('painting_latex_2coats');
      if (form.coatCount === 3) {
        items.push('painting_latex_2coats');
      }
    } else if (form.paintType === 'ceramic' || form.paintType === 'specialist') {
      items.push('painting_special_effects');
      if (form.coatCount === 3) {
        items.push('painting_special_effects');
      }
    }

    return items;
  };

  const calculateComplexity = (): number => {
    let complexity = 5; // base

    // Add complexity for additional services
    if (form.additionalServices.includes('furniture_protection')) complexity += 1;
    if (form.additionalServices.includes('radiators')) complexity += 1;
    if (form.additionalServices.includes('door_frames')) complexity += 1;
    if (form.paintCeiling) complexity += 1;
    if (form.wallCondition === 'wallpaper' || form.wallCondition === 'gypsum') complexity += 2;

    return Math.min(10, complexity);
  };

  const handleCalculate = async () => {
    if (!form.city || !form.wallCondition || !form.paintType) return;

    setIsLoading(true);

    const selectedItems = buildSelectedItems();

    const answers: PricingFormAnswers = {
      city: form.city.id,
      district: form.district || undefined,
      serviceType: 'painting',
      area: totalArea,
      selectedItems,
      standard: 'standard',
      complexity: calculateComplexity(),
    };

    try {
      const result = calculatePrice(answers);
      setPriceResult(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error calculating price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (priceResult) {
    return (
      <div className="w-full">
        <PriceResult
          serviceName="Malowanie ścian"
          city={form.city?.name || ''}
          district={form.district}
          area={totalArea}
          marketType="standard"
          minPrice={priceResult.p10}
          medianPrice={priceResult.p50}
          maxPrice={priceResult.p90}
        />
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            onClick={() => {
              setPriceResult(null);
              setCurrentStep(1);
            }}
            variant="secondary"
          >
            Nowa wycena
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator current={currentStep} total={STEP_TITLES.length} />

      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold">{STEP_TITLES[currentStep - 1]}</h2>
        <p className="text-gray-600">{STEP_DESCRIPTIONS[currentStep - 1]}</p>

        {/* Step 1: Lokalizacja */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <CityAutocomplete
              value={form.city}
              onChange={(city) => setForm({ ...form, city, district: '' })}
              placeholder="Wpisz nazwę miasta"
            />
            {districts && districts.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dzielnica (opcjonalnie)
                </label>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Wybierz dzielnicę</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Powierzchnia */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <RadioGroup
              label="Sposób wprowadzenia danych"
              options={[
                { label: 'Bezpośrednio wprowadzić m²', value: 'direct' },
                { label: 'Obliczyć z wymiarów pokojów', value: 'dimensions' },
              ]}
              value={form.areaInputMethod}
              onChange={(value) =>
                setForm({
                  ...form,
                  areaInputMethod: value as 'direct' | 'dimensions',
                })
              }
            />

            {form.areaInputMethod === 'direct' ? (
              <NumberInput
                label="Powierzchnia do malowania (m²)"
                value={form.directArea}
                onChange={(value) => setForm({ ...form, directArea: value })}
                min={1}
                max={500}
              />
            ) : (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <NumberInput
                  label="Długość pokoju (m)"
                  value={form.roomLength}
                  onChange={(value) => setForm({ ...form, roomLength: value })}
                  min={1}
                  max={20}
                  step={0.1}
                />
                <NumberInput
                  label="Szerokość pokoju (m)"
                  value={form.roomWidth}
                  onChange={(value) => setForm({ ...form, roomWidth: value })}
                  min={1}
                  max={20}
                  step={0.1}
                />
                <NumberInput
                  label="Wysokość pokoju (m)"
                  value={form.roomHeight}
                  onChange={(value) => setForm({ ...form, roomHeight: value })}
                  min={1.5}
                  max={5}
                  step={0.1}
                />
                <NumberInput
                  label="Liczba pokojów"
                  value={form.numberOfRooms}
                  onChange={(value) => setForm({ ...form, numberOfRooms: value })}
                  min={1}
                  max={10}
                />
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  Szacunkowa powierzchnia: <strong>{currentArea} m²</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Stan ścian */}
        {currentStep === 3 && (
          <RadioGroup
            label="Stan ścian"
            options={WALL_CONDITIONS}
            value={form.wallCondition}
            onChange={(value) =>
              setForm({
                ...form,
                wallCondition: value as
                  | 'good'
                  | 'minor'
                  | 'gypsum'
                  | 'wallpaper'
                  | null,
              })
            }
          />
        )}

        {/* Step 4: Sufit */}
        {currentStep === 4 && (
          <RadioGroup
            label="Malowanie sufitu"
            options={[
              { label: 'Tak, chcę malować sufit', value: 'yes' },
              { label: 'Nie, tylko ściany', value: 'no' },
            ]}
            value={form.paintCeiling ? 'yes' : 'no'}
            onChange={(value) => setForm({ ...form, paintCeiling: value === 'yes' })}
          />
        )}

        {/* Step 5: Rodzaj farby */}
        {currentStep === 5 && (
          <RadioGroup
            label="Rodzaj farby"
            options={PAINT_TYPES}
            value={form.paintType}
            onChange={(value) =>
              setForm({
                ...form,
                paintType: value as 'acrylic' | 'latex' | 'ceramic' | 'specialist' | null,
              })
            }
          />
        )}

        {/* Step 6: Liczba warstw */}
        {currentStep === 6 && (
          <RadioGroup
            label="Liczba warstw farby"
            options={COAT_OPTIONS}
            value={form.coatCount}
            onChange={(value) => setForm({ ...form, coatCount: value as 2 | 3 })}
          />
        )}

        {/* Step 7: Dodatkowe usługi */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <CheckboxGroup
              label="Dodatkowe usługi"
              options={ADDITIONAL_SERVICES}
              values={form.additionalServices}
              onChange={(values) => setForm({ ...form, additionalServices: values })}
            />

            {form.additionalServices.includes('radiators') && (
              <NumberInput
                label="Liczba grzejników do malowania"
                value={form.radiatorCount}
                onChange={(value) => setForm({ ...form, radiatorCount: value })}
                min={0}
                max={20}
              />
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 pt-6">
          <Button
            onClick={handlePrev}
            variant="secondary"
            disabled={currentStep === 1}
          >
            Wróć
          </Button>

          {currentStep < STEP_TITLES.length ? (
            <Button onClick={handleNext} disabled={!isValidStep()}>
              Dalej
            </Button>
          ) : (
            <Button
              onClick={handleCalculate}
              disabled={!isValidStep() || isLoading}
              isLoading={isLoading}
            >
              Oblicz cenę
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  function isValidStep(): boolean {
    switch (currentStep) {
      case 1:
        return form.city !== null;
      case 3:
        return form.wallCondition !== null;
      case 5:
        return form.paintType !== null;
      default:
        return true;
    }
  }
}

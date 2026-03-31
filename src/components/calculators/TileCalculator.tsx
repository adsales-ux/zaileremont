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
  surfaceType: 'walls' | 'floor' | 'both';
  wallArea: number;
  floorArea: number;

  // Step 3: Pomieszczenie
  roomType: 'bathroom' | 'kitchen' | 'corridor' | 'terrace' | 'other' | null;

  // Step 4: Przygotowanie podłoża
  basePreparation: string[];

  // Step 5: Parametry płytek
  tileFormat: 'small' | 'medium' | 'large' | 'xlarge' | 'mosaic' | null;
  tileMaterial: 'ceramic' | 'porcelain' | 'technical' | 'natural-stone' | null;
  tilePattern: 'straight' | 'brick' | 'herringbone' | 'diagonal' | null;

  // Step 6: Fugowanie
  goutType: 'cement' | 'epoxy' | null;

  // Step 7: Dodatkowe
  additionalServices: string[];
}

const STEP_TITLES = [
  'Lokalizacja',
  'Powierzchnia',
  'Pomieszczenie',
  'Przygotowanie podłoża',
  'Parametry płytek',
  'Fugowanie',
  'Dodatkowe',
];

const STEP_DESCRIPTIONS = [
  'Gdzie znajduje się Twoja nieruchomość?',
  'Jaką powierzchnię będzie obejmować układanie płytek?',
  'Jaki typ pomieszczenia będzie remontowany?',
  'Jakie prace przygotowawcze są potrzebne?',
  'Jakie są parametry płytek?',
  'Jaki rodzaj fugowania prefehujesz?',
  'Czy potrzebujesz dodatkowych usług?',
];

const SURFACE_OPTIONS = [
  { label: 'Tylko ściany', value: 'walls' },
  { label: 'Tylko podłoga', value: 'floor' },
  { label: 'Ściany i podłoga', value: 'both' },
];

const ROOM_TYPES = [
  { label: 'Łazienka', value: 'bathroom' },
  { label: 'Kuchnia (blat)', value: 'kitchen' },
  { label: 'Korytarz', value: 'corridor' },
  { label: 'Taras/Balkon', value: 'terrace' },
  { label: 'Inne', value: 'other' },
];

const BASE_PREPARATION = [
  { id: 'old_tiles', label: 'Skucie starych płytek' },
  { id: 'leveling', label: 'Wyrównanie podłoża' },
  { id: 'waterproofing', label: 'Hydroizolacja' },
  { id: 'priming', label: 'Gruntowanie', checked: true },
];

const TILE_FORMATS = [
  { label: 'Mały (<30cm)', value: 'small' },
  { label: 'Średni (30×60)', value: 'medium' },
  { label: 'Duży (60×60)', value: 'large' },
  { label: 'Wielkoformatowy (60×120+)', value: 'xlarge' },
  { label: 'Mozaika', value: 'mosaic' },
];

const TILE_MATERIALS = [
  { label: 'Ceramika', value: 'ceramic' },
  { label: 'Gres szkliwiony', value: 'porcelain' },
  { label: 'Gres techniczny', value: 'technical' },
  { label: 'Kamień naturalny', value: 'natural-stone' },
];

const TILE_PATTERNS = [
  { label: 'Prosty (w rzędach)', value: 'straight' },
  { label: 'Cegiełka', value: 'brick' },
  { label: 'Jodełka', value: 'herringbone' },
  { label: 'Diagonalny 45°', value: 'diagonal' },
];

const GOUT_TYPES = [
  { label: 'Cementowa (standard)', value: 'cement' },
  { label: 'Epoksydowa (premium)', value: 'epoxy' },
];

const ADDITIONAL_SERVICES = [
  { id: 'edge_trim', label: 'Listwy wykończeniowe/narożniki' },
  { id: 'baseboards', label: 'Cokoły' },
];

export default function TileCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [priceResult, setPriceResult] = useState<PriceResultType | null>(null);

  const [form, setForm] = useState<FormState>({
    city: null,
    district: '',
    surfaceType: 'both',
    wallArea: 15,
    floorArea: 10,
    roomType: 'bathroom',
    basePreparation: ['priming'],
    tileFormat: 'medium',
    tileMaterial: 'ceramic',
    tilePattern: 'straight',
    goutType: 'cement',
    additionalServices: [],
  });

  const districts = form.city ? getDistricts(form.city.id) : undefined;

  const totalArea =
    (form.surfaceType === 'walls' || form.surfaceType === 'both'
      ? form.wallArea
      : 0) +
    (form.surfaceType === 'floor' || form.surfaceType === 'both'
      ? form.floorArea
      : 0);

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

    // Surface preparation
    items.push('tiles_surface_prep');

    // Tile type based on format and material
    if (form.tileMaterial === 'ceramic') {
      if (form.tileFormat === 'small') {
        items.push('tiles_ceramic_small');
      } else if (form.tileFormat === 'large') {
        items.push('tiles_ceramic_large');
      } else {
        items.push('tiles_ceramic_standard');
      }
    } else if (form.tileMaterial === 'porcelain' || form.tileMaterial === 'technical') {
      if (form.tileFormat === 'xlarge') {
        items.push('tiles_porcelain_large');
      } else {
        items.push('tiles_porcelain_standard');
      }
    } else if (form.tileMaterial === 'natural-stone') {
      if (form.tileFormat === 'xlarge') {
        items.push('tiles_porcelain_large');
      } else {
        items.push('tiles_porcelain_standard');
      }
    }

    // Mosaic handling
    if (form.tileFormat === 'mosaic') {
      items.push('tiles_mosaic');
    }

    // Grouting
    if (form.goutType === 'epoxy') {
      items.push('tiles_grouting_epoxy');
    } else {
      items.push('tiles_grouting_sand');
    }

    // Additional services
    if (form.additionalServices.includes('edge_trim')) {
      items.push('tiles_sealing');
    }

    return items;
  };

  const calculateComplexity = (): number => {
    let complexity = 5; // base

    // Add complexity for pattern complexity
    if (form.tilePattern === 'herringbone' || form.tilePattern === 'diagonal') {
      complexity += 2;
    } else if (form.tilePattern === 'brick') {
      complexity += 1;
    }

    // Add complexity for tile format
    if (form.tileFormat === 'xlarge' || form.tileFormat === 'mosaic') {
      complexity += 2;
    } else if (form.tileFormat === 'small') {
      complexity += 1;
    }

    // Add complexity for materials
    if (form.tileMaterial === 'natural-stone') {
      complexity += 2;
    } else if (form.tileMaterial === 'technical') {
      complexity += 1;
    }

    // Add complexity for base preparation
    if (form.basePreparation.includes('old_tiles')) complexity += 1;
    if (form.basePreparation.includes('waterproofing')) complexity += 1;

    // Add complexity for additional services
    if (form.additionalServices.length > 0) complexity += 1;

    return Math.min(10, complexity);
  };

  const handleCalculate = async () => {
    if (
      !form.city ||
      !form.roomType ||
      !form.tileFormat ||
      !form.tileMaterial ||
      !form.tilePattern ||
      !form.goutType
    )
      return;

    setIsLoading(true);

    const selectedItems = buildSelectedItems();

    const answers: PricingFormAnswers = {
      city: form.city.id,
      district: form.district || undefined,
      serviceType: 'tiles',
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
          serviceName="Układanie płytek"
          city={form.city?.name || ''}
          district={form.district}
          area={totalArea}
          marketType="standard"
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
              label="Typ powierzchni"
              options={SURFACE_OPTIONS}
              value={form.surfaceType}
              onChange={(value) =>
                setForm({
                  ...form,
                  surfaceType: value as 'walls' | 'floor' | 'both',
                })
              }
            />

            {(form.surfaceType === 'walls' || form.surfaceType === 'both') && (
              <NumberInput
                label="Powierzchnia ścian (m²)"
                value={form.wallArea}
                onChange={(value) => setForm({ ...form, wallArea: value })}
                min={0.5}
                max={200}
                step={0.5}
              />
            )}

            {(form.surfaceType === 'floor' || form.surfaceType === 'both') && (
              <NumberInput
                label="Powierzchnia podłogi (m²)"
                value={form.floorArea}
                onChange={(value) => setForm({ ...form, floorArea: value })}
                min={0.5}
                max={200}
                step={0.5}
              />
            )}

            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              Łączna powierzchnia: <strong>{totalArea} m²</strong>
            </div>
          </div>
        )}

        {/* Step 3: Pomieszczenie */}
        {currentStep === 3 && (
          <RadioGroup
            label="Typ pomieszczenia"
            options={ROOM_TYPES}
            value={form.roomType}
            onChange={(value) =>
              setForm({
                ...form,
                roomType: value as
                  | 'bathroom'
                  | 'kitchen'
                  | 'corridor'
                  | 'terrace'
                  | 'other'
                  | null,
              })
            }
          />
        )}

        {/* Step 4: Przygotowanie podłoża */}
        {currentStep === 4 && (
          <CheckboxGroup
            label="Prace przygotowawcze"
            options={BASE_PREPARATION}
            values={form.basePreparation}
            onChange={(values) => setForm({ ...form, basePreparation: values })}
          />
        )}

        {/* Step 5: Parametry płytek */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <RadioGroup
              label="Format płytek"
              options={TILE_FORMATS}
              value={form.tileFormat}
              onChange={(value) =>
                setForm({
                  ...form,
                  tileFormat: value as
                    | 'small'
                    | 'medium'
                    | 'large'
                    | 'xlarge'
                    | 'mosaic'
                    | null,
                })
              }
            />

            <RadioGroup
              label="Materiał płytek"
              options={TILE_MATERIALS}
              value={form.tileMaterial}
              onChange={(value) =>
                setForm({
                  ...form,
                  tileMaterial: value as
                    | 'ceramic'
                    | 'porcelain'
                    | 'technical'
                    | 'natural-stone'
                    | null,
                })
              }
            />

            <RadioGroup
              label="Wzór ułożenia"
              options={TILE_PATTERNS}
              value={form.tilePattern}
              onChange={(value) =>
                setForm({
                  ...form,
                  tilePattern: value as
                    | 'straight'
                    | 'brick'
                    | 'herringbone'
                    | 'diagonal'
                    | null,
                })
              }
            />
          </div>
        )}

        {/* Step 6: Fugowanie */}
        {currentStep === 6 && (
          <RadioGroup
            label="Typ fugowania"
            options={GOUT_TYPES}
            value={form.goutType}
            onChange={(value) =>
              setForm({
                ...form,
                goutType: value as 'cement' | 'epoxy' | null,
              })
            }
          />
        )}

        {/* Step 7: Dodatkowe usługi */}
        {currentStep === 7 && (
          <CheckboxGroup
            label="Dodatkowe usługi"
            options={ADDITIONAL_SERVICES}
            values={form.additionalServices}
            onChange={(values) => setForm({ ...form, additionalServices: values })}
          />
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
        return form.roomType !== null;
      case 5:
        return (
          form.tileFormat !== null &&
          form.tileMaterial !== null &&
          form.tilePattern !== null
        );
      case 6:
        return form.goutType !== null;
      default:
        return true;
    }
  }
}

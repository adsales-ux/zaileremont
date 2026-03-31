'use client';

import React, { useState } from 'react';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';
import { CityData } from '@/data/cities';

interface MapaCenSearchProps {
  onSearch?: (city: CityData, serviceType: string) => void;
  initialCity?: CityData | null;
  initialService?: string;
  isLoading?: boolean;
}

const SERVICE_TYPES = [
  { value: 'bathroom', label: 'Remont łazienki' },
  { value: 'painting', label: 'Malowanie ścian' },
  { value: 'tiles', label: 'Układanie płytek' },
  { value: 'flooring', label: 'Wymiana podłóg' },
  { value: 'electrical', label: 'Instalacja elektryczna' },
  { value: 'plumbing', label: 'Instalacja hydrauliczna' },
  { value: 'drywall', label: 'Gładź gipsowa' },
];

export default function MapaCenSearch({
  onSearch,
  initialCity,
  initialService = '',
  isLoading = false,
}: MapaCenSearchProps) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(initialCity || null);
  const [selectedService, setSelectedService] = useState(initialService);
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCity || !selectedService) {
      return;
    }

    setLocalLoading(true);

    // Simulate 2-second loading animation
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLocalLoading(false);
    onSearch?.(selectedCity, selectedService);
  };

  const loading = isLoading || localLoading;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <CityAutocomplete
            label="Wybierz miasto"
            placeholder="Wpisz nazwę miasta..."
            value={selectedCity}
            onChange={setSelectedCity}
          />
        </div>

        <div>
          <SelectField
            label="Usługa"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            options={SERVICE_TYPES}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={!selectedCity || !selectedService || loading}
        className="w-full md:w-auto"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analizuję dane rynkowe dla {selectedCity?.name}...
          </span>
        ) : (
          'Sprawdź ceny rynkowe'
        )}
      </Button>
    </form>
  );
}

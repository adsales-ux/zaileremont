'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CITIES, CityData } from '@/data/cities';

interface CityAutocompleteProps {
  label?: string;
  helperText?: string;
  error?: string;
  value?: CityData | null;
  onChange?: (city: CityData | null) => void;
  placeholder?: string;
  id?: string;
}

export default function CityAutocomplete({
  label,
  helperText,
  error,
  value,
  onChange,
  placeholder = 'Wpisz nazwę miasta...',
  id,
}: CityAutocompleteProps) {
  const fieldId = id || `city-autocomplete-${Math.random().toString(36).slice(2)}`;
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update filtered cities when input changes
  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setFilteredCities([]);
      return;
    }

    const lowerInput = inputValue.toLowerCase();
    const filtered = CITIES.filter(
      (city) =>
        city.name.toLowerCase().includes(lowerInput) ||
        city.voivodeship.toLowerCase().includes(lowerInput)
    ).slice(0, 8); // Limit to 8 results

    setFilteredCities(filtered);
  }, [inputValue]);

  const handleSelectCity = (city: CityData) => {
    setInputValue(city.name);
    onChange?.(city);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.(null);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full space-y-2" ref={wrapperRef}>
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={fieldId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-2 font-inter text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-brand-blue focus:ring-blue-200'
          } ${inputValue ? 'pr-10' : ''}`}
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear selection"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-slate-200 bg-white shadow-md-card">
          {filteredCities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <p className="font-medium text-slate-900">{city.name}</p>
              <p className="text-xs text-slate-500">{city.voivodeship}</p>
            </button>
          ))}
        </div>
      )}

      {isOpen && inputValue.trim().length > 0 && filteredCities.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-md-card">
          <p className="text-sm text-slate-600">Nie znaleziono miast.</p>
        </div>
      )}

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
}

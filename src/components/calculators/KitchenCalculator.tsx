'use client';

import { useState, useRef } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import StepIndicator from '@/components/ui/StepIndicator';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { CityData } from '@/data/cities';

const STEPS = [
  'Kształt kuchni',
  'Wymiary',
  'Fronty i blat',
  'Wyposażenie',
  'AGD do zabudowy',
  'Projekt / wycena',
  'Lokalizacja',
  'Wycena',
];

const KITCHEN_SHAPES = [
  { value: 'I', label: 'Jednorzędowa (I)', desc: 'Szafki wzdłuż jednej ściany', icon: '▬' },
  { value: 'L', label: 'Kształt L', desc: 'Dwie prostopadłe ściany', icon: '⌐' },
  { value: 'U', label: 'Kształt U', desc: 'Trzy ściany', icon: '⊓' },
  { value: 'II', label: 'Dwurzędowa (II)', desc: 'Dwie równoległe ściany', icon: '║' },
  { value: 'wyspa', label: 'Z wyspą', desc: 'Kuchnia + wolnostojąca wyspa', icon: '▣' },
];

const FRONT_MATERIALS = [
  { value: 'laminated', label: 'Płyta laminowana (standard)' },
  { value: 'mdf-mat', label: 'MDF lakierowany mat' },
  { value: 'mdf-polysk', label: 'MDF lakierowany połysk' },
  { value: 'mdf-frezowany', label: 'MDF frezowany' },
  { value: 'akryl', label: 'Akryl' },
  { value: 'drewno', label: 'Drewno lite (dąb, jesion)' },

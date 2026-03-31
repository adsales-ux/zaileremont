'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            {/* Icon mark */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
              <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            {/* Text */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                zaile<span className="text-blue-700">remont</span>
              </span>
              <span className="hidden sm:inline text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Mapa Cen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
                Kalkulatory
                <svg className={`h-3.5 w-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-0 w-52 rounded-lg border border-slate-200 bg-white shadow-lg py-1 animate-slide-down">
                  <Link href="/kalkulator/remont-lazienki" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Remont łazienki
                  </Link>
                  <Link href="/kalkulator/malowanie-scian" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Malowanie ścian
                  </Link>
                  <Link href="/kalkulator/ukladanie-plytek" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Układanie płytek
                  </Link>
                  <Link href="/kalkulator/kuchnia-na-wymiar" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Kuchnia na wymiar
                  </Link>
                  <Link href="/kalkulator/okna-pcv" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Okna PCV
                  </Link>
                  <Link href="/kalkulator/meble-na-wymiar" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Meble na wymiar
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <Link href="/kalkulator" className="block px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50">
                    Wszystkie kalkulatory
                  </Link>
                </div>
              )}
            </div>

            <Link href="/mapa-cen" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
              Mapa Cen
            </Link>
            <Link href="/poradnik" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
              Poradnik
            </Link>
            <Link href="/metodologia" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
              Metodologia
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            aria-expanded={isOpen}
            aria-label="Menu"
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-slate-100 py-3 md:hidden animate-slide-down">
            <div className="space-y-1">
              <Link href="/kalkulator/remont-lazienki" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Remont łazienki
              </Link>
              <Link href="/kalkulator/malowanie-scian" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Malowanie ścian
              </Link>
              <Link href="/kalkulator/ukladanie-plytek" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Układanie płytek
              </Link>
              <Link href="/kalkulator/kuchnia-na-wymiar" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Kuchnia na wymiar
              </Link>
              <Link href="/kalkulator/okna-pcv" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Okna PCV
              </Link>
              <Link href="/kalkulator/meble-na-wymiar" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Meble na wymiar
              </Link>
              <div className="my-2 border-t border-slate-100" />
              <Link href="/mapa-cen" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Mapa Cen
              </Link>
              <Link href="/poradnik" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Poradnik
              </Link>
              <Link href="/metodologia" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Metodologia
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

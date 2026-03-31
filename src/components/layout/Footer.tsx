import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-lg font-bold text-brand-blue">
                zaileremont.pl
              </span>
              <span className="text-xs font-medium text-slate-600">
                Mapa Cen Remontów
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Kompleksowa analiza cen remontów i budowy w Polsce.
            </p>
          </div>

          {/* Kalkulatory */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">
              Kalkulatory
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kalkulator/okna-pcv"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Okna PCV
                </Link>
              </li>
              <li>
                <Link
                  href="/kalkulator/kuchnia-na-wymiar"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Kuchnia na wymiar
                </Link>
              </li>
              <li>
                <Link
                  href="/kalkulator/remont-lazienki"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Remont łazienki
                </Link>
              </li>
              <li>
                <Link
                  href="/kalkulator/malowanie-scian"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Malowanie ścian
                </Link>
              </li>
              <li>
                <Link
                  href="/kalkulator/ukladanie-plytek"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Układanie płytek
                </Link>
              </li>
            </ul>
          </div>

          {/* Narzędzia */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">
              Narzędzia
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mapa-cen"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Mapa Cen
                </Link>
              </li>
              <li>
                <Link
                  href="/poradnik"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Poradnik
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologia"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Metodologia
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacje */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">
              Informacje
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/o-nas"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  href="/regulamin"
                  className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-8 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-700">
              <span className="font-semibold text-brand-blue">
                Ważna informacja:
              </span>
              {' '}Dane prezentowane w serwisie zaileremont.pl zostały wyliczone algorytmem
              na podstawie danych historycznych z lat ubiegłych. Wartości mogą
              się różnić od aktualnych cen rynkowych. Rekomendujemy weryfikację
              cen u konkretnych wykonawców i dostawców materiałów.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-600">
            &copy; {currentYear} zaileremont.pl. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link
              href="/kalkulator"
              className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
            >
              Wszystkie kalkulatory
            </Link>
            <Link
              href="/mapa-cen"
              className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
            >
              Mapa cen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

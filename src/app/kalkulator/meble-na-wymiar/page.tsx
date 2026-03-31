import React from 'react';
import { Metadata } from 'next';
import FurnitureCalculator from '@/components/calculators/FurnitureCalculator';

export const metadata: Metadata = {
  title: 'Meble na wymiar — ceny 2026 | Kalkulator | zaileremont.pl',
  description:
    'Ile kosztują meble na wymiar? Kalkulator cen mebli kuchennych, łazienkowych, szaf wnękowych i garderob. Wycena dostosowana do miasta, materiałów i wyposażenia.',
  openGraph: {
    title: 'Meble na wymiar — ceny 2026 | Kalkulator',
    description: 'Wycena mebli na wymiar dostosowana do Twoich parametrów.',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: 'Ile kosztują meble kuchenne na wymiar w 2026?',
    answer:
      'Ceny mebli kuchennych na wymiar wahają się od 1 200 do 3 800 zł za metr bieżący. W standardzie (płyta laminowana, uchwyty aluminiowe) zapłacisz ok. 1 500–2 000 zł/mb. W wersji premium (lakier, front frezowany, blat kwarcowy) koszt to 2 500–3 800 zł/mb. Ceny w Warszawie są wyższe o ok. 10–15% niż średnia krajowa.',
  },
  {
    question: 'Szafa wnękowa na wymiar — ile kosztuje?',
    answer:
      'Szafa wnękowa to wydatek od 900 do 3 200 zł za metr bieżący. Cena zależy od głębokości, systemu drzwi (przesuwne vs. uchylne), materiału frontów i wyposażenia wewnętrznego (szuflady, drążki, oświetlenie LED). Najtańsze opcje to fronty z płyty meblowej, najdroższe — szklane lub lustrzane.',
  },
  {
    question: 'Meble łazienkowe na wymiar — czy warto?',
    answer:
      'Meble łazienkowe na wymiar to dobry wybór przy nietypowych wymiarach lub pod skosem. Koszt to ok. 800–2 800 zł/mb. Ważne, by wybrać materiały odporne na wilgoć (płyta wodoodporna, lakierowane fronty). Gotowe meble łazienkowe są tańsze, ale rzadko pasują idealnie do nietypowej przestrzeni.',
  },
  {
    question: 'Co wpływa na cenę mebli na wymiar?',
    answer:
      'Główne czynniki to: rodzaj materiału (płyta, MDF, drewno lite), typ frontów (gładkie, frezowane, lakierowane, szklane), blat (laminat, konglomerat, kamień, drewno), wyposażenie (szuflady z cichym domykiem, cargo, oświetlenie), oraz lokalizacja — ceny w dużych miastach są wyższe o 10–20%.',
  },
  {
    question: 'Jak długo czeka się na meble na wymiar?',
    answer:
      'Standardowy czas realizacji to 4–8 tygodni od pomiaru. W sezonie (wiosna–lato) czas może się wydłużyć do 10–12 tygodni. Warto zamawiać z wyprzedzeniem, szczególnie jeśli planujesz remont kuchni lub łazienki — meble powinny być gotowe na czas montażu.',
  },
];

export default function MebleNaWymiarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-blue-700 px-2.5 py-1 rounded-full">
              Kalkulator 2026
            </span>
            <span className="text-xs text-blue-200">Aktualizacja: marzec 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Meble na wymiar — ile kosztują?
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Oblicz koszt mebli kuchennych, łazienkowych, szaf wnękowych i garderob.
            Wycena uwzględnia miasto, materiały, fronty i wyposażenie.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="container mx-auto max-w-5xl px-4 py-10">
        <FurnitureCalculator />
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Najczęściej zadawane pytania
        </h2>
        <div className="space-y-4">
          {FAQ.map((item, index) => (
            <details
              key={index}
              className="group rounded-lg border border-slate-200 bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                {item.question}
                <svg
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}

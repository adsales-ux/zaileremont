import React from 'react';
import { Metadata } from 'next';
import WindowCalculator from '@/components/calculators/WindowCalculator';

export const metadata: Metadata = {
  title: 'Okna PCV — ceny 2026 | Kalkulator | ilezaremont.pl',
  description:
    'Ile kosztują okna PCV w 2026? Kalkulator cen okien jednoskrzydłowych, dwuskrzydłowych, balkonowych, dachowych. Ceny z montażem i bez.',
  openGraph: {
    title: 'Okna PCV — ceny 2026 | Kalkulator',
    description: 'Wycena okien PCV dostosowana do Twojego domu.',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: 'Ile kosztuje okno PCV w 2026 roku?',
    answer:
      'Cena okna PCV zależy od rozmiaru, liczby skrzydeł i pakietu szybowego. Okno jednoskrzydłowe (60×120 cm) to ok. 450–1 100 zł, dwuskrzydłowe (150×150 cm) — 800–1 900 zł, a balkonowe (200×230 cm) — 1 400–3 500 zł. Ceny dotyczą okien z montażem.',
  },
  {
    question: 'Dwuszybowe czy trzyszybowe okna — co wybrać?',
    answer:
      'Okna trzyszybowe są standardem w 2026 roku. Mają lepszą izolację termiczną (Uw ok. 0.9 W/m²K vs. 1.3 dla dwuszybowych) i akustyczną. Dwuszybowe są tańsze o ok. 15–20%, ale w dłuższej perspektywie trzyszybowe oszczędzają na ogrzewaniu. Przy nowym budownictwie trzyszybowe są wymagane przez normy.',
  },
  {
    question: 'Czy cena okna PCV zawiera montaż?',
    answer:
      'To zależy od producenta. W naszym kalkulatorze podajemy ceny z montażem i bez. Sam montaż jednego okna to ok. 150–400 zł. Przy wymianie starych okien dochodzi demontaż (80–200 zł/szt) i obróbka ościeży (150–350 zł/szt).',
  },
  {
    question: 'Okna PCV czy aluminiowe — co się bardziej opłaca?',
    answer:
      'Okna PCV są tańsze o 30–50% od aluminiowych i mają lepszą izolację termiczną. Aluminium wybiera się głównie do dużych przeszkleń (okna panoramiczne, witryny), gdzie PCV nie daje odpowiedniej sztywności. Dla standardowych okien mieszkalnych PCV to najlepsza opcja cenowo.',
  },
  {
    question: 'Ile czeka się na okna PCV na wymiar?',
    answer:
      'Standardowy czas realizacji to 3–6 tygodni. W sezonie (wiosna–lato) czas może się wydłużyć do 8 tygodni. Okna w niestandardowych kolorach (nie białe) lub z dodatkowymi opcjami (szprosy, rolety) mogą wymagać dłuższego czekania.',
  },
];

export default function OknaPcvPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-blue-700 px-2.5 py-1 rounded-full">
              Kalkulator 2026
            </span>
            <span className="text-xs text-blue-200">Aktualizacja: marzec 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Okna PCV — ile kosztują w 2026?
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Oblicz cenę okien PCV z montażem. Uwzględniamy typ okna, pakiet szybowy,
            kolor profilu, rolety i lokalizację.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-10">
        <WindowCalculator />
      </section>

      <section className="container mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Najczęściej zadawane pytania
        </h2>
        <div className="space-y-4">
          {FAQ.map((item, index) => (
            <details key={index} className="group rounded-lg border border-slate-200 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                {item.question}
                <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{item.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />
    </main>
  );
}

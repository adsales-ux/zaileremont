'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookie consent has been given
    const hasCookieConsent = document.cookie
      .split('; ')
      .some(row => row.startsWith('cookie_consent=true'));

    if (!hasCookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie with 365 day expiry
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `cookie_consent=true;${expires};path=/`;

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm md:text-base flex-1">
          Używamy cookies do zapewnienia najlepszego doświadczenia na naszej stronie. Zapoznaj się z naszą{' '}
          <Link href="/polityka-prywatnosci" className="text-blue-400 hover:text-blue-300 underline">
            polityką prywatności
          </Link>
          .
        </p>
        <button
          onClick={handleAccept}
          className="flex-shrink-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          Akceptuję
        </button>
      </div>
    </div>
  );
}

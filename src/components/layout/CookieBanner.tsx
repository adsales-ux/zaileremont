'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const hasConsent = cookies.some(c => c.startsWith('cookie_consent='));
    if (!hasConsent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `cookie_consent=accepted; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white px-4 py-4 shadow-lg">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300 text-center sm:text-left">
          Korzystamy z plików cookies, aby zapewnić najlepsze doświadczenia na naszej stronie.{' '}
          <Link href="/polityka-prywatnosci" className="text-blue-400 hover:text-blue-300 underline">
            Dowiedz się więcej
          </Link>
        </p>
        <button
          onClick={acceptCookies}
          className="shrink-0 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Akceptuję
        </button>
      </div>
    </div>
  );
}

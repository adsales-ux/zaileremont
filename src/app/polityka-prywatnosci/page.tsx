import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności | ilezaremont.pl',
  description: 'Polityka prywatności i cookies serwisu ilezaremont.pl',
};

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Polityka Prywatności i Cookies</h1>
        <p className="text-gray-600 mb-12">Ostatnia aktualizacja: 2026-04-01</p>

        {/* 1. Administrator danych */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Administrator danych</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Administratorem Twoich danych osobowych</strong> jest:
            </p>
            <p>
              <strong>Adsales sp. z o.o.</strong><br />
              NIP: 813 381 82 58<br />
              Email: raport@ilezaremont.pl
            </p>
            <p>
              Administrator jest odpowiedzialny za przetwarzanie Twoich danych osobowych w zgodzie
              z obowiązującym prawem, w szczególności z Rozporządzeniem Parlamentu Europejskiego
              i Rady (UE) 2016/679 (RODO).
            </p>
          </div>
        </section>

        {/* 2. Zakres zbieranych danych */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Zakres zbieranych danych</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              W trakcie korzystania z Serwisu zbieramy następujące kategorie danych:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Dane niezbędne do przetworzenia płatności:</strong> adres email, imię i nazwisko (opcjonalnie)</li>
              <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, czas dostępu, strony odwiedzone</li>
              <li><strong>Dane z cookies:</strong> informacje o preferencjach, sesji użytkownika</li>
              <li><strong>Dane analytics:</strong> informacje o ruchu na stronie i interakcji użytkownika</li>
            </ul>
          </div>
        </section>

        {/* 3. Cel przetwarzania danych */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cel przetwarzania danych</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Twoje dane osobowe przetwarzamy w następujących celach:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Przetworzenie płatności za raporty cenowe</li>
              <li>Wysłanie potwierdzenia transakcji i dostępu do raportu</li>
              <li>Komunikacja w przypadku pytań lub reklamacji</li>
              <li>Analiza ruchu i poprawy jakości Serwisu</li>
              <li>Zapewnienie bezpieczeństwa i ochrony przed złośliwą aktywnością</li>
              <li>Zgodność z obowiązującymi wymaganiami prawnymi</li>
            </ul>
          </div>
        </section>

        {/* 4. Podstawa prawna */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Podstawa prawna przetwarzania</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Przetwarzanie Twoich danych osobowych opiera się na następujących podstawach prawnych:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Art. 6 ust. 1 lit. a RODO – Twoja zgoda (cookies, analytics)</li>
              <li>Art. 6 ust. 1 lit. b RODO – Niezbędne do wykonania umowy o świadczenie usługi (płatności)</li>
              <li>Art. 6 ust. 1 lit. c RODO – Zgodność z obowiązkami prawnymi</li>
              <li>Art. 6 ust. 1 lit. f RODO – Uzasadnione interesy (bezpieczeństwo, analiza danych)</li>
            </ul>
          </div>
        </section>

        {/* 5. Odbiorcy danych */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Odbiorcy danych</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Twoje dane mogą być przetwarzane przez następujące podmioty:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Stripe Inc.</strong> – przetwarzanie płatności. Stripe może przetwarzać dane
                w zgodzie ze swoją polityką prywatności dostępną na stripe.com
              </li>
              <li>
                <strong>Cloudflare Inc.</strong> – hosting Serwisu, bezpieczeństwo i analityka. Dane mogą
                być przetwarzane w USA z odpowiednimi zabezpieczeniami.
              </li>
            </ul>
            <p>
              Poza wymienionymi wyżej podmiotami Twoje dane nie będą udostępniane trzecim stronom
              bez Twojej wyraźnej zgody, chyba że wymagane będzie to przez prawo.
            </p>
          </div>
        </section>

        {/* 6. Prawa użytkownika */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Twoje prawa RODO</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              W ramach RODO masz następujące prawa:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Prawo dostępu do danych</strong> – możesz zażądać kopii swoich danych osobowych
              </li>
              <li>
                <strong>Prawo sprostowania</strong> – możesz żądać poprawy niedokładnych danych
              </li>
              <li>
                <strong>Prawo do usunięcia ("prawo do bycia zapomnianym")</strong> – możesz żądać usunięcia
                swoich danych w określonych okolicznościach
              </li>
              <li>
                <strong>Prawo ograniczenia przetwarzania</strong> – możesz ograniczyć przetwarzanie swoich danych
              </li>
              <li>
                <strong>Prawo do przenaszalności danych</strong> – możesz uzyskać swoje dane w strukturyzowanym
                formacie
              </li>
              <li>
                <strong>Prawo do wycofania zgody</strong> – możesz wycofać wcześniej udzieloną zgodę
              </li>
              <li>
                <strong>Prawo do wniesienia skargi</strong> – możesz wnieść skargę do Prezesa Urzędu Ochrony
                Danych Osobowych
              </li>
            </ul>
            <p>
              Aby skorzystać z powyższych praw, prosimy o kontakt na adres: raport@ilezaremont.pl
            </p>
          </div>
        </section>

        {/* 7. Polityka cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Polityka Cookies</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Serwis wykorzystuje cookies do poprawy doświadczenia użytkownika i analizy danych.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Co to są cookies?</h3>
            <p>
              Cookies to małe pliki tekstowe przechowywane na Twoim urządzeniu, które pozwalają nam
              rozpoznać Cię podczas kolejnych wizyt i zapamiętać Twoje preferencje.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Rodzaje cookies</h3>
            <p>
              <strong>1. Cookies stricte niezbędne (cookie_consent)</strong><br />
              Te cookies są niezbędne do funkcjonowania Serwisu i zapamiętywania Twojej zgody na
              przetwarzanie cookies. Są zawsze aktywne.
            </p>

            <p>
              <strong>2. Cookies analityczne (Cloudflare Analytics)</strong><br />
              Używamy Cloudflare Analytics do zbierania anonimowych informacji o tym, jak użytkownicy
              korzystają z Serwisu, takie jak liczba odwiedzin, strony, które oglądasz, czas spędzony
              na stronie i pochodzenie ruchu. Te dane pomagają nam w optymalizacji Serwisu.
            </p>

            <p>
              <strong>3. Cookies funkcjonalne</strong><br />
              Cookies mogą być używane do zapamiętania Twoich preferencji, takich jak język lub ustawienia.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Jak zarządzać cookies?</h3>
            <p>
              Możesz kontrolować i usuwać cookies za pośrednictwem ustawień przeglądarki. Jednak
              usunięcie cookies stricte niezbędnych może wpłynąć na funkcjonalność Serwisu.
            </p>
            <p>
              Większość przeglądarek pozwala na:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Wyświetlenie, jakie cookies są przechowywane</li>
              <li>Usunięcie specyficznych cookies</li>
              <li>Automatyczne usuwanie cookies przy zamykaniu przeglądarki</li>
              <li>Zablokowanie cookies z określonych witryn</li>
            </ul>
          </div>
        </section>

        {/* 8. Zmiany polityki */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Zmiany polityki</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Administrator zastrzega sobie prawo do zmiany niniejszej polityki prywatności w dowolnym
              czasie. Zmiany wchodzą w życie z chwilą opublikowania na stronie internetowej.
            </p>
            <p>
              W przypadku istotnych zmian, Administrator będzie starać się powiadomić użytkowników
              za pośrednictwem adresu email podanego podczas rejestracji.
            </p>
          </div>
        </section>

        {/* 9. Kontakt */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Kontakt</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              W przypadku pytań dotyczących niniejszej polityki prywatności lub przetwarzania Twoich
              danych osobowych, prosimy o kontakt:
            </p>
            <p>
              <strong>Adsales sp. z o.o.</strong><br />
              NIP: 813 381 82 58<br />
              Email: raport@ilezaremont.pl
            </p>
            <p>
              Możesz również wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO)
              na adres: uodo@uodo.gov.pl
            </p>
          </div>
        </section>

        <hr className="my-12" />
        <p className="text-sm text-gray-600">
          Przeczytaj również nasz <a href="/regulamin" className="text-blue-600 hover:text-blue-800">
            Regulamin
          </a>
        </p>
      </div>
    </main>
  );
}

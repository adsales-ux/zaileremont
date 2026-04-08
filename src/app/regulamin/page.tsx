import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin | ilezaremont.pl',
  description: 'Regulamin korzystania z serwisu ilezaremont.pl',
};

export default function RegulaminPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Regulamin serwisu ilezaremont.pl</h1>
        <p className="text-gray-600 mb-12">Ostatnia aktualizacja: 2026-04-01</p>

        {/* 1. Postanowienia ogólne */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Postanowienia ogólne</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Niniejszy regulamin określa zasady korzystania z serwisu ilezaremont.pl (zwany dalej "Serwisem")
              zarządzanego przez Adsales sp. z o.o.
            </p>
            <p>
              Korzystając z Serwisu, użytkownik akceptuje wszystkie postanowienia niniejszego regulaminu.
              Jeśli nie zgadzasz się z którymkolwiek z postanowień, prosimy nie korzystać z Serwisu.
            </p>
            <p>
              Adsales sp. z o.o. zastrzega sobie prawo do zmiany niniejszego regulaminu w dowolnym czasie.
              Zmiany wchodzą w życie z chwilą opublikowania na stronie internetowej.
            </p>
          </div>
        </section>

        {/* 2. Definicje */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definicje</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Serwis</strong> – serwis internetowy dostępny pod adresem ilezaremont.pl, zarządzany
              przez Adsales sp. z o.o.
            </p>
            <p>
              <strong>Użytkownik</strong> – osoba fizyczna lub prawna korzystająca z Serwisu.
            </p>
            <p>
              <strong>Raport cenowy</strong> – produkt cyfrowy zawierający informacje o cenach i kosztach
              remontowych, dostępny do pobrania w formacie PDF.
            </p>
            <p>
              <strong>Administrator</strong> – Adsales sp. z o.o., NIP: 813 381 82 58, email: raport@ilezaremont.pl.
            </p>
          </div>
        </section>

        {/* 3. Zasady korzystania z serwisu */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Zasady korzystania z serwisu</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Użytkownik zobowiązany jest do korzystania z Serwisu w sposób legalny i zgodny z obowiązującym prawem.
            </p>
            <p>
              Zabrania się:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Przesyłania zawartości obraźliwej, niebezpiecznej lub nielegalnej</li>
              <li>Naruszania praw własności intelektualnej</li>
              <li>Przeprowadzania ataków na infrastrukturę Serwisu</li>
              <li>Automatycznego pobierania zawartości bez zgody Administratora</li>
              <li>Rozpowszechniania wirusów lub złośliwego oprogramowania</li>
            </ul>
            <p>
              Administrator zastrzega sobie prawo do usunięcia lub zablokowania dostępu użytkownika naruszającego
              niniejszy regulamin.
            </p>
          </div>
        </section>

        {/* 4. Kalkulatory i raporty cenowe */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Kalkulatory i raporty cenowe</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Serwis oferuje raporty cenowe zawierające informacje o szacunkowych kosztach remontowych.
            </p>
            <p>
              <strong>Cena:</strong> 29,99 PLN za raport w formacie PDF.
            </p>
            <p>
              <strong>Charakter raportów:</strong> Raporty mają charakter informacyjny i szacunkowy.
              Rzeczywiste koszty remontowe mogą się różnić w zależności od wielu czynników takich jak
              lokalizacja, wielkość projektu, materiały i warunki wykonania prac.
            </p>
            <p>
              <strong>Dostęp do raportu:</strong> Po dokonaniu płatności użytkownik otrzyma dostęp do pobrania
              raportu w formacie PDF na swojej stronie konta.
            </p>
            <p>
              <strong>Używanie raportów:</strong> Raporty mogą być używane wyłącznie do celów osobistych.
              Zabrania się ich rozpowszechniania, sprzedawania lub wykorzystywania w celach komercyjnych
              bez wyraźnej zgody Administratora.
            </p>
          </div>
        </section>

        {/* 5. Płatności */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Płatności</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Płatności za raporty cenowe są przetwarzane przez Stripe.
            </p>
            <p>
              <strong>Dostępne metody płatności:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>BLIK</li>
              <li>Karta kredytowa/debetowa</li>
              <li>Przelew bankowy</li>
              <li>Google Pay</li>
            </ul>
            <p>
              <strong>Bezpieczeństwo:</strong> Wszystkie transakcje są szyfrowane i przetwarzane w zgodzie
              ze standardami PCI DSS. Administrator nie ma dostępu do danych karty kredytowej.
            </p>
            <p>
              <strong>Potwierdzenie płatności:</strong> Po dokonaniu udanej płatności użytkownik otrzyma
              potwierdzenie na podany adres email.
            </p>
          </div>
        </section>

        {/* 6. Reklamacje */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Reklamacje</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Reklamacje dotyczące raportu lub serwisu powinny być zgłaszane na adres email:
              raport@ilezaremont.pl
            </p>
            <p>
              <strong>Termin odpowiedzi:</strong> Administrator zobowiązuje się do rozpatrzenia reklamacji
              w ciągu 14 dni od jej otrzymania.
            </p>
            <p>
              <strong>Zwrot pieniędzy:</strong> W przypadku, gdy raport nie spełnia oczekiwań użytkownika,
              Administrator może rozpatrzyć zwrot pieniędzy w ciągu 30 dni od dokonania płatności.
            </p>
          </div>
        </section>

        {/* 7. Odpowiedzialność */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Odpowiedzialność</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Serwis i raporty są dostarczane na zasadzie "bez gwarancji". Administrator nie ponosi
              odpowiedzialności za:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Dokładność szacunków zawartych w raportach</li>
              <li>Straty finansowe wynikające z wykorzystania raportów</li>
              <li>Przerwy w dostępności Serwisu</li>
              <li>Utraty danych użytkownika</li>
              <li>Problemy techniczne lub błędy w działaniu Serwisu</li>
            </ul>
            <p>
              Użytkownik korzysta z Serwisu na własne ryzyko.
            </p>
          </div>
        </section>

        {/* 8. Prawa autorskie */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prawa autorskie</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Wszystkie materiały dostępne w Serwisie, w tym teksty, grafiki, obrazy, logo i ich układ,
              są własnością Adsales sp. z o.o. lub jej licencjodawców i chronione prawami autorskimi.
            </p>
            <p>
              Zabrania się reprodukowania, dystrybuowania, publicznego wyświetlania lub transmitowania
              jakiekolwiek części Serwisu bez pisemnej zgody Administratora, z wyjątkiem kopii dla
              osobistego, niekomercyjnego użytku.
            </p>
            <p>
              Złamanie praw autorskich może skutkować działaniami prawnymi.
            </p>
          </div>
        </section>

        {/* 9. Postanowienia końcowe */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Postanowienia końcowe</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Prawo właściwe:</strong> Niniejszy regulamin podlega prawu polskiemu.
            </p>
            <p>
              <strong>Jurysdykcja:</strong> Wszelkie spory wynikające z lub związane z niniejszym regulaminem
              będą rozstrzygane przez sądy powszechne o właściwości terytorialnej dla siedziby Administratora.
            </p>
            <p>
              <strong>Kontakt:</strong> W przypadku pytań dotyczących niniejszego regulaminu, prosimy
              kontaktować się na adres: raport@ilezaremont.pl
            </p>
            <p>
              <strong>Adsales sp. z o.o.</strong><br />
              NIP: 813 381 82 58<br />
              Email: raport@ilezaremont.pl
            </p>
          </div>
        </section>

        <hr className="my-12" />
        <p className="text-sm text-gray-600">
          Przeczytaj również naszą <a href="/polityka-prywatnosci" className="text-blue-600 hover:text-blue-800">
            Politykę prywatności
          </a>
        </p>
      </div>
    </main>
  );
}

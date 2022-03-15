# NBD
NBD Ćwiczenia 1 – MongoDB

Zaimportuj plik cwiczenia2.json . II. W jednej konsoli odpal serwer bazy poleceniem mongod. W drugiej konsoli zaimportuj dane do MongoDB przy pomocy następującego polecenia:

mongoimport --file ./filename.json --db nbd --jsonArray -c people

czasem MongoDB odrzuci niektóre dokumenty – nie przejmuj się tym, pozostałe zostaną zaimportowane prawidłowo

Uruchom shell mongo przy pomocy polecenia

mongo

Wskaż bazę danych do użycia przy pomocy

use nbd

Zbuduj następujące zapytania:

1. Jedna osoba znajdująca się w bazie;

2. Jedna kobieta narodowości chińskiej;

3. Lista mężczyzn narodowości niemieckiej;

4. Lista wszystkich osób znajdujących się w bazie o wadze z przedziału <68, 71.5);

5. Lista imion i nazwisk wszystkich osób znajdujących się w bazie oraz miast, w których mieszkają, ale tylko dla osób urodzonych w XXI wieku;

6. Dodaj siebie do bazy, zgodnie z formatem danych użytych dla innych osób (dane dotyczące karty kredytowej, adresu zamieszkania i wagi mogą być fikcyjne);

7. Usuń z bazy osoby o wzroście przekraczającym 190;

8. Zastąp nazwę miasta „Moscow” przez „Moskwa” u wszystkich osób w bazie;

9. Dodaj do wszystkich osób o imieniu Antonio własność „hobby” o wartości „pingpong”;

10. Usuń u wszystkich osób o zawodzie „Editor” własność „email”.

Rozwiązania przesyłamy w następującej formie: dla każdego zadania 2 pliki - osobny plik tekstowy z treścią zapytania/zapytań i osobny plik z wynikami Pliki nazywamy wg schematu: zapytanie_X.js wyniki_X.json – gdzie X zastępujemy numerem zadania.

Aby sensownie zapisywać wyniki do pliku – opakowujemy zapytanie w printjson i ew. po find dodajemy .toArray() – np. printjson(db.products.find().toArray()). Zapytanie zapisujemy do pliku, potem można uruchomić shell mongo w następujący sposób: mongo baza plikzzapytaniem >> plikzwynikami.

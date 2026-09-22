# webbshop

## Webbshop - Projektarbete

Inlämningsuppgift i grupp — Javascript ramverk

Dags att sätta alla kunskaper vi lärt oss i kursen till verket. Alla tekniker vi lärt oss kommer vi kunna använda oss utav när vi nu ska bygga en E-handel med React och Typescript. Det är helt upp till er vilken typ av produkter ni säljer i er webbshop.

Webbshopen skall bestå av 5 huvuddelar:

- Produktsida
- Detaljsida
- Kundkorg
- Utcheckning/Orderflöde
- Orderbekräftelse

## Data/API

Eftersom vi inte kan backend ännu får vi hålla oss till JSON-server. Skapa en db.json som får agera databas. Där skall vi lagra produkter och ordrar.

**Produkter skall minst innehålla:**

- Titel
- Beskrivning
- Pris
- Kategorier (en produkt kan ha flera kategorier, t.ex Byxor, Julrea)
- Om produkten är på rea
- Bild
- Lagersaldo

**Ordrar skall minst innehålla:**

- Ordernr (måste vara unikt)
- Order items ({productId, quantity, price})
- Kundinformation (namn, adress)
- Betalningssätt
- Datum

## Navigering

Navigering i applikationen byggs med react-router. Sidan skall ha en header och en footer, och alla undersidor renderas emellan dessa. Headern skall minst innehålla en logga och en kundvagnsikon. Footern innehåller lite kontaktinformation.

## Produktsidan

Design är helt valfritt men produktsidan fungerar som startsida. Den skall ha ett rutnät med produktkort samt filter/knappar så att man kan filtrera produkter efter kategori. Produktkorten visar bild, titel, pris och en "lägg i kundvagn"-knapp.

## Detaljsidan

När man trycker på ett produktkort på produktsidan navigeras man till en detaljsida om produkten. Här visas en större bild samt mer information om produkten. Även här skall det finnas en "Lägg till i kundvagn"-knapp.

## Kundkorg

När användaren lägger till en produkt i kundvagnen skall en siffra visas bredvid/över kundvagnsikonen i headern. Siffran talar om hur många produkter vi har i kundkorgen. Om inga produkter finns skall det inte stå någon siffra alls. Det ska alltså aldrig stå "0" där.

Vid klick på kundvagnsikonen tas man till en sida/drawer/modal eller liknande som listar produkterna i kundvagnen. Tänk på att om man lagt till fler av samma produkt så är det fortfarande bara 1 rad i listan.

Visa miniatyrbild, produkttitel, pris, antal samt knappar för att höja och sänka antalet. Det skall även finnas en knapp för att ta bort produkten ur listan. Visa även nuvarande totalpris för hela ordern.

Under listan finns en knapp "Gå till kassan".

## Utcheckning

När man går till kassan hamnar man i utcheckningsflödet. Här visas samma lista som i kundvagnen (återanvänd samma komponent). Men här kan man inte redigera något. Flödet består utöver listan av tre delar och hur ni gör UI/UX här är upp till er men det skall inte gå att hoppa till nästa del förrän man är klar med det nuvarande. De tre delarna är tre olika formulär:

1. Kundinformation (namn, adress)
2. Fraktsätt (t.ex DHL, Schenker, Postnord)
3. Betalningssätt (t.ex Kort, Swish, Klarna)

Samtliga formulär byggs med react-hook-form och zod. En enklare validering skall finnas. (Låt varje formulär vara sin egna komponent.)

Längst ner finns en knapp "Betala" som endast kan användas när samtliga tre steg är korrekt ifyllda.

## Bekräftelsesidan

Om allt går bra skapas en order i databasen och användaren navigerar till en bekräftelsesida som visar upp detaljer om ordern. Det är upp till er vad ni vill visa här, men minst skall det finnas ett meddelande om det gick bra eller inte, samt ett ordernummer. Tänk på att tömma kundvagnen.

## Kravspecifikation

### G

- Git och GitHub (GitHub Flow) har använts
- Det finns en db.json med produkter och ordrar
- Man kan bygga API-kommunikationen med vanlig fetch
- Navigering görs med React Router
- Produkterna kan tillhöra flera kategorier
- Det finns en produktsida med produktlista och kategorifilter
- Det går att navigera till en detaljsida
- Produkt kan läggas i kundvagnen från både produktlista och detaljsida
- React Context används för kundvagnens state
- Samma produkt visas endast en gång i kundvagnen och antal hanteras separat
- Kundvagnen visar produkt, pris, antal och totalpris
- Det går att öka, minska och ta bort produkter
- Checkout är uppdelad i tre steg
- React Hook Form och Zod används för formulären
- Formulären har validering
- Validering som inte går igenom skall visas upp för användaren
- En order skapas i db.json när köpet genomförs och innehåller information enligt specifikationen ovan
- Användaren navigeras till en orderbekräftelse
- Minst 3 relevanta tester med React Testing Library/Vitest (funktionalitet/logik, ej endast UI)

### VG

- Alla krav för G är uppfyllda
- All kommunikation med API:t hanteras med TanStack Query
- Felhantering för exempelvis misslyckade API-anrop (isError)
- Loading-indikator när vi anropar API (isLoading)
- Minst en Error Boundary med relevant fallback (renderingsfel)
- Lagersaldo påverkas när en order genomförs
- Det går inte att köpa fler produkter än vad som finns i lager
- Produkter som är slut i lager visas tydligt och kan inte köpas

Lycka till!

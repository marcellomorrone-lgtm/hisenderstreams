# Deployment-Hinweise – TV Streams Multilang

## Inhalt
- Root `/` → Deutsch
- `/en/` → Englisch
- `/fr/` → Französisch
- `/it/` → Italienisch
- `assets/style.css` → zentrales Styling
- `assets/app.js` → Scroll-Animationen, Senderfinder, Filterlogik
- `assets/channels-data.js` → aufbereitete Senderliste aus `tv_sender_liste_HI.xlsx`
- `assets/flags/` → grafische Landesflaggen im Header
- jeweilige `danke.html` und `/danke/index.html` → Bestätigungsseiten nach Formularversand

## Besondere Features
- grafische Sprachumschaltung im Header mit vier Landesflaggen
- echter Senderfinder mit Filtern nach Paket, Sprache, Land, Kategorie, HD/SD und Sendername
- konkrete Paketdifferenzierung mit aktuellen Senderzahlen
- Scroll-Features: Progress-Bar, Reveal-Animationen, animierte Kennzahlen, sticky Filterpanel
- Casting/BYOD als gezielte Erweiterung integriert

## Datenbasis
Die Senderliste wurde aus der Excel-Datei `tv_sender_liste_HI.xlsx` übernommen.
Stand: Hotelinnovativ – TV Sender Liste
Version: 

## Formular / Netlify
Formularname: `tv-streams-check`
Alle Sprachseiten verwenden dasselbe Netlify-Formular.

### Damit E-Mails an sales@hotelinnovativ.ch ankommen:
1. ZIP entpacken und bei Netlify deployen.
2. Nach dem ersten Deploy prüfen, ob unter **Forms** das Formular `tv-streams-check` erkannt wurde.
3. Unter **Forms / Notifications** eine E-Mail-Benachrichtigung an `sales@hotelinnovativ.ch` einrichten.
4. Testformular absenden.

## Deployment
### Variante A – Drag & Drop
1. ZIP lokal entpacken
2. In Netlify: **Add new site → Deploy manually**
3. Den kompletten entpackten Ordner hochladen

### Variante B – bestehendes Projekt aktualisieren
1. ZIP lokal entpacken
2. Dateien im Projekt ersetzen
3. Neu deployen

## Hinweis
Die Logos der einzelnen TV-Sender wurden bewusst nicht als externe Original-Logos nachgeladen. Stattdessen verwendet der Senderfinder stilisierte Sender-Badges für eine saubere, schnelle und professionelle Darstellung.

## Neue interaktive Funktionen
- interaktiver Kostenrechner für 10 bis 500 TV-Geräte
- dynamische Monats- und Jahreskosten für Basic, Essential und Max
- neu strukturierte Seitenreihenfolge
- eigener Technik- und IP-over-Coax-Bereich
- Referenzen und Vertrauenssignale
- Infrastruktur-Check als Haupt-CTA

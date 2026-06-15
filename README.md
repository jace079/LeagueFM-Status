<div align="center">

# 🎵 League-FM RPC

**Discord Rich Presence voor League-FM luisteraars**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-RPC-7289DA.svg)](https://discord.com)
[![LeagueFM](https://img.shields.io/badge/League--FM-Live-3B82F6.svg)](https://league-fm.nl)

---

*Hey, bedankt dat je de League-FM RPC wilt gebruiken.*
*Dit project is gemaakt door Jace (itsdevjace).*

League-FM RPC is een open-source Discord Rich Presence applicatie waarmee League-FM luisteraars hun luisterstatus automatisch kunnen tonen op Discord.

</div>

---

## LeagueFM Verificatie

Deze applicatie werkt alleen als je een DJ bent bij league-fm. 

Dit progamma checkt via jou naam of je in de discord zit en op de website staat. 

Ik (jace) verwerk geen gegevens van jullie

---

## 📸 Preview

Zo ziet jouw Discord status eruit:

```
┌─────────────────────────────────┐
│  LeagueFM | Mixxx               │
│                                 │
│  [LeagueFM Logo]  🔴 LIVE       │
│                                 │
│  Nummer - Song                  │
│  DJ                             │
│                                 │
│  🎵 Huidig nummer               │
│  ⏱️  24:42:23                   │
│                                 │
│  [🎧 Luister Live] [💬 Discord] │
└─────────────────────────────────┘
```

---

## 🚀 Snelle Start

### Vereisten

- [Node.js](https://nodejs.org) versie 16 of hoger
- [Discord](https://discord.com) desktop app (moet open zijn)
- Een Discord Application (zie handleiding hieronder)

### Installatie

1. **Download het project**
   download als ZIP via de groene "Code" knop op GitHub

2. **Maak een Discord Applicatie** (zie handleiding hieronder)

3. **Voer de installer uit**

   Dubbelklik op `setup.bat` — de installer doet de rest!

4. **Start de RPC**
   Volg de instructies verder om verder te gaan
---

## 🎮 Discord Applicatie Aanmaken

Om League-FM RPC te gebruiken heb je een eigen Discord applicatie nodig.
Dit is gratis en duurt maar 2 minuten.

### Stap 1 — Developer Portal openen

Ga naar: **https://discord.com/developers/applications**

Log in met je Discord account als dat nog niet gedaan is.

### Stap 2 — Nieuwe Applicatie

Klik op de blauwe knop **"New Application"** rechtsboven.

### Stap 3 — Naam instellen

Geef je applicatie de naam:
```
LeagueFM 
```

> Deze naam verschijnt in je Discord status als "speelt LeagueFM | Mixxx"

Klik op **"Create"**.

### Stap 4 — Application ID kopiëren

Op de pagina die nu opent zie je **"Application ID"**.

Klik op **"Copy"** om de ID te kopiëren. Deze ID heb je nodig in de installer.

> 💡 De Application ID ziet eruit als: `1234567890123456789`

### Stap 5 — Logo uploaden


Voor de mooiste Discord status moet je het League-FM logo uploaden:

1. Klik in het linkermenu op **"Rich Presence"**
2. Klik op **"Art Assets"**
3. Klik op **"Add Image(s)"**
4. Upload het League-FM logo en noem het: `leaguefm_logo`
5. Upload een LIVE icoon en noem het: `live_icon`
6. Sla op met **"Save Changes"**

> 🖼️ Download het League-FM logo op:

[http://logo.jace.dev/leaguefm-1](https://media.discordapp.net/attachments/1410524828426960938/1515464397059919882/OIP.webp)


### Stap 6 — Application ID plakken

Voer `setup.bat` uit en plak de Application ID wanneer ernaar gevraagd wordt.

---

> ⚠️ **BELANGRIJK: Geef je Application ID NOOIT aan anderen.**
> 
> De Application ID is persoonlijk en alleen bedoeld voor jouw gebruik.
> Anderen kunnen er misbruik van maken als ze het hebben.

---

## 🌐 API

Deze applicatie maakt gebruik van de League-FM API:

```
GET http://api.league-fm.nl/
```

De API geeft informatie terug over het nummer dat op dit moment speelt, waaronder de artiest, titel en afspeelduur.

---

## 🐛 Problemen Oplossen

### Discord status verschijnt niet

- Zorg dat Discord **open** is voordat je de RPC start
- Controleer of de Application ID correct is in `.env`
- Wacht even — het kan 10-30 seconden duren voordat de status verschijnt

### "Node.js niet gevonden" fout

- Download Node.js op https://nodejs.org (kies de LTS versie)
- Na installatie: herstart je computer en probeer opnieuw

### "Cannot connect" fout

- Sluit de RPC en open hem opnieuw
- Zorg dat Discord volledig geladen is
- Controleer of je firewall Discord IPC niet blokkeert

### Logo's verschijnen niet

- Zorg dat je de afbeeldingen hebt geüpload in de Discord Developer Portal
- De namen moeten **exact** `leaguefm_logo` en `live_icon` zijn
- Het kan 10-15 minuten duren voordat nieuwe afbeeldingen zichtbaar zijn

- ### Contact Opnemen

Email: Jacelentze.zm@gmail.com
Tel: +31 6 49220090
Discord: itsdevjace

---

## 📜 Licentie

Dit project is gelicenseerd onder de **MIT Licentie**.
Zie het [LICENSE](LICENSE) bestand voor meer informatie.

---

## 👏 Credits

| Naam | Bijdrage |
|---|---|
| **Jace (itsdevjace)** | Maker van League-FM RPC |
| **League-FM** | Radio Station LFM |
| **League-FM API** | API library |
| **api.jace.dev** | API library Discord Connectie |

---

<div align="center">

**Gemaakt met ❤️ door [Jace (itsdevjace)](https://github.com/jace079)**

[🎧 Luister naar League-FM](https://league-fm.nl) · [💬 Join de Discord](https://discord.gg/leaguefm) [🎧 Progamma](https://league-fm.nl/programma)

</div>

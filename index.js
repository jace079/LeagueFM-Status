/**
 * =============================================
 *   Created By: Jace (itsdevjace)
 *   GitHub: https://github.com/jace079/league-fm-rpc
 * =============================================
 */

require("dotenv").config();

const RPC = require("discord-rpc");
const { io } = require("socket.io-client");
const readline = require("readline");

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_NAME = process.env.DISCORD_NAME || "";

const BUTTONS = [
  { label: "🎧 Luister Live", url: "https://league-fm.nl" },
  { label: "💬 Discord", url: "https://discord.gg/leaguefm" },
];

if (!CLIENT_ID) {
  console.log("  [FOUT] DISCORD_CLIENT_ID is niet ingesteld!");
  console.log("  Voer setup.bat opnieuw uit.");
  process.exit(1);
}

RPC.register(CLIENT_ID);

const client = new RPC.Client({ transport: "ipc" });
let startTimestamp = null;
let isConnected = false;

let currentTrack = { title: "League-FM", artist: "Live Radio", startedAt: null };
let modus = null;
let showNaam = DISCORD_NAME;
let ingeklokt = false;
let showStartTime = null;

// =============================================
// KEUZEMENU
// =============================================

function toonMenu() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("");
  console.log("  ================================");
  console.log("  Kies een modus:");
  console.log("");
  console.log("  [1] Nummer modus");
  console.log("  [2] Show modus");
  console.log("  ================================");
  console.log("");

  rl.question("  Jouw keuze (1 of 2): ", (keuze) => {
    keuze = keuze.trim();

    if (keuze === "1") {
      modus = "nummer";
      rl.close();
      console.log("");
      console.log("  [OK] Nummer modus gestart.");
      console.log("");
      startApp();

    } else if (keuze === "2") {
      modus = "show";

      if (showNaam) {
        rl.close();
        ingeklokt = true;
        showStartTime = new Date();
        console.log("");
        console.log("  [OK] Show modus gestart als: " + showNaam);
        console.log("");
        startApp();
      } else {
        rl.question("  Jouw Discord naam: ", (naam) => {
          showNaam = naam.trim() || "DJ";
          rl.close();
          ingeklokt = true;
          showStartTime = new Date();
          console.log("");
          console.log("  [OK] Show modus gestart als: " + showNaam);
          console.log("");
          startApp();
        });
      }

    } else {
      rl.close();
      console.log("  Ongeldige keuze. Probeer opnieuw.");
      toonMenu();
    }
  });
}

// =============================================
// SOCKET.IO
// =============================================

function startSocket() {
  console.log("  [SOCKET] Verbinden met League-FM API...");

  const socket = io("https://api.league-fm.nl", {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 3000,
    reconnectionAttempts: Infinity,
  });

  socket.on("connect", () => {
    console.log("  [SOCKET] Verbonden met League-FM API!");
  });

  socket.on("disconnect", (reason) => {
    console.log("  [SOCKET] Verbinding verbroken: " + reason);
  });

  socket.on("connect_error", (err) => {
    console.log("  [SOCKET] Fout: " + err.message);
  });

  socket.on("nowPlayingV2", (data) => {
    if (!data || !data.song) return;

    const song = data.song;
    const title = song.title || "League-FM";
    const artist = Array.isArray(song.artists) && song.artists.length > 0
      ? song.artists.join(", ")
      : "Live Radio";

    currentTrack = { title, artist, startedAt: data.startedAt || null };

    console.log("  [TRACK] " + artist + " - " + title);

    if (isConnected) updatePresence();
  });

  return socket;
}

// =============================================
// DISCORD PRESENCE
// =============================================

async function updatePresence() {
  if (!isConnected) return;

  try {
    if (modus === "nummer") {

      await client.setActivity({
        details: currentTrack.title,
        state: currentTrack.artist,
        largeImageKey: "leaguefm_logo",
        largeImageText: "LeagueFM | Mixxx",
        smallImageKey: "live_icon",
        smallImageText: "LIVE",
        startTimestamp: currentTrack.startedAt ? new Date(currentTrack.startedAt) : startTimestamp,
        buttons: BUTTONS,
        instance: false,
      });

      console.log("  [RPC] " + currentTrack.artist + " - " + currentTrack.title);

    } else if (modus === "show" && ingeklokt) {

      // Details = grote tekst bovenaan = "LeagueFM"
      // State  = kleine tekst eronder = "Nummer - Artist\nShow: naam"
      // Discord laat maar 1 state regel toe dus we combineren het slim:
      // details = titel van nummer
      // state   = artist • Show: naam
      await client.setActivity({
        details: currentTrack.title + " - " + currentTrack.artist,
        state: "Show: " + showNaam,
        largeImageKey: "leaguefm_logo",
        largeImageText: "LeagueFM | Mixxx",
        smallImageKey: "live_icon",
        smallImageText: "LIVE",
        startTimestamp: showStartTime,
        buttons: BUTTONS,
        instance: false,
      });

      console.log("  [SHOW] " + currentTrack.title + " - " + currentTrack.artist + " | Show: " + showNaam);

    } else if (modus === "show" && !ingeklokt) {
      await client.clearActivity();
      console.log("  [SHOW] Uitgelokt — status gewist.");
    }

  } catch (error) {
    console.log("  [FOUT] " + error.message);
    if (error.message.includes("not connected") || error.message.includes("Could not connect")) {
      isConnected = false;
      setTimeout(connectToDiscord, 5000);
    }
  }
}

// =============================================
// DISCORD VERBINDING
// =============================================

async function connectToDiscord() {
  try {
    console.log("  [RPC] Verbinden met Discord...");
    startTimestamp = new Date();
    await client.login({ clientId: CLIENT_ID });
  } catch (error) {
    console.log("  [FOUT] " + error.message);
    console.log("  [RPC] Discord open? Opnieuw in 10s...");
    setTimeout(connectToDiscord, 10000);
  }
}

client.on("ready", async () => {
  isConnected = true;

  console.log("");
  console.log("  ================================");
  console.log("  [OK] Verbonden met Discord!");
  console.log("  [OK] Gebruiker: " + client.user.username);
  console.log("  [OK] RPC actief op je profiel.");
  console.log("  ================================");
  console.log("");

  if (modus === "show") {
    console.log("  Commando's: typ 'in' of 'uit' + Enter");
    console.log("");
    startCommandLoop();
  } else {
    console.log("  Sluit dit venster om te stoppen.");
    console.log("");
  }

  await updatePresence();
});

client.on("error", (err) => {
  console.log("  [FOUT] " + err.message);
});

client.on("disconnected", () => {
  isConnected = false;
  console.log("  [WARN] Verbinding verbroken. Opnieuw verbinden...");
  setTimeout(connectToDiscord, 5000);
});

// =============================================
// IN/UIT KLOKKEN LOOP
// =============================================

function startCommandLoop() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

  rl.on("line", (input) => {
    input = input.trim().toLowerCase();

    if (input === "in") {
      if (ingeklokt) {
        console.log("  [SHOW] Al ingeklokt.");
      } else {
        ingeklokt = true;
        showStartTime = new Date();
        console.log("  [SHOW] Ingeklokt als: " + showNaam);
        if (isConnected) updatePresence();
      }
    } else if (input === "uit") {
      if (!ingeklokt) {
        console.log("  [SHOW] Al uitgelokt.");
      } else {
        ingeklokt = false;
        showStartTime = null;
        console.log("  [SHOW] Uitgeklokt.");
        if (isConnected) client.clearActivity().catch(() => {});
      }
    } else if (input === "status") {
      console.log("  [SHOW] " + (ingeklokt ? "Ingeklokt als: " + showNaam : "Uitgelokt"));
    }
  });
}

// =============================================
// START
// =============================================

function startApp() {
  const socket = startSocket();
  connectToDiscord();

  async function shutdown() {
    console.log("");
    console.log("  [RPC] Wordt afgesloten...");
    if (isConnected) { try { await client.clearActivity(); } catch (_) {} }
    socket.disconnect();
    client.destroy();
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

// =============================================
// BANNER
// =============================================

console.log("");
console.log("  ================================");
console.log("  League-FM RPC v1.0.0");
console.log("  Created By: itsdevjace");
console.log("  ================================");
console.log("");

toonMenu();

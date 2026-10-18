# BBQ Olympics 2026

A mobile-first, browser-only five-event score challenge for the team BBQ on Friday, 23 October 2026. The game uses HTML, CSS, and vanilla JavaScript modules; no build step, paid assets, API keys, or backend are required.

## Run locally

Serve this folder over HTTP because the game uses JavaScript modules. From the project directory, run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. You can also use any static HTTP server. Opening `index.html` directly as a `file://` URL is not supported by all browsers.

## Test in GitHub Codespaces

1. Open the repository in a Codespace.
2. In the terminal, run `python3 -m http.server 8000` from the repository root.
3. Use the Ports panel to forward port `8000`, then open the forwarded URL in the browser.
4. Test touch-sized controls using the browser's device emulation, and test audio after interacting with the page (mobile browsers require a user gesture before audio playback).

## Deploy to GitHub Pages

1. In the repository's GitHub settings, open **Pages**.
2. Choose **Deploy from a branch**, select the branch and `/ (root)` folder, then save.
3. Wait for Pages to publish and open the site URL shown in the settings.

All local references are relative, so the static files can be served from a project subpath. No build or deployment workflow is included, and this project does not publish itself.

## Scoring

Each event is capped at 1,000 points, for a 5,000-point total. Reaction Rush awards up to 200 points for each of five reactions; false starts use an attempt. Memory Master awards 200 per completed round. Grill Master scores nine food removals against each item's target time and caps the three rounds at 1,000. Penalty King awards 200 per goal in five shots. Trivia Blitz asks five randomly chosen questions; each correct answer is worth 100 base points plus up to 100 speed-bonus points. A completed event's score is locked for the session, including a zero.

Session nickname and completed event scores persist in this browser's `localStorage`. The leaderboard is also device-local and stores completed results in this browser only; it is not shared, authoritative, or cheat-proof. Reset Session clears current progress but keeps leaderboard entries. Play Again starts another session with the same nickname.

## Shared leaderboard later

`leaderboard.js` exposes `getEntries()` and `submitEntry(entry)` behind a small async service interface. To add Supabase later, replace that module's `localStorage` implementation with calls to a Supabase client while preserving the interface, then add project URL/key configuration and server-side validation / row-level security. Never put a privileged service-role key in this static client. The current local scores are user-editable and should not be trusted for prizes.

# BBQ Olympics 2026

A mobile-first, browser-only five-event score challenge for the team BBQ on Friday, 23 October 2026. The game uses HTML, CSS, and vanilla JavaScript modules; no build step is required. Its shared leaderboard uses Supabase.

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

Session nickname and completed event scores persist in this browser's `localStorage`. Completed final scores are submitted to the shared Supabase leaderboard. Reset Session clears current progress but keeps the submitted leaderboard entry. Play Again starts another session with the same nickname and can update that player's leaderboard record.

## Configure the shared leaderboard

1. Open [`supabase-config.js`](./supabase-config.js).
2. Replace `YOUR_SUPABASE_PUBLISHABLE_KEY` with the project's Supabase **publishable** key (it begins with `sb_publishable_`). The project URL is already filled in.
3. Deploy the static files to GitHub Pages and load the page over HTTPS. The Supabase JavaScript client is loaded from jsDelivr, so browsers need network access to that CDN and to Supabase.

The game signs each browser into Supabase anonymously and reuses the Supabase auth session stored by the client. The authenticated user's UUID is used as `player_id`; each player has one row that is upserted on completion. The board reads up to 30 rows ordered by descending score and then earliest completion time, and refreshes every 10 seconds while the competitor hub is open.

Keep Row Level Security enabled and retain the table policies that limit authenticated inserts and updates to the user's own `player_id`, along with public leaderboard reads. The publishable key is intended for browser use; **never put a secret or service-role key in this static client**. This is a casual event leaderboard, not a cheat-proof scoring system: client-side game results can be manipulated, so do not treat them as authoritative for prizes.

## Test with two phones

1. Configure the publishable key and publish the site (or serve it over HTTPS on a network both phones can reach).
2. Open the same site URL on each phone. Use separate browsers or browser profiles so each phone gets its own anonymous Supabase account.
3. Enter different nicknames, complete all five events on each phone, and check that each final score appears on the shared board.
4. Keep one phone on the competitor hub. Submit another result from the second phone; the first board should update within 10 seconds.
5. Reload each phone and confirm its anonymous session is reused. If connection or submission fails, the page displays an error; on the completion screen, use **Retry score submission** after restoring connectivity.

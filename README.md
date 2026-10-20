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

The game signs each browser into Supabase anonymously and reuses the Supabase auth session stored by the client. The authenticated user's UUID is used as `player_id`; each player has one row, and only a strictly higher score replaces that player's existing best. The board reads up to 30 rows ordered by descending score and then earliest completion time, and refreshes every 10 seconds while the competitor hub is open.

Keep Row Level Security enabled and retain the table policies that limit authenticated inserts and updates to the user's own `player_id`, along with public leaderboard reads. The score submission function below runs as the caller, obtains `player_id` from `auth.uid()`, and relies on those same table privileges and RLS policies. Run it in the Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION public.submit_bbq_leaderboard_score(
  p_nickname text,
  p_total_score integer,
  p_completed_at timestamptz
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $function$
DECLARE
  v_player_id uuid := auth.uid();
BEGIN
  IF v_player_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF p_nickname IS NULL OR btrim(p_nickname) = '' OR char_length(p_nickname) > 16 THEN
    RAISE EXCEPTION 'Nickname must be 1 to 16 characters' USING ERRCODE = '22023';
  END IF;
  IF p_total_score IS NULL OR p_total_score < 0 OR p_total_score > 5000 THEN
    RAISE EXCEPTION 'Score must be a whole number from 0 to 5000' USING ERRCODE = '22023';
  END IF;
  IF p_completed_at IS NULL THEN
    RAISE EXCEPTION 'Completion time is required' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.bbq_leaderboard AS current_entry
    (player_id, nickname, total_score, completed_at)
  VALUES
    (v_player_id, btrim(p_nickname), p_total_score, p_completed_at)
  ON CONFLICT (player_id) DO UPDATE
    SET nickname = EXCLUDED.nickname,
        total_score = EXCLUDED.total_score,
        completed_at = EXCLUDED.completed_at
    WHERE current_entry.total_score < EXCLUDED.total_score;
END;
$function$;

REVOKE ALL ON FUNCTION public.submit_bbq_leaderboard_score(text, integer, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_bbq_leaderboard_score(text, integer, timestamptz) TO authenticated;
```

The conditional `ON CONFLICT` update is atomic: concurrent submissions cannot replace a higher score with a lower or equal one. Equal and lower scores leave the existing row, nickname, and completion time untouched. Keep the table's authenticated INSERT and UPDATE grants and policies in place; the policies must enforce `player_id = auth.uid()` (including UPDATE `USING` and `WITH CHECK`). No secret or service-role key is needed; the publishable key is intended for browser use. This is a casual event leaderboard, not a cheat-proof scoring system: client-side game results can be manipulated, so do not treat them as authoritative for prizes.

## Test with two phones

1. Configure the publishable key and publish the site (or serve it over HTTPS on a network both phones can reach).
2. Open the same site URL on each phone. Use separate browsers or browser profiles so each phone gets its own anonymous Supabase account.
3. Enter different nicknames, complete all five events on each phone, and check that each final score appears on the shared board.
4. Keep one phone on the competitor hub. Submit another result from the second phone; the first board should update within 10 seconds.
5. Reload each phone and confirm its anonymous session is reused. If connection or submission fails, the page displays an error; on the completion screen, use **Retry score submission** after restoring connectivity.

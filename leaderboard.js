import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './supabase-config.js';

const MAX_ENTRIES = 30;
const SUPABASE_MODULE_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
let client;
let initializationPromise;

async function setupClient() {
  if (!SUPABASE_PUBLISHABLE_KEY.startsWith('sb_publishable_')) {
    throw new Error('Add your Supabase publishable key to supabase-config.js.');
  }

  const { createClient } = await import(SUPABASE_MODULE_URL);
  client ||= createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const { data: { session }, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw sessionError;
  if (!session) {
    const { data, error: signInError } = await client.auth.signInAnonymously();
    if (signInError) throw signInError;
    if (!data.session?.user?.id) {
      throw new Error('Anonymous sign-in did not return an authenticated player session.');
    }
  }
}

async function ensureClient() {
  if (!initializationPromise) initializationPromise = setupClient();
  try {
    await initializationPromise;
  } catch (error) {
    initializationPromise = undefined;
    throw error;
  }
  return client;
}

export const leaderboardService = {
  async getEntries() {
    const supabase = await ensureClient();
    const { data, error } = await supabase
      .from('bbq_leaderboard')
      .select('player_id, nickname, total_score, completed_at')
      .order('total_score', { ascending: false })
      .order('completed_at', { ascending: true })
      .limit(MAX_ENTRIES);

    if (error) throw error;
    return data.map((entry) => ({
      playerId: entry.player_id,
      nickname: entry.nickname,
      score: entry.total_score,
      completedAt: Date.parse(entry.completed_at),
    }));
  },

  async submitEntry({ nickname, score, completedAt }) {
    if (typeof nickname !== 'string' || !nickname.trim() || nickname.length > 16) {
      throw new Error('Enter a nickname of 1–16 characters before submitting.');
    }
    if (!Number.isInteger(score) || score < 0 || score > 5000) {
      throw new Error('The final score must be a whole number from 0 to 5,000.');
    }

    const supabase = await ensureClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('Anonymous sign-in did not return a player account.');

    const { error } = await supabase
      .from('bbq_leaderboard')
      .upsert({
        player_id: user.id,
        nickname: nickname.trim(),
        total_score: score,
        completed_at: new Date(completedAt).toISOString(),
      }, { onConflict: 'player_id' });
    if (error) throw error;

    return { playerId: user.id };
  },
};

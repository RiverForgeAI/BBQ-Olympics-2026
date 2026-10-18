const STORAGE_KEY = 'bbq-olympics-2026-leaderboard-v1';
const MAX_ENTRIES = 20;

function readEntries() {
  try {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(entries) ? entries.filter((entry) => (
      entry && typeof entry.nickname === 'string' &&
      Number.isFinite(entry.score) && entry.score >= 0 && entry.score <= 5000
    )) : [];
  } catch {
    return [];
  }
}

function sortEntries(entries) {
  return entries.sort((a, b) => b.score - a.score || a.completedAt - b.completedAt);
}

export const leaderboardService = {
  async getEntries() {
    return sortEntries(readEntries()).slice(0, MAX_ENTRIES);
  },

  async submitEntry(entry) {
    const entries = readEntries().filter((saved) => saved.sessionId !== entry.sessionId);
    entries.push({ ...entry, completedAt: entry.completedAt || Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortEntries(entries).slice(0, MAX_ENTRIES)));
    return entry;
  },
};
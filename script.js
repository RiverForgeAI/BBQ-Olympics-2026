import { leaderboardService } from './leaderboard.js';

const SESSION_KEY = 'bbq-olympics-2026-session-v1';
const CHALLENGES = [
  { id: 'reaction', title: 'Reaction Rush', short: 'REACTION', description: 'Beat the green light. Keep your cool.', icon: '↯', color: 'lime', instructions: 'Wait for the red signal to turn green, then tap as fast as you can. Five attempts. Jumping the gun uses an attempt.' },
  { id: 'memory', title: 'Memory Master', short: 'MEMORY', description: 'Remember the order. Repeat it back.', icon: '▦', color: 'blue', instructions: 'Watch the BBQ sequence, then repeat it in the same order. Each clear round adds one more item. One mistake ends the run.' },
  { id: 'grill', title: 'Grill Master', short: 'GRILL', description: 'The perfect flip is everything.', icon: '♨', color: 'orange', instructions: 'Tap each item when it reaches its sweet spot. Three rounds, three items per round. Early is undercooked; late is burnt.' },
  { id: 'penalty', title: 'Penalty King', short: 'PENALTIES', description: 'Pick a corner. Beat the keeper.', icon: '◎', color: 'lime', instructions: 'Choose one of six spots inside the goal. The keeper dives independently. Five shots, 200 points per goal.' },
  { id: 'trivia', title: 'Trivia Blitz', short: 'TRIVIA', description: 'Quick answers. Quicker thinking.', icon: '?', color: 'blue', instructions: 'Answer five questions before each ten-second timer runs out. Correct answers score more when you answer quickly.' },
];

const ICONS = ['🍔', '🌭', '🔥', '🥩'];
const ICON_LABELS = ['Burger', 'Hot dog', 'Flame', 'Steak'];
const TRIVIA = [
  { category: 'SINGAPORE', question: 'What is Singapore’s national flower?', answers: ['Vanda Miss Joaquim orchid', 'Hibiscus', 'Bougainvillea', 'Jasmine'], correct: 0 },
  { category: 'SINGAPORE', question: 'Which title is Singapore’s national anthem?', answers: ['Majulah Singapura', 'Home', 'Count on Me, Singapore', 'Stand Up for Singapore'], correct: 0 },
  { category: 'SINGAPORE', question: 'What is Singapore’s currency?', answers: ['Singapore dollar', 'Malaysian ringgit', 'Indonesian rupiah', 'Thai baht'], correct: 0 },
  { category: 'SINGAPORE', question: 'Which of these is NOT one of Singapore’s four official languages?', answers: ['Japanese', 'English', 'Malay', 'Tamil'], correct: 0 },
  { category: 'SINGAPORE', question: 'In which year did Singapore become an independent country?', answers: ['1965', '1959', '1963', '1967'], correct: 0 },
  { category: 'SINGAPORE', question: 'The Johor-Singapore Causeway connects Singapore with which Malaysian city?', answers: ['Johor Bahru', 'Kuala Lumpur', 'Malacca City', 'George Town'], correct: 0 },
  { category: 'SINGAPORE', question: 'What does MRT stand for in Singapore’s public transport system?', answers: ['Mass Rapid Transit', 'Main Rail Transit', 'Metro Road Transport', 'Mass Railway Track'], correct: 0 },
  { category: 'SINGAPORE', question: 'The Merlion has the head of a lion and the body of which animal?', answers: ['A fish', 'A horse', 'A dragon', 'A turtle'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'What is the minimum safe internal temperature commonly recommended for poultry?', answers: ['74°C', '50°C', '60°C', '90°C'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'Beef brisket comes from which part of the animal?', answers: ['The chest', 'The back leg', 'The shoulder blade', 'The short loin'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'What is a marinade used for before cooking?', answers: ['Soaking food to add flavour', 'Cooling a grill', 'Measuring food temperature', 'Removing the cooking oil'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'With direct-heat grilling, where is the food placed?', answers: ['Directly above the heat source', 'Beside the heat source', 'In a separate oven', 'On an unheated shelf'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'With indirect-heat grilling, where is the food placed?', answers: ['Beside, rather than directly over, the heat source', 'Directly over the hottest flame', 'Under cold running water', 'Inside the charcoal tray'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'What is satay traditionally cooked on?', answers: ['Skewers', 'A flatbread', 'A soup spoon', 'A baking tray of water'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'Which cheese is known for holding its shape when grilled?', answers: ['Halloumi', 'Brie', 'Mascarpone', 'Cream cheese'], correct: 0 },
  { category: 'FOOD & BBQ', question: 'What happens when meat is left to rest after cooking?', answers: ['Its juices redistribute as it stands', 'It cooks instantly to a higher temperature', 'It becomes safe without cooking', 'Its fat turns into water'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'How many players from one team are on the field at the start of a standard football match?', answers: ['11', '9', '10', '12'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'How far is the penalty mark from the goal line in association football?', answers: ['11 metres', '9 metres', '10 metres', '12 metres'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'How long is regulation time in a standard senior football match, before added time?', answers: ['90 minutes', '80 minutes', '100 minutes', '120 minutes'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'What does a yellow card mean in association football?', answers: ['The player has been cautioned', 'The player has scored a goal', 'The match has ended', 'The player must leave the field immediately'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'How high is a standard basketball hoop above the floor?', answers: ['3.05 metres', '2.44 metres', '2.75 metres', '3.50 metres'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'Which Grand Slam tennis tournament is played on grass courts?', answers: ['Wimbledon', 'French Open', 'Australian Open', 'US Open'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'How long is an official marathon?', answers: ['42.195 kilometres', '40 kilometres', '45 kilometres', '50 kilometres'], correct: 0 },
  { category: 'FOOTBALL & SPORTS', question: 'How many rings are on the Olympic symbol?', answers: ['Five', 'Four', 'Six', 'Seven'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'Which planet is known as the Red Planet?', answers: ['Mars', 'Venus', 'Jupiter', 'Mercury'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'What is the chemical formula for water?', answers: ['H₂O', 'CO₂', 'O₂', 'NaCl'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'How many sides does a hexagon have?', answers: ['Six', 'Five', 'Seven', 'Eight'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'Which is the largest planet in our solar system?', answers: ['Jupiter', 'Saturn', 'Earth', 'Neptune'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'How many degrees are in a full turn?', answers: ['360', '180', '270', '400'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'What is the chemical symbol for gold?', answers: ['Au', 'Ag', 'Fe', 'Go'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'About how long does Earth take to orbit the Sun once?', answers: ['365 days', '30 days', '180 days', '730 days'], correct: 0 },
  { category: 'GENERAL KNOWLEDGE', question: 'Which planet is closest to the Sun?', answers: ['Mercury', 'Venus', 'Earth', 'Mars'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'If $100 earns 5% simple interest for one year, how much interest is earned?', answers: ['$5', '$2', '$10', '$50'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'What is 10% of $80?', answers: ['$8', '$4', '$10', '$18'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'If S$1 equals US$0.75, how much is S$100 at that rate, before fees?', answers: ['US$75', 'US$25', 'US$100', 'US$125'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'What does compound interest include?', answers: ['Interest on the original amount and previously earned interest', 'Only the original amount', 'A fixed monthly account fee', 'Only the most recent deposit'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'What does a debit card usually use to pay for a purchase?', answers: ['Money in the linked bank account', 'A mortgage loan', 'A government grant', 'A cheque written by the shop'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'You receive an unexpected message asking for your banking password. What is the safest response?', answers: ['Do not share it; contact the bank through an official channel', 'Reply with the password to verify your account', 'Send the message to a colleague to try', 'Click the message link and enter your details'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'What does inflation generally mean for prices over time?', answers: ['The general price level rises', 'Every price falls to zero', 'Prices stay exactly the same', 'Only bank fees change'], correct: 0 },
  { category: 'BANKING & FINANCE', question: 'What does a personal budget help you track?', answers: ['Planned income and spending', 'The daily share price of every company', 'The exact future cost of all goods', 'Only cash kept at home'], correct: 0 },
];

if (TRIVIA.length !== 40 || TRIVIA.some((question) => (
  !Array.isArray(question.answers) || question.answers.length !== 4 ||
  new Set(question.answers).size !== 4 ||
  question.answers.some((answer) => typeof answer !== 'string' || !answer.trim()) ||
  !Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.answers.length
)) || new Set(TRIVIA.map((question) => question.question)).size !== TRIVIA.length) {
  throw new Error('Trivia bank must contain 40 unique questions with four unique answers and one valid correct-answer index each.');
}

const $ = (selector, root = document) => root.querySelector(selector);
const screens = {
  welcome: $('#welcome-screen'),
  dashboard: $('#dashboard-screen'),
  play: $('#play-screen'),
  completion: $('#completion-screen'),
};
let session = loadSession();
let activeCleanup = () => {};
let toastTimeout;
let soundEnabled = true;
let audioContext;
let leaderboardLoading = false;

function blankSession(nickname = '') {
  return { nickname, scores: {}, sessionId: makeId(), leaderboardSubmittedPlayerId: null };
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!saved || typeof saved.nickname !== 'string' || !saved.scores || typeof saved.scores !== 'object') return blankSession();
    const scores = {};
    for (const challenge of CHALLENGES) {
      const value = saved.scores[challenge.id];
      if (Number.isInteger(value) && value >= 0 && value <= 1000) scores[challenge.id] = value;
    }
    return {
      nickname: saved.nickname.slice(0, 16),
      scores,
      sessionId: saved.sessionId || makeId(),
      leaderboardSubmittedPlayerId: saved.leaderboardSubmittedPlayerId || null,
    };
  } catch {
    return blankSession();
  }
}

function saveSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = randomInt(index + 1);
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function totalScore() {
  return Object.values(session.scores).reduce((total, score) => total + score, 0);
}

function isComplete(id) {
  return Object.hasOwn(session.scores, id);
}

function renderChallengeCards(container, isWelcome = false) {
  container.innerHTML = CHALLENGES.map((challenge, index) => {
    const complete = isComplete(challenge.id);
    const score = session.scores[challenge.id];
    return `<article class="challenge-card ${challenge.color} ${complete ? 'is-complete' : ''}">
      <div class="card-topline"><span class="card-number">0${index + 1}</span><span class="card-status">${complete ? '✓ COMPLETE' : `MAX ${isWelcome ? '1,000 PTS' : '1,000'}`}</span></div>
      <div class="challenge-icon" aria-hidden="true">${challenge.icon}</div>
      <h3>${challenge.title}</h3><p>${challenge.description}</p>
      ${isWelcome ? '' : `<div class="card-footer"><span>${complete ? `YOUR SCORE <b>${score.toLocaleString()}</b>` : 'READY WHEN YOU ARE'}</span><button class="card-play" type="button" data-challenge="${challenge.id}" ${complete ? 'disabled aria-label="Challenge completed"' : `aria-label="Play ${challenge.title}"`}>${complete ? 'DONE' : 'PLAY'} <span aria-hidden="true">${complete ? '✓' : '↗'}</span></button></div>`}
    </article>`;
  }).join('');
}

function showScreen(name) {
  for (const [key, screen] of Object.entries(screens)) screen.hidden = key !== name;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startDashboard() {
  $('#dashboard-name').textContent = session.nickname.toUpperCase();
  renderChallengeCards($('#dashboard-challenges'));
  const done = Object.keys(session.scores).length;
  const score = totalScore();
  $('#total-score').textContent = score.toLocaleString();
  $('#progress-label').textContent = `${done} OF 5 COMPLETE`;
  $('#progress-bar').style.width = `${done * 20}%`;
  $('#progress-dots').innerHTML = CHALLENGES.map((challenge) => `<i class="${isComplete(challenge.id) ? 'done' : ''}"></i>`).join('');
  $('#medal-status').textContent = done === 5 ? 'CHAMPION CROWNED' : done ? `${5 - done} EVENT${done === 4 ? '' : 'S'} TO GO` : 'THE PODIUM AWAITS';
  showScreen('dashboard');
  void renderLeaderboard();
}

async function renderLeaderboard() {
  const list = $('#leaderboard-list');
  const status = $('#leaderboard-status');
  if (leaderboardLoading) return;
  leaderboardLoading = true;
  try {
    const entries = await leaderboardService.getEntries();
    status.textContent = 'Shared leaderboard · refreshes every 10 seconds.';
    status.classList.remove('leaderboard-error');
    if (!entries.length) {
      list.innerHTML = '<p class="empty-leaderboard">No completed scores yet. The first name on the board could be yours.</p>';
      return;
    }
    list.innerHTML = `<div class="leaderboard-row leaderboard-labels"><span>RANK</span><span>COMPETITOR</span><span>SCORE</span><span>DATE</span></div>${entries.map((entry, index) => {
      const date = new Date(entry.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      return `<div class="leaderboard-row ${entry.playerId === session.leaderboardSubmittedPlayerId ? 'current-player' : ''}"><span class="leaderboard-rank">${String(index + 1).padStart(2, '0')}</span><span class="leaderboard-player">${escapeHtml(entry.nickname)}</span><strong>${entry.score.toLocaleString()}</strong><time>${date}</time></div>`;
    }).join('')}`;
  } catch (error) {
    status.textContent = `Shared leaderboard unavailable: ${error.message || 'Could not connect to Supabase.'} It will retry automatically.`;
    status.classList.add('leaderboard-error');
  } finally {
    leaderboardLoading = false;
  }
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function playTone(frequency = 440, duration = 0.08, type = 'sine') {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext ||= new AudioContextClass();
    if (audioContext.state === 'suspended') void audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch {
    // Audio is an enhancement; gameplay remains available when it is blocked.
  }
}

function launchConfetti() {
  const canvas = $('#confetti-canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.scale(ratio, ratio);
  const colors = ['#d7ff36', '#ff7139', '#35c6ff', '#ffffff'];
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.5,
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    size: 4 + Math.random() * 6,
    spin: Math.random() * Math.PI,
    color: colors[randomInt(colors.length)],
  }));
  const started = performance.now();
  function draw(now) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.spin += 0.09;
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.spin);
      context.fillStyle = particle.color;
      context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.65);
      context.restore();
    }
    if (now - started < 2200) requestAnimationFrame(draw);
    else context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  requestAnimationFrame(draw);
}

function finishChallenge(id, score, details = '') {
  const challenge = CHALLENGES.find((item) => item.id === id);
  activeCleanup();
  activeCleanup = () => {};
  $('#challenge-stage').innerHTML = `<div class="challenge-result"><div class="result-mark" aria-hidden="true">✳</div><p class="eyebrow">EVENT COMPLETE</p><h2>${challenge.title}</h2><strong class="result-score">${score.toLocaleString()}<small> / 1,000 PTS</small></strong><p class="result-details">${details}</p><button class="button button-lime" id="save-challenge-score" type="button">SAVE SCORE & CONTINUE <span aria-hidden="true">↗</span></button></div>`;
  launchConfetti();
  playTone(740, 0.22, 'triangle');
  $('#save-challenge-score').addEventListener('click', () => {
    if (!isComplete(id)) {
      session.scores[id] = Math.max(0, Math.min(1000, Math.round(score)));
      saveSession();
    }
    if (Object.keys(session.scores).length === CHALLENGES.length) {
      void showCompletion();
    } else {
      startDashboard();
    }
  }, { once: true });
}

async function showCompletion() {
  $('#final-score').textContent = totalScore().toLocaleString();
  $('#final-score-list').innerHTML = CHALLENGES.map((challenge, index) => `<div><span><i>0${index + 1}</i> ${challenge.title}</span><b>${session.scores[challenge.id].toLocaleString()}</b></div>`).join('');
  const score = totalScore();
  $('#rank-title').textContent = score >= 4500 ? 'LEGEND OF THE GRILL' : score >= 3500 ? 'GOLD MEDAL MATERIAL' : score >= 2500 ? 'PODIUM CONTENDER' : score >= 1500 ? 'RISING COMPETITOR' : 'THE SPIRIT OF THE GAMES';
  showScreen('completion');
  launchConfetti();
  if (!session.leaderboardSubmittedPlayerId) await submitCompletionScore();
  else $('#completion-leaderboard-status').textContent = 'Your score has been submitted to the shared leaderboard.';
}

async function submitCompletionScore() {
  const status = $('#completion-leaderboard-status');
  const retryButton = $('#retry-score-submit');
  retryButton.hidden = true;
  retryButton.disabled = true;
  status.textContent = 'Submitting your score to the shared leaderboard…';
  status.classList.remove('leaderboard-error');

  try {
    const result = await leaderboardService.submitEntry({
      nickname: session.nickname,
      score: totalScore(),
      completedAt: Date.now(),
    });
    session.leaderboardSubmittedPlayerId = result.playerId;
    saveSession();
    status.textContent = 'Your score has been submitted to the shared leaderboard.';
  } catch (error) {
    const message = error.message || 'Could not submit your score to Supabase.';
    status.textContent = `Score submission failed: ${message}`;
    status.classList.add('leaderboard-error');
    retryButton.hidden = false;
    showToast(`Score submission failed: ${message}`);
  } finally {
    retryButton.disabled = false;
  }
}

function showGame(id) {
  if (isComplete(id)) return;
  activeCleanup();
  activeCleanup = () => {};
  const index = CHALLENGES.findIndex((challenge) => challenge.id === id);
  const challenge = CHALLENGES[index];
  $('#game-kicker').textContent = `EVENT 0${index + 1} · ${challenge.short}`;
  $('#game-title').textContent = challenge.title.toUpperCase();
  $('#game-instructions').textContent = challenge.instructions;
  showScreen('play');
  const stage = $('#challenge-stage');
  stage.className = `challenge-stage stage-${id}`;
  if (id === 'reaction') activeCleanup = startReaction(stage);
  if (id === 'memory') activeCleanup = startMemory(stage);
  if (id === 'grill') activeCleanup = startGrill(stage);
  if (id === 'penalty') activeCleanup = startPenalty(stage);
  if (id === 'trivia') activeCleanup = startTrivia(stage);
}

function startReaction(stage) {
  let attempts = 0;
  let falseStarts = 0;
  let reactions = [];
  let signalTimeout;
  let advanceTimeout;
  let state = 'ready';
  const maxAttempts = 5;
  stage.innerHTML = `<div class="reaction-game"><div class="reaction-meta"><span id="reaction-attempt">ATTEMPT 01 / 05</span><span>FALSE STARTS <b id="false-start-count">0</b></span></div><button id="reaction-signal" class="reaction-signal" type="button" aria-label="Wait for green, then tap"><span class="signal-light"></span><strong id="signal-copy">TAP TO START</strong><small id="signal-hint">Wait for the signal</small></button><div class="reaction-stats"><div><small>BEST REACTION</small><b id="reaction-best">--</b></div><div><small>AVERAGE</small><b id="reaction-average">--</b></div><div><small>ATTEMPTS LEFT</small><b id="reaction-left">05</b></div></div></div>`;
  const button = $('#reaction-signal', stage);
  const click = () => {
    if (state === 'ready') {
      state = 'waiting';
      attempts += 1;
      $('#reaction-attempt', stage).textContent = `ATTEMPT ${String(attempts).padStart(2, '0')} / 05`;
      $('#reaction-left', stage).textContent = String(maxAttempts - attempts).padStart(2, '0');
      button.classList.remove('is-green');
      button.classList.add('is-red');
      $('#signal-copy', stage).textContent = 'WAIT FOR GREEN';
      $('#signal-hint', stage).textContent = 'Too soon and this attempt is gone';
      signalTimeout = setTimeout(() => {
        if (state !== 'waiting') return;
        state = 'go';
        button.classList.remove('is-red');
        button.classList.add('is-green');
        $('#signal-copy', stage).textContent = 'TAP NOW!';
        $('#signal-hint', stage).textContent = 'GO GO GO';
        button.dataset.started = String(performance.now());
        playTone(880, 0.1, 'square');
      }, 2000 + Math.random() * 3000);
      return;
    }
    if (state === 'waiting') {
      clearTimeout(signalTimeout);
      falseStarts += 1;
      $('#false-start-count', stage).textContent = String(falseStarts);
      button.classList.remove('is-red');
      button.classList.add('is-false');
      $('#signal-copy', stage).textContent = 'FALSE START';
      $('#signal-hint', stage).textContent = 'Attempt used. Reset and focus.';
      playTone(160, 0.18, 'sawtooth');
      state = 'feedback';
      advanceTimeout = window.setTimeout(nextAttempt, 950);
      return;
    }
    if (state === 'go') {
      reactions.push(Math.round(performance.now() - Number(button.dataset.started)));
      button.classList.remove('is-green');
      button.classList.add('is-result');
      $('#signal-copy', stage).textContent = `${reactions.at(-1)} MS`;
      $('#signal-hint', stage).textContent = 'Nice reflexes';
      const best = Math.min(...reactions);
      const average = Math.round(reactions.reduce((sum, time) => sum + time, 0) / reactions.length);
      $('#reaction-best', stage).textContent = `${best} ms`;
      $('#reaction-average', stage).textContent = `${average} ms`;
      playTone(550, 0.08);
      state = 'feedback';
      advanceTimeout = window.setTimeout(nextAttempt, 950);
    }
  };
  function nextAttempt() {
    if (attempts >= maxAttempts) {
      const score = reactions.reduce((sum, time) => sum + Math.round(200 * Math.max(0, 1 - Math.max(0, time - 100) / 900)), 0);
      finishChallenge('reaction', score, `Best ${reactions.length ? `${Math.min(...reactions)} ms` : 'no valid reaction'} · Average ${reactions.length ? `${Math.round(reactions.reduce((sum, time) => sum + time, 0) / reactions.length)} ms` : '—'} · ${falseStarts} false start${falseStarts === 1 ? '' : 's'}.`);
      return;
    }
    state = 'ready';
    button.classList.remove('is-red', 'is-green', 'is-false', 'is-result');
    $('#signal-copy', stage).textContent = 'TAP TO START';
    $('#signal-hint', stage).textContent = 'Wait for the signal';
  }
  button.addEventListener('click', click);
  return () => { clearTimeout(signalTimeout); clearTimeout(advanceTimeout); };
}

function startMemory(stage) {
  let sequence = [];
  let round = 1;
  let inputIndex = 0;
  let accepting = false;
  let ended = false;
  let timer;
  let score = 0;
  stage.innerHTML = `<div class="memory-game"><div class="memory-progress" id="memory-progress"></div><div class="memory-board">${ICONS.map((icon, index) => `<button class="memory-pad pad-${index}" type="button" data-index="${index}" aria-label="${ICON_LABELS[index]}"><span>${icon}</span><small>${ICON_LABELS[index]}</small></button>`).join('')}</div><div class="memory-message" id="memory-message">Press start to begin round one.</div><button id="memory-start" class="button button-outline" type="button">START ROUND 1 <span aria-hidden="true">↗</span></button></div>`;
  const pads = [...stage.querySelectorAll('.memory-pad')];
  const message = $('#memory-message', stage);
  const startButton = $('#memory-start', stage);
  function updateProgress() {
    $('#memory-progress', stage).innerHTML = Array.from({ length: 5 }, (_, index) => `<i class="${index < round - 1 ? 'done' : index === round - 1 ? 'current' : ''}"></i>`).join('');
  }
  function flash(index) {
    pads[index].classList.add('lit');
    playTone([330, 390, 470, 560][index], 0.15, 'triangle');
    timer = setTimeout(() => pads[index].classList.remove('lit'), 370);
  }
  function playSequence() {
    accepting = false;
    inputIndex = 0;
    message.textContent = 'Watch closely…';
    startButton.disabled = true;
    sequence.forEach((value, index) => {
      timer = setTimeout(() => {
        if (!ended) flash(value);
        if (index === sequence.length - 1) timer = setTimeout(() => {
          if (ended) return;
          accepting = true;
          message.textContent = 'Your turn. Repeat the sequence.';
          startButton.textContent = 'YOUR TURN';
        }, 650);
      }, 720 * index + 500);
    });
  }
  function startRound() {
    if (ended) return;
    sequence = Array.from({ length: round + 2 }, () => randomInt(4));
    updateProgress();
    playSequence();
  }
  function pick(index) {
    if (!accepting || ended) return;
    flash(index);
    if (sequence[inputIndex] !== index) {
      ended = true;
      accepting = false;
      message.textContent = `Not quite. The sequence was ${sequence.map((item) => ICON_LABELS[item]).join(' · ')}.`;
      score = (round - 1) * 200;
      startButton.disabled = false;
      startButton.textContent = 'SEE YOUR SCORE';
      startButton.onclick = () => finishChallenge('memory', score, `${round - 1} of 5 rounds cleared. Each completed round is worth 200 points.`);
      return;
    }
    inputIndex += 1;
    if (inputIndex === sequence.length) {
      accepting = false;
      score += 200;
      playTone(720, 0.12, 'triangle');
      if (round === 5) {
        ended = true;
        message.textContent = 'Flawless memory. All five rounds cleared!';
        startButton.disabled = false;
        startButton.textContent = 'SEE YOUR SCORE';
        startButton.onclick = () => finishChallenge('memory', score, 'All five rounds cleared. Maximum score: 1,000 points.');
      } else {
        round += 1;
        startButton.disabled = false;
        startButton.textContent = `ROUND ${round}: PLAY SEQUENCE`;
        message.textContent = 'Round clear! The next sequence is longer.';
      }
    }
  }
  pads.forEach((pad) => pad.addEventListener('click', () => pick(Number(pad.dataset.index))));
  startButton.addEventListener('click', () => {
    if (ended) return;
    if (round === 1 && sequence.length === 0) startRound();
    else startRound();
  });
  updateProgress();
  return () => { ended = true; clearTimeout(timer); };
}

function startGrill(stage) {
  let round = 1;
  let roundItems = [];
  let totalPoints = 0;
  let interval;
  let waitingToContinue = false;
  stage.innerHTML = `<div class="grill-game"><div class="grill-toolbar"><div id="grill-round">ROUND 1 / 3</div><div>PERFECT SERVE <b id="grill-score">0</b></div></div><div class="grill-smoke" aria-hidden="true"><i></i><i></i><i></i></div><div class="grill-top"><span>LIVE FROM THE GRILL</span><span id="grill-round-status">3 ITEMS ON THE HEAT</span></div><div class="food-row" id="food-row"></div><div class="grill-feedback" id="grill-feedback">Tap each item at its golden moment.</div><button id="grill-next" class="button button-outline" type="button" hidden></button></div>`;
  const foodTypes = [
    { icon: '🍔', name: 'Burger', className: 'burger' },
    { icon: '🌭', name: 'Hot dog', className: 'hotdog' },
    { icon: '🥩', name: 'Steak', className: 'steak' },
  ];
  function beginRound() {
    waitingToContinue = false;
    $('#grill-next', stage).hidden = true;
    $('#grill-round', stage).textContent = `ROUND ${round} / 3`;
    $('#grill-round-status', stage).textContent = '3 ITEMS ON THE HEAT';
    $('#grill-feedback', stage).textContent = 'Tap each item at its golden moment.';
    roundItems = foodTypes.map((food, index) => ({ ...food, index, maxPoints: round === 1 && index === 0 ? 112 : 111, target: 4.4 + Math.random() * 2.2, removed: false, started: performance.now(), result: '' }));
    $('#food-row', stage).innerHTML = roundItems.map((food) => `<button type="button" class="food-item ${food.className}" data-food="${food.index}" aria-label="Remove ${food.name} from grill"><span class="food-emoji">${food.icon}</span><b>${food.name}</b><span class="cook-track"><i></i></span><small>ON THE HEAT</small></button>`).join('');
    $('#food-row', stage).querySelectorAll('.food-item').forEach((button) => button.addEventListener('click', () => removeFood(Number(button.dataset.food))));
    clearInterval(interval);
    interval = setInterval(updateFood, 100);
  }
  function updateFood() {
    const now = performance.now();
    for (const food of roundItems) {
      if (food.removed) continue;
      const elapsed = (now - food.started) / 1000;
      const limit = food.target + 2.8;
      const item = $(`[data-food="${food.index}"]`, stage);
      if (!item) continue;
      item.querySelector('.cook-track i').style.width = `${Math.min(100, elapsed / limit * 100)}%`;
      item.classList.toggle('is-smoking', elapsed >= food.target);
      item.classList.toggle('is-burnt', elapsed > limit);
      item.querySelector('small').textContent = elapsed < food.target * 0.62 ? 'WARMING UP' : elapsed < food.target ? 'ALMOST THERE' : elapsed <= food.target + 0.3 ? 'PERFECT NOW!' : elapsed <= limit ? 'GET IT OFF!' : 'BURNT';
    }
  }
  function removeFood(index) {
    const food = roundItems[index];
    if (!food || food.removed || waitingToContinue) return;
    food.removed = true;
    const elapsed = (performance.now() - food.started) / 1000;
    const delta = Math.abs(elapsed - food.target);
    const points = Math.round(food.maxPoints * Math.max(0, 1 - delta / 3));
    totalPoints += points;
    food.result = elapsed < food.target - 0.55 ? 'UNDERCOOKED' : elapsed > food.target + 1.5 ? 'BURNT' : delta <= 0.55 ? 'PERFECT' : elapsed < food.target ? 'A LITTLE RARE' : 'A LITTLE LATE';
    const item = $(`[data-food="${index}"]`, stage);
    item.disabled = true;
    item.classList.add('is-removed', food.result === 'PERFECT' ? 'is-perfect' : food.result === 'BURNT' || food.result === 'UNDERCOOKED' ? 'is-miss' : 'is-close');
    item.querySelector('small').textContent = `${food.result} · ${points} PTS`;
    $('#grill-score', stage).textContent = String(Math.min(1000, totalPoints));
    playTone(food.result === 'PERFECT' ? 660 : 260, 0.09, 'triangle');
    const remaining = roundItems.filter((entry) => !entry.removed).length;
    $('#grill-round-status', stage).textContent = `${remaining} ITEM${remaining === 1 ? '' : 'S'} LEFT`;
    if (remaining) $('#grill-feedback', stage).textContent = `${food.name}: ${food.result.toLowerCase()}. ${remaining} still cooking.`;
    else {
      clearInterval(interval);
      waitingToContinue = true;
      if (round === 3) {
        const score = Math.min(1000, totalPoints);
        $('#grill-feedback', stage).textContent = 'Last plate served. The judges have their scores.';
        finishChallenge('grill', score, 'Three rounds, nine items. Points are based on how close each removal was to its perfect moment.');
      } else {
        $('#grill-feedback', stage).textContent = `Round ${round} plated. Ready for the next heat?`;
        const nextButton = $('#grill-next', stage);
        nextButton.hidden = false;
        nextButton.textContent = `START ROUND ${round + 1} ↗`;
        nextButton.onclick = () => { round += 1; beginRound(); };
      }
    }
  }
  beginRound();
  return () => clearInterval(interval);
}

const ZONES = [
  { id: 'top-left', label: 'Top left', x: '17%', y: '18%', keeperX: '18%', top: true, rotation: '-28deg' },
  { id: 'top-centre', label: 'Top centre', x: '50%', y: '18%', keeperX: '50%', top: true, rotation: '0deg' },
  { id: 'top-right', label: 'Top right', x: '83%', y: '18%', keeperX: '82%', top: true, rotation: '28deg' },
  { id: 'bottom-left', label: 'Bottom left', x: '17%', y: '70%', keeperX: '18%', top: false, rotation: '-35deg' },
  { id: 'bottom-centre', label: 'Bottom centre', x: '50%', y: '70%', keeperX: '50%', top: false, rotation: '0deg' },
  { id: 'bottom-right', label: 'Bottom right', x: '83%', y: '70%', keeperX: '82%', top: false, rotation: '35deg' },
];

function startPenalty(stage) {
  let shot = 0;
  let goals = 0;
  let shooting = false;
  let ended = false;
  let resetTimer;
  stage.innerHTML = `<div class="penalty-game"><div class="penalty-scoreboard"><span id="shot-label">SHOT 1 / 5</span><span>GOALS <b id="goal-count">0</b></span></div><div class="stadium-scene"><div class="stadium-lights" aria-hidden="true"></div><div class="crowd" aria-hidden="true"></div><div class="goal-frame"><div class="goal-net" aria-hidden="true"></div><div class="keeper" id="keeper"><span class="keeper-head"></span><span class="keeper-body"></span><span class="keeper-arm keeper-arm-left"></span><span class="keeper-arm keeper-arm-right"></span><span class="keeper-glove glove-left"></span><span class="keeper-glove glove-right"></span><span class="keeper-leg leg-left"></span><span class="keeper-leg leg-right"></span></div><div class="football" id="football" aria-hidden="true">⚽</div></div><div class="pitch-mark" aria-hidden="true"></div></div><p class="penalty-feedback" id="penalty-feedback">Pick your spot.</p><div class="shooting-zones">${ZONES.map((zone) => `<button type="button" data-zone="${zone.id}">${zone.label}</button>`).join('')}</div></div>`;
  const keeper = $('#keeper', stage);
  const ball = $('#football', stage);
  const feedback = $('#penalty-feedback', stage);
  function shoot(zoneId) {
    if (shooting || ended) return;
    shooting = true;
    shot += 1;
    const target = ZONES.find((zone) => zone.id === zoneId);
    const dive = ZONES[randomInt(ZONES.length)];
    const saved = target.id === dive.id;
    $('#shot-label', stage).textContent = `SHOT ${shot} / 5`;
    stage.querySelectorAll('.shooting-zones button').forEach((button) => { button.disabled = true; });
    keeper.classList.remove('keeper-top', 'diving');
    keeper.style.setProperty('--keeper-x', '50%');
    keeper.style.setProperty('--keeper-rotation', '0deg');
    ball.classList.remove('in-flight');
    ball.style.setProperty('--target-x', target.x);
    ball.style.setProperty('--target-y', target.y);
    void ball.offsetWidth;
    requestAnimationFrame(() => {
      keeper.style.setProperty('--keeper-x', dive.keeperX);
      keeper.style.setProperty('--keeper-rotation', dive.rotation);
      if (dive.top) keeper.classList.add('keeper-top');
      keeper.classList.add('diving');
      ball.classList.add('in-flight');
    });
    feedback.textContent = 'SHOT!';
    resetTimer = setTimeout(() => {
      if (saved) {
        feedback.textContent = 'SAVED! The keeper read that one.';
        playTone(190, 0.18, 'sawtooth');
      } else {
        goals += 1;
        $('#goal-count', stage).textContent = String(goals);
        feedback.textContent = 'GOAL! What a finish.';
        playTone(780, 0.2, 'triangle');
      }
      resetTimer = setTimeout(() => {
        keeper.classList.remove('diving', 'keeper-top');
        keeper.style.setProperty('--keeper-x', '50%');
        keeper.style.setProperty('--keeper-rotation', '0deg');
        ball.classList.remove('in-flight');
        if (shot === 5) {
          ended = true;
          resetTimer = setTimeout(() => finishChallenge('penalty', goals * 200, `${goals} goal${goals === 1 ? '' : 's'} from 5 shots. Each goal is worth 200 points.`), 500);
          return;
        }
        stage.querySelectorAll('.shooting-zones button').forEach((button) => { button.disabled = false; });
        shooting = false;
        $('#shot-label', stage).textContent = `SHOT ${shot + 1} / 5`;
        feedback.textContent = 'Pick your next spot.';
      }, 780);
    }, 950);
  }
  stage.querySelectorAll('.shooting-zones button').forEach((button) => button.addEventListener('click', () => shoot(button.dataset.zone)));
  return () => clearTimeout(resetTimer);
}

function startTrivia(stage) {
  const questions = shuffle(TRIVIA).slice(0, 5).map((question) => {
    const answerOptions = shuffle(question.answers.map((answer, index) => ({ answer, correct: index === question.correct })));
    return { ...question, answers: answerOptions.map((option) => option.answer), correct: answerOptions.findIndex((option) => option.correct) };
  });
  let questionIndex = 0;
  let score = 0;
  let seconds = 10;
  let timer;
  let answered = false;
  let ended = false;
  stage.innerHTML = `<div class="trivia-game"><div class="trivia-toolbar"><span id="trivia-step">QUESTION 01 / 05</span><span class="trivia-clock"><i>◷</i> <b id="trivia-time">10</b><small>SEC</small></span></div><div class="trivia-progress"><i id="trivia-progress"></i></div><div id="trivia-question"></div><div id="trivia-feedback" class="trivia-feedback" aria-live="polite"></div><button id="trivia-next" class="button button-lime" type="button" hidden>NEXT QUESTION <span aria-hidden="true">↗</span></button></div>`;
  function renderQuestion() {
    answered = false;
    seconds = 10;
    const question = questions[questionIndex];
    $('#trivia-step', stage).textContent = `QUESTION ${String(questionIndex + 1).padStart(2, '0')} / 05`;
    $('#trivia-time', stage).textContent = '10';
    $('#trivia-progress', stage).style.width = `${questionIndex * 20}%`;
    $('#trivia-feedback', stage).textContent = '';
    $('#trivia-next', stage).hidden = true;
    $('#trivia-question', stage).innerHTML = `<p class="trivia-category">${question.category}</p><h2>${question.question}</h2><div class="answer-list">${question.answers.map((answer, index) => `<button type="button" class="answer-option" data-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('')}</div>`;
    stage.querySelectorAll('.answer-option').forEach((button) => button.addEventListener('click', () => answerQuestion(Number(button.dataset.answer))));
    clearInterval(timer);
    timer = setInterval(() => {
      if (answered || ended) return;
      seconds = Math.max(0, seconds - 0.1);
      $('#trivia-time', stage).textContent = String(Math.ceil(seconds));
      if (seconds <= 0) answerQuestion(-1);
    }, 100);
  }
  function answerQuestion(answer) {
    if (answered || ended) return;
    answered = true;
    clearInterval(timer);
    const question = questions[questionIndex];
    const correct = answer === question.correct;
    const buttons = [...stage.querySelectorAll('.answer-option')];
    buttons.forEach((button) => {
      button.disabled = true;
      if (Number(button.dataset.answer) === question.correct) button.classList.add('answer-correct');
      else if (Number(button.dataset.answer) === answer) button.classList.add('answer-wrong');
    });
    const points = correct ? 100 + Math.floor((Math.max(0, seconds) / 10) * 100) : 0;
    score += points;
    const feedback = $('#trivia-feedback', stage);
    const correctAnswer = escapeHtml(question.answers[question.correct]);
    feedback.innerHTML = correct
      ? `<b>Correct. +${points} points.</b> ${seconds > 7 ? 'Lightning quick!' : 'Well played.'} Correct answer: <b>${correctAnswer}</b>.`
      : `<b>${answer === -1 ? 'Time.' : 'Not this time.'}</b> Correct answer: <b>${correctAnswer}</b>.`;
    playTone(correct ? 650 : 210, 0.12, correct ? 'triangle' : 'sawtooth');
    const next = $('#trivia-next', stage);
    next.hidden = false;
    next.textContent = questionIndex === 4 ? 'SEE YOUR SCORE' : 'NEXT QUESTION ↗';
    next.onclick = () => {
      if (questionIndex === 4) {
        ended = true;
        $('#trivia-progress', stage).style.width = '100%';
        finishChallenge('trivia', score, 'Five questions. Correct answers are worth 100–200 points based on speed.');
      } else {
        questionIndex += 1;
        renderQuestion();
      }
    };
  }
  renderQuestion();
  return () => { ended = true; clearInterval(timer); };
}

async function shareResult() {
  const summary = `BBQ Olympics 2026: ${session.nickname} scored ${totalScore().toLocaleString()} / 5,000 points!`;
  if (navigator.share) {
    try { await navigator.share({ title: 'BBQ Olympics 2026', text: summary }); } catch (error) {
      if (error.name !== 'AbortError') showToast('Could not open the share sheet.');
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(summary);
    showToast('Result copied to clipboard.');
  } catch {
    const helper = document.createElement('textarea');
    helper.value = summary;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand('copy');
    helper.remove();
    showToast(copied ? 'Result copied to clipboard.' : summary);
  }
}

function boot() {
  renderChallengeCards($('#welcome-challenges'), true);
  $('#nickname').value = session.nickname;
  if (session.nickname && Object.keys(session.scores).length === CHALLENGES.length) void showCompletion();
  else if (session.nickname) startDashboard();
  else showScreen('welcome');

  $('#start-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const nickname = $('#nickname').value.trim().slice(0, 16);
    if (!nickname) {
      $('#nickname').focus();
      return;
    }
    session.nickname = nickname;
    saveSession();
    startDashboard();
    playTone(540, 0.1, 'triangle');
  });
  $('#dashboard-challenges').addEventListener('click', (event) => {
    const button = event.target.closest('[data-challenge]');
    if (button && !button.disabled) showGame(button.dataset.challenge);
  });
  $('#back-to-hub').addEventListener('click', () => {
    activeCleanup();
    activeCleanup = () => {};
    startDashboard();
  });
  $('#reset-session').addEventListener('click', () => $('#reset-dialog').showModal());
  $('#reset-dialog').addEventListener('close', () => {
    if ($('#reset-dialog').returnValue !== 'reset') return;
    activeCleanup();
    session = blankSession();
    saveSession();
    $('#nickname').value = '';
    renderChallengeCards($('#welcome-challenges'), true);
    showScreen('welcome');
  });
  $('#play-again').addEventListener('click', () => {
    session = blankSession(session.nickname);
    saveSession();
    startDashboard();
  });
  $('#completion-hub').addEventListener('click', startDashboard);
  $('#retry-score-submit').addEventListener('click', () => void submitCompletionScore());
  $('#share-result').addEventListener('click', () => void shareResult());
  $('#sound-toggle').addEventListener('click', (event) => {
    soundEnabled = !soundEnabled;
    event.currentTarget.classList.toggle('muted', !soundEnabled);
    event.currentTarget.setAttribute('aria-label', soundEnabled ? 'Turn sound off' : 'Turn sound on');
    event.currentTarget.title = soundEnabled ? 'Sound on' : 'Sound off';
    if (soundEnabled) playTone(600, 0.08);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#reset-dialog').open && !screens.play.hidden) {
      activeCleanup();
      activeCleanup = () => {};
      startDashboard();
    }
  });
  window.setInterval(() => {
    if (!screens.dashboard.hidden) void renderLeaderboard();
  }, 10_000);
}

boot();
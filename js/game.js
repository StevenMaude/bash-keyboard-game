/**
 * game.js — orchestrates the UI and connects it to BashLineEditor.
 * Loaded as an ES module from index.html.
 *
 * Two game modes:
 *   practice — 8 random challenges from all collections (original behaviour)
 *   learn    — structured walk through every collection in order, with a
 *              per-collection completion overlay between collections
 *
 * Browser keybinding notes:
 *   Ctrl+W closes the browser tab and CANNOT be intercepted by JavaScript.
 *   Players should use Alt+Backspace (identical readline behaviour) instead.
 *   Ctrl+T may open a new tab; the game labels affected challenges clearly.
 *   The keydown listener is attached to `window` in the capture phase so it
 *   fires as early as possible, which prevents Ctrl+F (browser find) and
 *   other page-level shortcuts from interfering.
 */

import { BashLineEditor } from './shortcuts.js';
import { COLLECTIONS, selectChallenges } from './challenges.js';
import { calcProgress, getRating, renderStars } from './utils.js';

// ── Constants ─────────────────────────────────────────────────────────────────
const PRACTICE_CHALLENGES = 8;

// ── DOM helpers ──────────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

// ── Game State ────────────────────────────────────────────────────────────────
let gameMode        = 'practice'; // 'practice' | 'learn'
let challenges      = [];
let currentIndex    = 0;
let keypresses      = 0;
let totalKeypresses = 0;
let editor          = null;
let challengeKeypresses = [];
// learn-mode extras
let currentCollectionIdx = 0;

// ── Screen management ─────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(id);
  if (el) el.classList.add('active');
}

// ── Practice mode start ───────────────────────────────────────────────────────
function startPractice() {
  gameMode = 'practice';
  challenges = selectChallenges(PRACTICE_CHALLENGES);
  currentIndex = 0;
  totalKeypresses = 0;
  challengeKeypresses = [];
  showScreen('screen-game');
  updateCollectionBadge(null);
  loadChallenge(0);
}

// ── Learn mode start ──────────────────────────────────────────────────────────
function startLearn() {
  gameMode = 'learn';
  currentCollectionIdx = 0;
  beginCollection(0);
}

function beginCollection(idx) {
  currentCollectionIdx = idx;
  challenges = COLLECTIONS[idx].challenges;
  currentIndex = 0;
  totalKeypresses = 0;
  challengeKeypresses = [];
  showScreen('screen-game');
  updateCollectionBadge(COLLECTIONS[idx]);
  loadChallenge(0);
}

function updateCollectionBadge(collection) {
  const badge = $('collection-badge');
  const track = $('collection-track');
  if (!badge) return;
  if (!collection) {
    badge.textContent = '';
    badge.classList.add('hidden');
    if (track) track.textContent = '';
    return;
  }
  badge.textContent = collection.name;
  badge.classList.remove('hidden');
  if (track) {
    track.textContent =
      `Collection ${currentCollectionIdx + 1} / ${COLLECTIONS.length}`;
  }
}

// ── Challenge loader ──────────────────────────────────────────────────────────
function loadChallenge(index) {
  const challenge = challenges[index];
  keypresses = 0;

  editor = new BashLineEditor(challenge.initial);

  $('challenge-num').textContent   = index + 1;
  $('challenge-total').textContent = challenges.length;
  $('challenge-title').textContent = challenge.title;
  $('challenge-description').textContent = challenge.description;
  $('target-display').textContent  = challenge.target;
  $('challenge-hint').textContent  = challenge.hint;
  $('target-keys').textContent     = challenge.optimalKeys;
  $('keypress-count').textContent  = '0';

  renderInputDiff(challenge.initial, challenge.target);

  const ta = $('command-input');
  ta.value = challenge.initial;
  ta.setSelectionRange(editor.cursor, editor.cursor);
  ta.focus();

  updateProgressBar(challenge.initial, challenge.target, challenge.initial);
  $('overlay-success').classList.add('hidden');
  $('overlay-collection').classList.add('hidden');
}

// ── Diff rendering in the editable area ──────────────────────────────────────
function renderInputDiff(currentText, target) {
  const display = $('command-display');
  if (!display) return;

  const cursorPos = editor ? editor.cursor : 0;
  const before = currentText.slice(0, cursorPos);
  const after  = currentText.slice(cursorPos);

  let html = '';
  let charIdx = 0;

  for (const seg of [before, after]) {
    for (let i = 0; i < seg.length; i++) {
      const c = seg[i];
      const t = target[charIdx];
      let cls = (charIdx < target.length && c === t) ? 'char-ok' : 'char-extra';
      html += `<span class="${cls}">${escHtml(c)}</span>`;
      charIdx++;
    }
    if (seg === before) {
      html += '<span class="cursor-caret">|</span>';
    }
  }
  for (let i = currentText.length; i < target.length; i++) {
    html += `<span class="char-missing">·</span>`;
  }

  display.innerHTML = html;
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;');
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function updateProgressBar(current, target, initial) {
  const pct = Math.round(calcProgress(current, target, initial) * 100);
  const bar = $('progress-bar');
  const pctEl = $('progress-pct');
  if (bar) bar.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct;
}

// ── Keypress handler ──────────────────────────────────────────────────────────
function handleKeyDown(event) {
  if (!editor) return;

  // Only intercept when the game screen is active
  if (!$('screen-game').classList.contains('active')) return;

  const { key, ctrlKey, altKey, metaKey, shiftKey } = event;

  // Allow browser devtools
  if (key === 'F12') return;

  // Ctrl+W closes the browser tab and cannot be intercepted.
  // Remind the player to use Alt+Backspace instead (same readline action).
  if (ctrlKey && key.toLowerCase() === 'w') {
    // We cannot preventDefault() this — the tab will close.
    // Let the browser handle it; the game has already explained the alternative.
    return;
  }

  const handled = editor.handleKey(key, ctrlKey, altKey, metaKey, shiftKey);

  if (handled) {
    event.preventDefault();
    keypresses++;
    $('keypress-count').textContent = keypresses;

    const ta = $('command-input');
    ta.value = editor.text;
    ta.setSelectionRange(editor.cursor, editor.cursor);

    const challenge = challenges[currentIndex];
    renderInputDiff(editor.text, challenge.target);
    updateProgressBar(editor.text, challenge.target, challenge.initial);

    if (editor.text === challenge.target) {
      finishChallenge();
    }
  }
}

// ── Challenge completion ──────────────────────────────────────────────────────
function finishChallenge() {
  const challenge = challenges[currentIndex];
  totalKeypresses += keypresses;
  challengeKeypresses.push(keypresses);

  const rating = getRating(keypresses, challenge.optimalKeys);

  $('success-keypresses').textContent = keypresses;
  $('success-optimal').textContent    = challenge.optimalKeys;
  $('success-stars').textContent      = renderStars(rating.stars);
  $('success-rating').textContent     = rating.label;

  $('overlay-success').classList.remove('hidden');
}

// ── Next challenge / collection / end ─────────────────────────────────────────
function nextChallenge() {
  $('overlay-success').classList.add('hidden');
  currentIndex++;

  if (currentIndex >= challenges.length) {
    if (gameMode === 'learn') {
      showCollectionComplete();
    } else {
      showEndScreen();
    }
  } else {
    loadChallenge(currentIndex);
  }
}

// ── Collection complete (learn mode) ─────────────────────────────────────────
function showCollectionComplete() {
  const finishedCollection = COLLECTIONS[currentCollectionIdx];
  const nextIdx = currentCollectionIdx + 1;
  const isLastCollection = nextIdx >= COLLECTIONS.length;

  $('coll-complete-name').textContent = finishedCollection.name;
  $('coll-complete-score').textContent = totalKeypresses;

  if (isLastCollection) {
    $('coll-next-label').textContent = "You've completed all collections!";
    $('btn-next-collection').textContent = '🎓 See Final Results';
  } else {
    const nextCollection = COLLECTIONS[nextIdx];
    $('coll-next-label').textContent = `Up next: ${nextCollection.name} — ${nextCollection.shortcut}`;
    $('btn-next-collection').textContent = 'Next Collection →';
  }

  $('overlay-collection').classList.remove('hidden');
}

function advanceCollection() {
  $('overlay-collection').classList.add('hidden');
  const nextIdx = currentCollectionIdx + 1;
  if (nextIdx >= COLLECTIONS.length) {
    showEndScreen();
  } else {
    beginCollection(nextIdx);
  }
}

// ── End screen ────────────────────────────────────────────────────────────────
function showEndScreen() {
  showScreen('screen-end');

  const grandTotal = gameMode === 'learn'
    ? COLLECTIONS.slice(0, currentCollectionIdx + 1)
        .flatMap(c => c.challenges)
        .length
    : challenges.length;

  $('final-score').textContent       = totalKeypresses;
  $('final-challenges').textContent  = grandTotal;

  const list = $('challenge-summary');
  if (list) {
    list.innerHTML = challenges
      .map((ch, i) => {
        const kp = challengeKeypresses[i];
        if (kp === undefined) return '';
        const rating = getRating(kp, ch.optimalKeys);
        return `<li>
          <span class="summary-title">${ch.title}</span>
          <span class="summary-keys">${kp} keys</span>
          <span class="summary-stars">${renderStars(rating.stars)}</span>
        </li>`;
      })
      .join('');
  }
}

// ── How-to-play shortcut table ────────────────────────────────────────────────
const SHORTCUT_TABLE = [
  ['Ctrl+A',           'Move to beginning of line'],
  ['Ctrl+E',           'Move to end of line'],
  ['Ctrl+F / →',       'Move forward one character'],
  ['Ctrl+B / ←',       'Move backward one character'],
  ['Alt+F',            'Move forward one word'],
  ['Alt+B',            'Move backward one word'],
  ['Backspace',        'Delete character before cursor'],
  ['Ctrl+D',           'Delete character at cursor'],
  ['Ctrl+K',           'Kill (cut) to end of line'],
  ['Ctrl+U',           'Kill from start to cursor'],
  ['Alt+Backspace',    'Kill word backward (whitespace boundary)'],
  ['Alt+D',            'Kill word forward (alphanumeric boundary)'],
  ['Ctrl+Y',           'Yank (paste) last killed text'],
  ['Ctrl+T',           'Transpose characters around cursor'],
];

function buildShortcutTable() {
  const tbody = $('shortcut-tbody');
  if (!tbody) return;
  tbody.innerHTML = SHORTCUT_TABLE.map(([k, d]) => `
    <tr>
      <td><kbd>${k}</kbd></td>
      <td>${d}</td>
    </tr>`).join('');
}

// ── Textarea input guard ──────────────────────────────────────────────────────
function handleInput() {
  if (!editor) return;
  const ta = $('command-input');
  ta.value = editor.text;
  ta.setSelectionRange(editor.cursor, editor.cursor);
}

// ── Initialisation ────────────────────────────────────────────────────────────
function init() {
  buildShortcutTable();

  // Landing buttons
  $('btn-learn').addEventListener('click', startLearn);
  $('btn-practice').addEventListener('click', startPractice);
  $('btn-how-to').addEventListener('click', () => showScreen('screen-howto'));
  $('btn-back-from-howto').addEventListener('click', () => showScreen('screen-landing'));

  // Game buttons
  $('btn-next').addEventListener('click', nextChallenge);
  $('btn-skip').addEventListener('click', nextChallenge);

  // Collection-complete overlay
  $('btn-next-collection').addEventListener('click', advanceCollection);

  // End screen
  $('btn-restart').addEventListener('click', () => showScreen('screen-landing'));
  $('btn-howto-end').addEventListener('click', () => showScreen('screen-howto'));

  // Textarea input guard (prevents browser autocomplete/paste interference)
  $('command-input').addEventListener('input', handleInput);

  // ── Global keydown handler (capture phase) ──────────────────────────────
  // Attaching to `window` in the capture phase lets us call preventDefault()
  // before browser default actions (e.g. Ctrl+F search, Ctrl+D bookmark).
  // Ctrl+W (close tab) and Ctrl+T (new tab) are handled at the browser
  // process level and CANNOT be prevented regardless of phase.
  window.addEventListener('keydown', handleKeyDown, { capture: true });

  showScreen('screen-landing');
}

document.addEventListener('DOMContentLoaded', init);

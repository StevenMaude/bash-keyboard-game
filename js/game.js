/**
 * game.js — orchestrates the UI and connects it to BashLineEditor.
 * Loaded as an ES module from index.html.
 */

import { BashLineEditor } from './shortcuts.js';
import { selectChallenges } from './challenges.js';
import { calcProgress, getRating, renderStars } from './utils.js';

// ── Constants ─────────────────────────────────────────────────────────────────
const CHALLENGES_PER_GAME = 8;

// ── DOM helpers ──────────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

// ── Game State ────────────────────────────────────────────────────────────────
let challenges = [];
let currentIndex = 0;
let keypresses = 0;
let totalKeypresses = 0;
let editor = null;
let challengeKeypresses = [];

// ── Screen management ─────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(id);
  if (el) el.classList.add('active');
}

// ── Game start ────────────────────────────────────────────────────────────────
function startGame() {
  challenges = selectChallenges(CHALLENGES_PER_GAME);
  currentIndex = 0;
  totalKeypresses = 0;
  challengeKeypresses = [];
  showScreen('screen-game');
  loadChallenge(currentIndex);
}

// ── Challenge loader ──────────────────────────────────────────────────────────
function loadChallenge(index) {
  const challenge = challenges[index];
  keypresses = 0;

  // Initialise editor with the starting text, cursor at end
  editor = new BashLineEditor(challenge.initial);

  // Update UI
  $('challenge-num').textContent   = index + 1;
  $('challenge-total').textContent = challenges.length;
  $('challenge-title').textContent = challenge.title;
  $('challenge-description').textContent = challenge.description;
  $('target-display').textContent  = challenge.target;
  $('challenge-hint').textContent  = challenge.hint;
  $('target-keys').textContent     = challenge.optimalKeys;
  $('keypress-count').textContent  = '0';

  // Show the initial text diff decorations
  renderInputDiff(challenge.initial, challenge.target);

  // Sync the hidden textarea
  const ta = $('command-input');
  ta.value = challenge.initial;
  ta.setSelectionRange(editor.cursor, editor.cursor);
  ta.focus();

  updateProgressBar(challenge.initial, challenge.target, challenge.initial);
  $('overlay-success').classList.add('hidden');
}

// ── Diff rendering in the editable area ──────────────────────────────────────
/**
 * Render the current editor text into the visible command display,
 * colour-coding characters that match / differ from the target.
 */
function renderInputDiff(currentText, target) {
  const display = $('command-display');
  if (!display) return;

  // Simple char-by-char colouring
  let html = '';
  const maxLen = Math.max(currentText.length, target.length);
  for (let i = 0; i < maxLen; i++) {
    const c = currentText[i];
    const t = target[i];
    if (c === undefined) {
      // Missing characters (need to add)
      html += `<span class="char-missing">·</span>`;
    } else if (t === undefined) {
      // Extra characters (need to remove)
      html += `<span class="char-extra">${escHtml(c)}</span>`;
    } else if (c === t) {
      html += `<span class="char-ok">${escHtml(c)}</span>`;
    } else {
      html += `<span class="char-wrong">${escHtml(c)}</span>`;
    }
  }

  // Add cursor indicator
  const cursorPos = editor ? editor.cursor : 0;
  // Insert cursor marker into the plain text and re-render
  const before = currentText.slice(0, cursorPos);
  const after  = currentText.slice(cursorPos);

  // Rebuild with cursor
  let htmlWithCursor = '';
  let charIdx = 0;
  for (const seg of [before, after]) {
    for (let i = 0; i < seg.length; i++) {
      const c = seg[i];
      const t = target[charIdx];
      let cls = c === t ? 'char-ok' : 'char-extra';
      if (charIdx >= target.length) cls = 'char-extra';
      htmlWithCursor += `<span class="${cls}">${escHtml(c)}</span>`;
      charIdx++;
    }
    if (seg === before) {
      htmlWithCursor += '<span class="cursor-caret">|</span>';
    }
  }
  // Fill in missing chars after current text
  for (let i = currentText.length; i < target.length; i++) {
    htmlWithCursor += `<span class="char-missing">·</span>`;
  }

  display.innerHTML = htmlWithCursor;
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

  const { key, ctrlKey, altKey, metaKey, shiftKey } = event;

  // Allow browser devtools shortcuts to pass through
  if (key === 'F12') return;

  const handled = editor.handleKey(key, ctrlKey, altKey, metaKey, shiftKey);

  if (handled) {
    event.preventDefault();
    keypresses++;
    $('keypress-count').textContent = keypresses;

    // Sync textarea
    const ta = $('command-input');
    ta.value = editor.text;
    ta.setSelectionRange(editor.cursor, editor.cursor);

    const challenge = challenges[currentIndex];
    renderInputDiff(editor.text, challenge.target);
    updateProgressBar(editor.text, challenge.target, challenge.initial);

    // Check completion
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

// ── Next challenge / end ──────────────────────────────────────────────────────
function nextChallenge() {
  currentIndex++;
  if (currentIndex >= challenges.length) {
    showEndScreen();
  } else {
    loadChallenge(currentIndex);
  }
}

function showEndScreen() {
  showScreen('screen-end');
  $('final-score').textContent = totalKeypresses;

  // Build per-challenge summary
  const list = $('challenge-summary');
  if (list) {
    list.innerHTML = challenges
      .map((ch, i) => {
        const kp = challengeKeypresses[i];
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

// ── How-to-play ───────────────────────────────────────────────────────────────
const SHORTCUT_TABLE = [
  ['Ctrl+A',     'Move to beginning of line'],
  ['Ctrl+E',     'Move to end of line'],
  ['Ctrl+F / →', 'Move forward one character'],
  ['Ctrl+B / ←', 'Move backward one character'],
  ['Alt+F',      'Move forward one word'],
  ['Alt+B',      'Move backward one word'],
  ['Backspace',  'Delete character before cursor'],
  ['Ctrl+D',     'Delete character at cursor'],
  ['Ctrl+K',     'Kill (cut) to end of line'],
  ['Ctrl+U',     'Kill from start to cursor'],
  ['Ctrl+W',     'Kill word backward (whitespace boundary)'],
  ['Alt+D',      'Kill word forward (alphanumeric boundary)'],
  ['Ctrl+Y',     'Yank (paste) last killed text'],
  ['Ctrl+T',     'Transpose characters around cursor'],
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
// Prevent the textarea from accepting direct browser-injected text
// (e.g. paste, browser autocomplete); all editing goes through our handler.
function handleInput() {
  if (!editor) return;
  const ta = $('command-input');
  // If the textarea was changed by something other than our handler (e.g. paste),
  // revert it to the editor state.
  ta.value = editor.text;
  ta.setSelectionRange(editor.cursor, editor.cursor);
}

// ── Initialisation ────────────────────────────────────────────────────────────
function init() {
  buildShortcutTable();

  // Landing buttons
  $('btn-start').addEventListener('click', startGame);
  $('btn-how-to').addEventListener('click', () => showScreen('screen-howto'));
  $('btn-back-from-howto').addEventListener('click', () => showScreen('screen-landing'));

  // Game buttons
  $('btn-next').addEventListener('click', () => {
    $('overlay-success').classList.add('hidden');
    nextChallenge();
  });

  $('btn-skip').addEventListener('click', () => {
    $('overlay-success').classList.add('hidden');
    nextChallenge();
  });

  // End screen
  $('btn-restart').addEventListener('click', startGame);
  $('btn-howto-end').addEventListener('click', () => showScreen('screen-howto'));

  // Keyboard handler on textarea
  const ta = $('command-input');
  ta.addEventListener('keydown', handleKeyDown);
  ta.addEventListener('input', handleInput);

  showScreen('screen-landing');
}

document.addEventListener('DOMContentLoaded', init);

/**
 * Main application script - connects the Game engine to the DOM.
 */
(function () {
  'use strict';

  // --- DOM elements ---
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const resultsScreen = document.getElementById('results-screen');
  const roundCompleteScreen = document.getElementById('round-complete-screen');

  const startBtn = document.getElementById('start-btn');
  const restartBtns = document.querySelectorAll('.restart-btn');
  const nextRoundBtn = document.getElementById('next-round-btn');

  const roundCounter = document.getElementById('round-counter');
  const challengeDesc = document.getElementById('challenge-desc');
  const challengeHint = document.getElementById('challenge-hint');
  const targetTextEl = document.getElementById('target-text');
  const inputDisplay = document.getElementById('input-display');
  const keypressCounter = document.getElementById('keypress-counter');
  const parDisplay = document.getElementById('par-display');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');

  const rcKeypresses = document.getElementById('rc-keypresses');
  const rcPar = document.getElementById('rc-par');
  const rcRating = document.getElementById('rc-rating');

  const finalTotalKp = document.getElementById('final-total-kp');
  const finalTotalPar = document.getElementById('final-total-par');
  const finalPerfect = document.getElementById('final-perfect');
  const finalRating = document.getElementById('final-rating');
  const resultsTable = document.getElementById('results-table');

  // --- Shortcut reference toggle ---
  const shortcutToggle = document.getElementById('shortcut-toggle');
  const shortcutRef = document.getElementById('shortcut-ref');
  if (shortcutToggle && shortcutRef) {
    shortcutToggle.addEventListener('click', function () {
      shortcutRef.classList.toggle('hidden');
      shortcutToggle.textContent = shortcutRef.classList.contains('hidden')
        ? '📖 Show Shortcut Reference'
        : '📖 Hide Shortcut Reference';
    });
  }

  // --- Game setup ---
  const bashInput = new BashInput();
  const game = new Game({
    challenges: CHALLENGES,
    numRounds: 10,
    bashInput: bashInput,
    onStateChange: render
  });

  // --- Event handlers ---
  startBtn.addEventListener('click', function () {
    game.start();
    showScreen('game');
  });

  restartBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      game.restart();
      showScreen('game');
    });
  });

  nextRoundBtn.addEventListener('click', function () {
    game.nextRound();
    const state = game.getState();
    if (state.state === 'gameComplete') {
      showScreen('results');
      renderFinalResults();
    } else {
      showScreen('game');
    }
  });

  // Global key handler
  document.addEventListener('keydown', function (e) {
    const state = game.getState();
    if (state.state !== 'playing') return;

    // Prevent browser default for handled shortcuts
    const willHandle =
      (e.ctrlKey && ['a','e','b','f','d','h','k','u','w','y','t'].includes(e.key.toLowerCase())) ||
      (e.altKey && ['b','f','d'].includes(e.key.toLowerCase())) ||
      ['ArrowLeft','ArrowRight','Home','End','Backspace','Delete'].includes(e.key) ||
      (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1);

    if (willHandle) {
      e.preventDefault();
      game.handleKey({
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        key: e.key
      });
    }
  });

  // --- Screen management ---
  function showScreen(name) {
    startScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    roundCompleteScreen.classList.add('hidden');

    switch (name) {
      case 'start': startScreen.classList.remove('hidden'); break;
      case 'game': gameScreen.classList.remove('hidden'); break;
      case 'results': resultsScreen.classList.remove('hidden'); break;
      case 'roundComplete': roundCompleteScreen.classList.remove('hidden'); break;
    }
  }

  // --- Rendering ---
  function render(state) {
    if (state.state === 'playing' || state.state === 'roundComplete') {
      roundCounter.textContent = 'Round ' + (state.currentRound + 1) + ' / ' + state.totalRounds;
      challengeDesc.textContent = state.challenge.description;
      challengeHint.textContent = '💡 ' + state.challenge.hint;
      targetTextEl.textContent = state.challenge.targetText;
      keypressCounter.textContent = state.keypresses;
      parDisplay.textContent = state.challenge.parKeypresses;
      progressFill.style.width = state.progress + '%';
      progressText.textContent = state.progress + '%';

      renderInputDisplay(state.text, state.cursorPos);

      if (state.state === 'roundComplete') {
        const lastResult = state.results[state.results.length - 1];
        rcKeypresses.textContent = lastResult.keypresses;
        rcPar.textContent = lastResult.par;
        if (lastResult.keypresses <= lastResult.par) {
          rcRating.textContent = '🎯 Perfect! At or under par!';
          rcRating.className = 'rating-perfect';
        } else if (lastResult.keypresses <= lastResult.par * 1.3) {
          rcRating.textContent = '👍 Good job! Close to par.';
          rcRating.className = 'rating-good';
        } else {
          rcRating.textContent = '💪 Try to use fewer keypresses next time!';
          rcRating.className = 'rating-ok';
        }
        showScreen('roundComplete');
      }
    }
  }

  function renderInputDisplay(text, cursorPos) {
    // Build the display with a visible cursor
    let html = '';
    for (let i = 0; i < text.length; i++) {
      if (i === cursorPos) {
        html += '<span class="cursor">' + escapeHtml(text[i]) + '</span>';
      } else {
        html += escapeHtml(text[i]);
      }
    }
    // If cursor is at end, show a block cursor
    if (cursorPos >= text.length) {
      html += '<span class="cursor">&nbsp;</span>';
    }
    inputDisplay.innerHTML = html;
  }

  function escapeHtml(char) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return map[char] || char;
  }

  function renderFinalResults() {
    const summary = game.getScoreSummary();
    finalTotalKp.textContent = summary.totalKeypresses;
    finalTotalPar.textContent = summary.totalPar;
    finalPerfect.textContent = summary.perfectRounds + ' / ' + summary.totalRounds;
    finalRating.textContent = summary.rating;

    // Build results table
    let rows = '';
    game.getState().results.forEach(function (r, i) {
      const diff = r.keypresses - r.par;
      const diffStr = diff <= 0 ? ('✅ ' + diff) : ('❌ +' + diff);
      rows += '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + escapeHtml(r.challenge.description) + '</td>' +
        '<td>' + r.keypresses + '</td>' +
        '<td>' + r.par + '</td>' +
        '<td>' + diffStr + '</td>' +
        '</tr>';
    });
    resultsTable.querySelector('tbody').innerHTML = rows;
  }
})();

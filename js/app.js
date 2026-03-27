/**
 * Main application script - connects the Game engine to the DOM.
 */
(function () {
  'use strict';

  // --- DOM elements ---
  var startScreen = document.getElementById('start-screen');
  var gameScreen = document.getElementById('game-screen');
  var resultsScreen = document.getElementById('results-screen');
  var roundCompleteScreen = document.getElementById('round-complete-screen');

  var startRandomBtn = document.getElementById('start-random-btn');
  var restartBtns = document.querySelectorAll('.restart-btn');
  var nextRoundBtn = document.getElementById('next-round-btn');

  var roundCounter = document.getElementById('round-counter');
  var trackLabel = document.getElementById('track-label');
  var challengeDesc = document.getElementById('challenge-desc');
  var challengeHint = document.getElementById('challenge-hint');
  var targetTextEl = document.getElementById('target-text');
  var inputDisplay = document.getElementById('input-display');
  var keypressCounter = document.getElementById('keypress-counter');
  var parDisplay = document.getElementById('par-display');
  var progressFill = document.getElementById('progress-fill');
  var progressText = document.getElementById('progress-text');

  var rcKeypresses = document.getElementById('rc-keypresses');
  var rcPar = document.getElementById('rc-par');
  var rcRating = document.getElementById('rc-rating');

  var finalTotalKp = document.getElementById('final-total-kp');
  var finalTotalPar = document.getElementById('final-total-par');
  var finalPerfect = document.getElementById('final-perfect');
  var finalRating = document.getElementById('final-rating');
  var resultsTable = document.getElementById('results-table');

  // --- Shortcut reference toggle ---
  var shortcutToggle = document.getElementById('shortcut-toggle');
  var shortcutRef = document.getElementById('shortcut-ref');
  if (shortcutToggle && shortcutRef) {
    shortcutToggle.addEventListener('click', function () {
      shortcutRef.classList.toggle('hidden');
      shortcutToggle.textContent = shortcutRef.classList.contains('hidden')
        ? '📖 Show Shortcut Reference'
        : '📖 Hide Shortcut Reference';
    });
  }

  // --- Build track selection buttons ---
  var trackGrid = document.getElementById('track-grid');
  if (trackGrid && typeof TRACKS !== 'undefined') {
    TRACKS.forEach(function (track) {
      var count = getChallengesForTrack(track.id).length;
      var btn = document.createElement('button');
      btn.className = 'track-btn';
      btn.setAttribute('data-track', track.id);
      btn.innerHTML =
        '<span class="track-icon">' + track.icon + '</span>' +
        '<span class="track-name">' + track.name + '</span>' +
        '<span class="track-desc">' + track.description + '</span>' +
        '<span class="track-count">' + count + ' challenges</span>';
      btn.addEventListener('click', function () {
        game.startTrack(track.id);
        showScreen('game');
      });
      trackGrid.appendChild(btn);
    });
  }

  // --- Game setup ---
  var bashInput = new BashInput();
  var game = new Game({
    challenges: CHALLENGES,
    numRounds: 10,
    bashInput: bashInput,
    onStateChange: render
  });

  // --- Event handlers ---
  if (startRandomBtn) {
    startRandomBtn.addEventListener('click', function () {
      game.start();
      showScreen('game');
    });
  }

  restartBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      game.restart();
      showScreen('game');
    });
  });

  nextRoundBtn.addEventListener('click', function () {
    game.nextRound();
    var state = game.getState();
    if (state.state === 'gameComplete') {
      showScreen('results');
      renderFinalResults();
    } else {
      showScreen('game');
    }
  });

  // Global key handler — uses capture phase to intercept before browser
  document.addEventListener('keydown', function (e) {
    var state = game.getState();
    if (state.state !== 'playing') return;

    // Use e.code for Alt shortcuts (macOS sends special chars in e.key)
    var altCode = (e.code || '').replace('Key', '').toLowerCase();

    // Prevent browser default for handled shortcuts
    var willHandle =
      (e.ctrlKey && ['a','e','b','f','d','h','k','u','w','y','t'].includes(e.key.toLowerCase())) ||
      (e.altKey && (
        ['b','f','d'].includes(e.key.toLowerCase()) ||
        ['b','f','d'].includes(altCode)
      )) ||
      ['ArrowLeft','ArrowRight','Home','End','Backspace','Delete'].includes(e.key) ||
      (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1);

    if (willHandle) {
      e.preventDefault();
      e.stopPropagation();
      game.handleKey({
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        key: e.key,
        code: e.code || ''
      });
    }
  }, true); // capture phase

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

      // Show track label if in track mode
      if (trackLabel) {
        if (state.mode === 'track' && state.trackName) {
          var trackMeta = TRACKS.find(function (t) { return t.id === state.trackName; });
          var stageNum = state.challenge && state.challenge.stage ? state.challenge.stage : '';
          trackLabel.textContent = (trackMeta ? trackMeta.icon + ' ' + trackMeta.name : state.trackName) +
            (stageNum ? ' · Stage ' + stageNum : '');
          trackLabel.classList.remove('hidden');
        } else {
          trackLabel.textContent = '🎲 Random Mix';
          trackLabel.classList.remove('hidden');
        }
      }

      challengeDesc.textContent = state.challenge.description;
      challengeHint.textContent = '💡 ' + state.challenge.hint;
      targetTextEl.textContent = state.challenge.targetText;
      keypressCounter.textContent = state.keypresses;
      parDisplay.textContent = state.challenge.parKeypresses;
      progressFill.style.width = state.progress + '%';
      progressText.textContent = state.progress + '%';

      renderInputDisplay(state.text, state.cursorPos);

      if (state.state === 'roundComplete') {
        var lastResult = state.results[state.results.length - 1];
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
    var html = '';
    for (var i = 0; i < text.length; i++) {
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
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return map[char] || char;
  }

  function renderFinalResults() {
    var summary = game.getScoreSummary();
    finalTotalKp.textContent = summary.totalKeypresses;
    finalTotalPar.textContent = summary.totalPar;
    finalPerfect.textContent = summary.perfectRounds + ' / ' + summary.totalRounds;
    finalRating.textContent = summary.rating;

    // Build results table
    var rows = '';
    game.getState().results.forEach(function (r, i) {
      var diff = r.keypresses - r.par;
      var diffStr = diff <= 0 ? ('✅ ' + diff) : ('❌ +' + diff);
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

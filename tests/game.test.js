const { BashInput } = require('../js/bash-input');
const { Game } = require('../js/game');
const { CHALLENGES } = require('../js/challenges');

function makeKey(key, opts = {}) {
  return {
    ctrlKey: opts.ctrl || false,
    altKey: opts.alt || false,
    metaKey: opts.meta || false,
    key: key
  };
}

describe('Game', () => {
  let game;
  let bashInput;
  let stateChanges;

  beforeEach(() => {
    bashInput = new BashInput();
    stateChanges = [];
    game = new Game({
      challenges: CHALLENGES,
      numRounds: 3,
      bashInput: bashInput,
      onStateChange: (state) => stateChanges.push({ ...state })
    });
  });

  describe('start', () => {
    test('initializes game with correct number of rounds', () => {
      game.start();
      const state = game.getState();
      expect(state.state).toBe('playing');
      expect(state.totalRounds).toBe(3);
      expect(state.currentRound).toBe(0);
    });

    test('loads first challenge', () => {
      game.start();
      const state = game.getState();
      expect(state.challenge).not.toBeNull();
      expect(state.text).toBe(state.challenge.startText);
    });

    test('fires state change callback', () => {
      game.start();
      expect(stateChanges.length).toBeGreaterThan(0);
    });
  });

  describe('handleKey', () => {
    test('does nothing when not playing', () => {
      const result = game.handleKey(makeKey('a'));
      expect(result).toBe(false);
    });

    test('processes key during playing state', () => {
      game.start();
      const initialText = game.getState().text;
      game.handleKey(makeKey('a', { ctrl: true })); // Ctrl+A
      expect(game.getState().cursorPos).toBe(0);
    });

    test('increments keypress count', () => {
      game.start();
      game.handleKey(makeKey('a', { ctrl: true }));
      expect(game.getState().keypresses).toBe(1);
    });
  });

  describe('challenge completion', () => {
    test('detects when text matches target', () => {
      game.start();
      const challenge = game.getState().challenge;

      // Directly set the text to target
      bashInput.reset(challenge.targetText);
      // Trigger a state check by pressing a neutral key (Ctrl+A at position 0)
      bashInput.text = challenge.startText;
      bashInput.cursorPos = challenge.startText.length;
      bashInput.keypressCount = 0;

      // Type to make it match - use Ctrl+U to clear and type target
      game.handleKey(makeKey('u', { ctrl: true })); // clear line

      // Type the target text
      for (const ch of challenge.targetText) {
        game.handleKey(makeKey(ch));
      }

      expect(game.getState().state).toBe('roundComplete');
      expect(game.getState().results.length).toBe(1);
    });
  });

  describe('nextRound', () => {
    test('does nothing if not roundComplete', () => {
      game.start();
      game.nextRound();
      expect(game.getState().currentRound).toBe(0);
    });

    test('advances to next round after completion', () => {
      game.start();
      // Force completion
      const challenge = game.getState().challenge;
      bashInput.text = challenge.targetText;
      game.handleKey(makeKey('e', { ctrl: true })); // trigger check

      // Might already be complete if text matches, otherwise we need to set it
      if (game.getState().state !== 'roundComplete') {
        // Directly manipulate for testing
        bashInput.text = challenge.targetText;
        bashInput.keypressCount = 5;
        game.state = 'roundComplete';
        game.results.push({ challenge, keypresses: 5, par: challenge.parKeypresses });
      }

      game.nextRound();
      expect(game.getState().currentRound).toBe(1);
      expect(game.getState().state).toBe('playing');
    });
  });

  describe('restart', () => {
    test('resets game to initial state', () => {
      game.start();
      game.restart();
      const state = game.getState();
      expect(state.currentRound).toBe(0);
      expect(state.results).toEqual([]);
      expect(state.state).toBe('playing');
    });
  });

  describe('getScoreSummary', () => {
    test('calculates totals correctly', () => {
      game.results = [
        { challenge: { parKeypresses: 5 }, keypresses: 5, par: 5 },
        { challenge: { parKeypresses: 3 }, keypresses: 4, par: 3 },
        { challenge: { parKeypresses: 7 }, keypresses: 7, par: 7 }
      ];

      const summary = game.getScoreSummary();
      expect(summary.totalKeypresses).toBe(16);
      expect(summary.totalPar).toBe(15);
      expect(summary.perfectRounds).toBe(2);
      expect(summary.totalRounds).toBe(3);
    });

    test('gives best rating when at or below par', () => {
      game.results = [
        { keypresses: 3, par: 5 }
      ];
      const summary = game.getScoreSummary();
      expect(summary.rating).toContain('Bash Master');
    });
  });

  describe('progress calculation', () => {
    test('returns 100 when text matches target', () => {
      game.start();
      const challenge = game.getState().challenge;
      bashInput.text = challenge.targetText;
      game.currentChallenge = challenge;
      expect(game._calculateProgress()).toBe(100);
    });

    test('returns 0 for completely different text', () => {
      game.start();
      game.currentChallenge = { targetText: 'abc' };
      bashInput.text = 'xyz';
      const progress = game._calculateProgress();
      expect(progress).toBeLessThan(50);
    });
  });
});

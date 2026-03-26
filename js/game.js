/**
 * Game engine for the Bash Keyboard Game.
 *
 * Manages game state, challenge selection, scoring, and UI updates.
 */
class Game {
  constructor(options = {}) {
    this.challenges = options.challenges || [];
    this.numRounds = options.numRounds || 10;
    this.bashInput = options.bashInput || new BashInput();
    this.onStateChange = options.onStateChange || (() => {});

    this.currentRound = 0;
    this.currentChallenge = null;
    this.roundChallenges = [];
    this.results = [];
    this.state = 'idle'; // idle, playing, roundComplete, gameComplete
  }

  /**
   * Start a new game: pick random challenges and begin the first round.
   */
  start() {
    this.roundChallenges = this._selectRandomChallenges(this.numRounds);
    this.currentRound = 0;
    this.results = [];
    this.state = 'playing';
    this._loadRound();
  }

  /**
   * Restart the game from the beginning.
   */
  restart() {
    this.start();
  }

  /**
   * Handle a key event during gameplay.
   */
  handleKey(event) {
    if (this.state !== 'playing') return false;

    const handled = this.bashInput.handleKey(event);
    if (handled) {
      this._checkCompletion();
      this.onStateChange(this.getState());
    }
    return handled;
  }

  /**
   * Advance to the next round after completing one.
   */
  nextRound() {
    if (this.state !== 'roundComplete') return;
    this.currentRound++;
    if (this.currentRound >= this.roundChallenges.length) {
      this.state = 'gameComplete';
      this.onStateChange(this.getState());
    } else {
      this.state = 'playing';
      this._loadRound();
    }
  }

  /**
   * Get the current game state for UI rendering.
   */
  getState() {
    return {
      state: this.state,
      currentRound: this.currentRound,
      totalRounds: this.roundChallenges.length,
      challenge: this.currentChallenge,
      text: this.bashInput.text,
      cursorPos: this.bashInput.cursorPos,
      keypresses: this.bashInput.keypressCount,
      results: this.results,
      progress: this._calculateProgress()
    };
  }

  /**
   * Get final score summary.
   */
  getScoreSummary() {
    const totalKeypresses = this.results.reduce((sum, r) => sum + r.keypresses, 0);
    const totalPar = this.results.reduce((sum, r) => sum + r.par, 0);
    const perfectRounds = this.results.filter(r => r.keypresses <= r.par).length;

    return {
      totalKeypresses,
      totalPar,
      perfectRounds,
      totalRounds: this.results.length,
      rating: this._calculateRating(totalKeypresses, totalPar)
    };
  }

  // --- Private methods ---

  _selectRandomChallenges(count) {
    const shuffled = [...this.challenges].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  _loadRound() {
    this.currentChallenge = this.roundChallenges[this.currentRound];
    const startPos = this.currentChallenge.cursorStart !== undefined
      ? this.currentChallenge.cursorStart
      : this.currentChallenge.startText.length;
    this.bashInput.reset(this.currentChallenge.startText, startPos);
    this.onStateChange(this.getState());
  }

  _checkCompletion() {
    if (this.bashInput.text === this.currentChallenge.targetText) {
      this.results.push({
        challenge: this.currentChallenge,
        keypresses: this.bashInput.keypressCount,
        par: this.currentChallenge.parKeypresses
      });
      this.state = 'roundComplete';
    }
  }

  _calculateProgress() {
    if (!this.currentChallenge) return 0;
    const target = this.currentChallenge.targetText;
    const current = this.bashInput.text;

    if (current === target) return 100;

    // Calculate similarity using common prefix + suffix matching
    const maxLen = Math.max(target.length, current.length);
    if (maxLen === 0) return 100;

    let matching = 0;
    const minLen = Math.min(target.length, current.length);
    for (let i = 0; i < minLen; i++) {
      if (target[i] === current[i]) matching++;
      else break;
    }
    // Count matching suffix
    for (let i = 0; i < minLen - matching; i++) {
      if (target[target.length - 1 - i] === current[current.length - 1 - i]) matching++;
      else break;
    }

    return Math.min(99, Math.round((matching / maxLen) * 100));
  }

  _calculateRating(total, par) {
    const ratio = total / par;
    if (ratio <= 1.0) return '⭐⭐⭐ Bash Master!';
    if (ratio <= 1.3) return '⭐⭐ Shell Pro';
    if (ratio <= 1.6) return '⭐ Terminal Learner';
    return 'Keep Practicing!';
  }
}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Game };
}

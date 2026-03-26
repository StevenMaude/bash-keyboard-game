/**
 * BashInput - Simulates bash (readline/emacs mode) keyboard shortcuts
 * in a standard text input field.
 *
 * Supported shortcuts:
 *   Ctrl+A  - Move to beginning of line
 *   Ctrl+E  - Move to end of line
 *   Ctrl+B  - Move back one character
 *   Ctrl+F  - Move forward one character
 *   Alt+B   - Move back one word
 *   Alt+F   - Move forward one word
 *   Ctrl+D  - Delete character under cursor (or after cursor)
 *   Ctrl+H  - Delete character before cursor (backspace)
 *   Ctrl+K  - Kill (cut) from cursor to end of line
 *   Ctrl+U  - Kill (cut) from cursor to beginning of line
 *   Ctrl+W  - Kill the word behind the cursor
 *   Alt+D   - Kill the word after the cursor
 *   Ctrl+Y  - Yank (paste) the last killed text
 *   Ctrl+T  - Transpose the two characters before the cursor
 */
class BashInput {
  constructor() {
    this.text = '';
    this.cursorPos = 0;
    this.killRing = '';
    this.keypressCount = 0;
  }

  /**
   * Reset the input state.
   */
  reset(text = '', cursorPos = null) {
    this.text = text;
    this.cursorPos = cursorPos !== null ? cursorPos : text.length;
    this.killRing = '';
    this.keypressCount = 0;
  }

  /**
   * Process a keyboard event. Returns true if the event was handled.
   */
  handleKey(event) {
    const { ctrlKey, altKey, metaKey, key } = event;

    // Count every keypress
    this.keypressCount++;

    if (ctrlKey && !altKey && !metaKey) {
      switch (key.toLowerCase()) {
        case 'a': this._moveToStart(); return true;
        case 'e': this._moveToEnd(); return true;
        case 'b': this._moveBackChar(); return true;
        case 'f': this._moveForwardChar(); return true;
        case 'd': this._deleteForwardChar(); return true;
        case 'h': this._deleteBackwardChar(); return true;
        case 'k': this._killToEnd(); return true;
        case 'u': this._killToStart(); return true;
        case 'w': this._killWordBackward(); return true;
        case 'y': this._yank(); return true;
        case 't': this._transpose(); return true;
        default: return false;
      }
    }

    if (altKey && !ctrlKey && !metaKey) {
      switch (key.toLowerCase()) {
        case 'b': this._moveBackWord(); return true;
        case 'f': this._moveForwardWord(); return true;
        case 'd': this._killWordForward(); return true;
        default: return false;
      }
    }

    // Regular character input (printable, single char)
    if (!ctrlKey && !altKey && !metaKey && key.length === 1) {
      this._insertChar(key);
      return true;
    }

    // Arrow keys and special keys
    if (!ctrlKey && !altKey && !metaKey) {
      switch (key) {
        case 'ArrowLeft': this._moveBackChar(); return true;
        case 'ArrowRight': this._moveForwardChar(); return true;
        case 'Home': this._moveToStart(); return true;
        case 'End': this._moveToEnd(); return true;
        case 'Backspace': this._deleteBackwardChar(); return true;
        case 'Delete': this._deleteForwardChar(); return true;
        default: return false;
      }
    }

    return false;
  }

  // --- Movement ---

  _moveToStart() {
    this.cursorPos = 0;
  }

  _moveToEnd() {
    this.cursorPos = this.text.length;
  }

  _moveBackChar() {
    if (this.cursorPos > 0) this.cursorPos--;
  }

  _moveForwardChar() {
    if (this.cursorPos < this.text.length) this.cursorPos++;
  }

  _moveBackWord() {
    let pos = this.cursorPos;
    // Skip any spaces behind cursor
    while (pos > 0 && this.text[pos - 1] === ' ') pos--;
    // Skip non-spaces (the word)
    while (pos > 0 && this.text[pos - 1] !== ' ') pos--;
    this.cursorPos = pos;
  }

  _moveForwardWord() {
    let pos = this.cursorPos;
    // Skip non-spaces (current word)
    while (pos < this.text.length && this.text[pos] !== ' ') pos++;
    // Skip any spaces after the word
    while (pos < this.text.length && this.text[pos] === ' ') pos++;
    this.cursorPos = pos;
  }

  // --- Deletion ---

  _deleteForwardChar() {
    if (this.cursorPos < this.text.length) {
      this.text = this.text.slice(0, this.cursorPos) + this.text.slice(this.cursorPos + 1);
    }
  }

  _deleteBackwardChar() {
    if (this.cursorPos > 0) {
      this.text = this.text.slice(0, this.cursorPos - 1) + this.text.slice(this.cursorPos);
      this.cursorPos--;
    }
  }

  // --- Kill (cut) and Yank (paste) ---

  _killToEnd() {
    this.killRing = this.text.slice(this.cursorPos);
    this.text = this.text.slice(0, this.cursorPos);
  }

  _killToStart() {
    this.killRing = this.text.slice(0, this.cursorPos);
    this.text = this.text.slice(this.cursorPos);
    this.cursorPos = 0;
  }

  _killWordBackward() {
    const originalPos = this.cursorPos;
    let pos = this.cursorPos;
    // Skip spaces behind cursor
    while (pos > 0 && this.text[pos - 1] === ' ') pos--;
    // Skip non-spaces (the word)
    while (pos > 0 && this.text[pos - 1] !== ' ') pos--;
    this.killRing = this.text.slice(pos, originalPos);
    this.text = this.text.slice(0, pos) + this.text.slice(originalPos);
    this.cursorPos = pos;
  }

  _killWordForward() {
    const originalPos = this.cursorPos;
    let pos = this.cursorPos;
    // Skip non-spaces (the word)
    while (pos < this.text.length && this.text[pos] !== ' ') pos++;
    // Skip spaces after the word
    while (pos < this.text.length && this.text[pos] === ' ') pos++;
    this.killRing = this.text.slice(originalPos, pos);
    this.text = this.text.slice(0, originalPos) + this.text.slice(pos);
  }

  _yank() {
    if (this.killRing) {
      this.text = this.text.slice(0, this.cursorPos) + this.killRing + this.text.slice(this.cursorPos);
      this.cursorPos += this.killRing.length;
    }
  }

  // --- Transpose ---

  _transpose() {
    if (this.cursorPos === 0 && this.text.length >= 2) {
      // At start: swap first two chars and move cursor to pos 2
      this.text = this.text[1] + this.text[0] + this.text.slice(2);
      this.cursorPos = 2;
    } else if (this.cursorPos >= 2) {
      // Normal: swap char before cursor with char before that
      const chars = this.text.split('');
      const tmp = chars[this.cursorPos - 1];
      chars[this.cursorPos - 1] = chars[this.cursorPos - 2];
      chars[this.cursorPos - 2] = tmp;
      this.text = chars.join('');
    } else if (this.cursorPos === 1 && this.text.length >= 2) {
      // At pos 1: swap first two chars and move cursor forward
      this.text = this.text[1] + this.text[0] + this.text.slice(2);
      this.cursorPos = 2;
    }
  }

  // --- Insert ---

  _insertChar(char) {
    this.text = this.text.slice(0, this.cursorPos) + char + this.text.slice(this.cursorPos);
    this.cursorPos++;
  }
}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BashInput };
}

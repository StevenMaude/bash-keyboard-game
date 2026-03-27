/**
 * BashLineEditor — emulates GNU Readline (bash default) editing shortcuts
 * for a single-line text buffer with a cursor position.
 *
 * All state is plain data: `text` (string) and `cursor` (index into text).
 * Methods return `true` when the state changed, `false` otherwise, so
 * callers can decide whether to count the keypress.
 */
export class BashLineEditor {
  /**
   * @param {string} initialText  Starting content of the line.
   * @param {number|null} cursorPos  Initial cursor position (defaults to end).
   */
  constructor(initialText = '', cursorPos = null) {
    this.text = initialText;
    this.cursor = cursorPos !== null ? cursorPos : initialText.length;
    this.killRing = '';
  }

  // ── helpers ──────────────────────────────────────────────────────────────

  /** True when ch is an alphanumeric character or underscore (readline word char). */
  isWordChar(ch) {
    return /\w/.test(ch);
  }

  // ── cursor movement ───────────────────────────────────────────────────────

  /** Ctrl+A / Home — move to beginning of line. */
  moveToStart() {
    this.cursor = 0;
    return true;
  }

  /** Ctrl+E / End — move to end of line. */
  moveToEnd() {
    this.cursor = this.text.length;
    return true;
  }

  /** Ctrl+F / ArrowRight — move forward one character. */
  moveForwardChar() {
    if (this.cursor < this.text.length) {
      this.cursor++;
      return true;
    }
    return false;
  }

  /** Ctrl+B / ArrowLeft — move backward one character. */
  moveBackwardChar() {
    if (this.cursor > 0) {
      this.cursor--;
      return true;
    }
    return false;
  }

  /**
   * Alt+F — move forward to the end of the next word.
   * Words are composed of alphanumerics and underscore.
   */
  moveForwardWord() {
    // skip non-word chars
    while (this.cursor < this.text.length && !this.isWordChar(this.text[this.cursor])) {
      this.cursor++;
    }
    // skip word chars
    while (this.cursor < this.text.length && this.isWordChar(this.text[this.cursor])) {
      this.cursor++;
    }
    return true;
  }

  /**
   * Alt+B — move backward to the start of the previous word.
   * Words are composed of alphanumerics and underscore.
   */
  moveBackwardWord() {
    // skip non-word chars
    while (this.cursor > 0 && !this.isWordChar(this.text[this.cursor - 1])) {
      this.cursor--;
    }
    // skip word chars
    while (this.cursor > 0 && this.isWordChar(this.text[this.cursor - 1])) {
      this.cursor--;
    }
    return true;
  }

  // ── deletion ──────────────────────────────────────────────────────────────

  /** Ctrl+D / Delete — delete the character at the cursor. */
  deleteForward() {
    if (this.cursor < this.text.length) {
      this.text = this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1);
      return true;
    }
    return false;
  }

  /** Backspace / Ctrl+H — delete the character before the cursor. */
  deleteBackward() {
    if (this.cursor > 0) {
      this.text = this.text.slice(0, this.cursor - 1) + this.text.slice(this.cursor);
      this.cursor--;
      return true;
    }
    return false;
  }

  // ── kill & yank ───────────────────────────────────────────────────────────

  /** Ctrl+K — kill (cut) from cursor to end of line into the kill ring. */
  killToEnd() {
    const killed = this.text.slice(this.cursor);
    if (killed.length > 0) this.killRing = killed;
    this.text = this.text.slice(0, this.cursor);
    return killed.length > 0;
  }

  /** Ctrl+U — kill from beginning of line to cursor into the kill ring. */
  killToStart() {
    const killed = this.text.slice(0, this.cursor);
    if (killed.length > 0) this.killRing = killed;
    this.text = this.text.slice(this.cursor);
    this.cursor = 0;
    return killed.length > 0;
  }

  /**
   * Ctrl+W — kill the word before the cursor into the kill ring.
   * Uses whitespace as the word delimiter (bash default for Ctrl+W).
   */
  killWordBackward() {
    const end = this.cursor;
    // skip whitespace
    while (this.cursor > 0 && /\s/.test(this.text[this.cursor - 1])) {
      this.cursor--;
    }
    // skip non-whitespace
    while (this.cursor > 0 && !/\s/.test(this.text[this.cursor - 1])) {
      this.cursor--;
    }
    if (this.cursor !== end) {
      this.killRing = this.text.slice(this.cursor, end);
      this.text = this.text.slice(0, this.cursor) + this.text.slice(end);
      return true;
    }
    return false;
  }

  /**
   * Alt+D — kill the word after the cursor into the kill ring.
   * Uses alphanumeric/underscore boundaries (readline default for Alt+D).
   */
  killWordForward() {
    const start = this.cursor;
    // skip non-word chars
    while (this.cursor < this.text.length && !this.isWordChar(this.text[this.cursor])) {
      this.cursor++;
    }
    // skip word chars
    while (this.cursor < this.text.length && this.isWordChar(this.text[this.cursor])) {
      this.cursor++;
    }
    if (this.cursor !== start) {
      this.killRing = this.text.slice(start, this.cursor);
      this.text = this.text.slice(0, start) + this.text.slice(this.cursor);
      this.cursor = start;
      return true;
    }
    return false;
  }

  /** Ctrl+Y — yank (paste) from the kill ring at the cursor. */
  yank() {
    if (this.killRing.length > 0) {
      this.text =
        this.text.slice(0, this.cursor) + this.killRing + this.text.slice(this.cursor);
      this.cursor += this.killRing.length;
      return true;
    }
    return false;
  }

  // ── transformation ────────────────────────────────────────────────────────

  /**
   * Ctrl+T — transpose the character before the cursor with the one at it.
   * At end-of-line, transposes the last two characters.
   */
  transposeChars() {
    if (this.text.length < 2 || this.cursor === 0) return false;
    const pos = this.cursor < this.text.length ? this.cursor : this.cursor - 1;
    if (pos < 1) return false;
    const chars = this.text.split('');
    [chars[pos - 1], chars[pos]] = [chars[pos], chars[pos - 1]];
    this.text = chars.join('');
    if (this.cursor < this.text.length) this.cursor = pos + 1;
    return true;
  }

  // ── insertion ─────────────────────────────────────────────────────────────

  /** Insert a single printable character at the cursor position. */
  insert(char) {
    this.text = this.text.slice(0, this.cursor) + char + this.text.slice(this.cursor);
    this.cursor++;
    return true;
  }

  // ── event dispatcher ─────────────────────────────────────────────────────

  /**
   * Dispatch a key event to the appropriate editing action.
   *
   * @param {string}  key       KeyboardEvent.key value
   * @param {boolean} ctrlKey
   * @param {boolean} altKey
   * @param {boolean} metaKey
   * @param {boolean} shiftKey
   * @returns {boolean} true if the event was handled (caller should preventDefault).
   */
  handleKey(key, ctrlKey = false, altKey = false, metaKey = false, shiftKey = false) {
    // Ignore bare modifier keys
    if (['Control', 'Alt', 'Meta', 'Shift', 'CapsLock'].includes(key)) return false;

    // Ctrl combinations (no Alt, no Meta)
    if (ctrlKey && !altKey && !metaKey) {
      switch (key.toLowerCase()) {
        case 'a': return this.moveToStart();
        case 'e': return this.moveToEnd();
        case 'f': return this.moveForwardChar();
        case 'b': return this.moveBackwardChar();
        case 'd': return this.deleteForward();
        case 'h': return this.deleteBackward();
        case 'k': return this.killToEnd();
        case 'u': return this.killToStart();
        case 'w': return this.killWordBackward();
        case 'y': return this.yank();
        case 't': return this.transposeChars();
        default: return false;
      }
    }

    // Alt combinations (no Ctrl, no Meta)
    if (altKey && !ctrlKey && !metaKey) {
      switch (key.toLowerCase()) {
        case 'f': return this.moveForwardWord();
        case 'b': return this.moveBackwardWord();
        case 'd': return this.killWordForward();
        case 'backspace': return this.killWordBackward();
        default: return false;
      }
    }

    // Plain keys (no Ctrl, no Alt, no Meta)
    if (!ctrlKey && !altKey && !metaKey) {
      switch (key) {
        case 'ArrowLeft':
          return shiftKey ? false : this.moveBackwardChar();
        case 'ArrowRight':
          return shiftKey ? false : this.moveForwardChar();
        case 'Home':
          return this.moveToStart();
        case 'End':
          return this.moveToEnd();
        case 'Backspace':
          return this.deleteBackward();
        case 'Delete':
          return this.deleteForward();
        default:
          if (key.length === 1 && !shiftKey) {
            return this.insert(key);
          }
          if (key.length === 1) {
            // shift + printable = insert the character (e.g. shift+A = 'A')
            return this.insert(key);
          }
          return false;
      }
    }

    return false;
  }
}

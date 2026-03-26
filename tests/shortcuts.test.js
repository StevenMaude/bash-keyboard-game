/**
 * shortcuts.test.js — unit tests for BashLineEditor.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { BashLineEditor } from '../js/shortcuts.js';

// ── helpers ───────────────────────────────────────────────────────────────────
function editor(text, cursor = null) {
  return new BashLineEditor(text, cursor);
}

// ── constructor ───────────────────────────────────────────────────────────────
describe('BashLineEditor constructor', () => {
  it('defaults cursor to end of initial text', () => {
    const e = editor('hello');
    expect(e.text).toBe('hello');
    expect(e.cursor).toBe(5);
  });

  it('accepts an explicit cursor position', () => {
    const e = editor('hello', 2);
    expect(e.cursor).toBe(2);
  });

  it('initialises with empty text', () => {
    const e = new BashLineEditor();
    expect(e.text).toBe('');
    expect(e.cursor).toBe(0);
  });
});

// ── Ctrl+A  moveToStart ───────────────────────────────────────────────────────
describe('moveToStart (Ctrl+A)', () => {
  it('moves cursor to 0', () => {
    const e = editor('hello', 5);
    e.moveToStart();
    expect(e.cursor).toBe(0);
  });

  it('via handleKey', () => {
    const e = editor('hello');
    e.handleKey('a', true);
    expect(e.cursor).toBe(0);
  });
});

// ── Ctrl+E  moveToEnd ─────────────────────────────────────────────────────────
describe('moveToEnd (Ctrl+E)', () => {
  it('moves cursor to end', () => {
    const e = editor('hello', 0);
    e.moveToEnd();
    expect(e.cursor).toBe(5);
  });

  it('via handleKey', () => {
    const e = editor('hello', 0);
    e.handleKey('e', true);
    expect(e.cursor).toBe(5);
  });
});

// ── Ctrl+F / ArrowRight ───────────────────────────────────────────────────────
describe('moveForwardChar (Ctrl+F / ArrowRight)', () => {
  it('moves cursor forward one char', () => {
    const e = editor('hello', 2);
    e.moveForwardChar();
    expect(e.cursor).toBe(3);
  });

  it('does not move past end', () => {
    const e = editor('hi', 2);
    const moved = e.moveForwardChar();
    expect(moved).toBe(false);
    expect(e.cursor).toBe(2);
  });

  it('ArrowRight via handleKey', () => {
    const e = editor('hello', 1);
    e.handleKey('ArrowRight');
    expect(e.cursor).toBe(2);
  });
});

// ── Ctrl+B / ArrowLeft ────────────────────────────────────────────────────────
describe('moveBackwardChar (Ctrl+B / ArrowLeft)', () => {
  it('moves cursor backward one char', () => {
    const e = editor('hello', 3);
    e.moveBackwardChar();
    expect(e.cursor).toBe(2);
  });

  it('does not move before start', () => {
    const e = editor('hi', 0);
    const moved = e.moveBackwardChar();
    expect(moved).toBe(false);
    expect(e.cursor).toBe(0);
  });
});

// ── Alt+F  moveForwardWord ────────────────────────────────────────────────────
describe('moveForwardWord (Alt+F)', () => {
  it('moves to end of next word from start', () => {
    const e = editor('git commit -m msg', 0);
    e.moveForwardWord();
    expect(e.cursor).toBe(3); // end of 'git'
  });

  it('skips whitespace then word', () => {
    const e = editor('git commit', 3); // cursor after 'git'
    e.moveForwardWord();
    expect(e.cursor).toBe(10); // end of 'commit'
  });

  it('stops at end of string', () => {
    const e = editor('word', 4);
    e.moveForwardWord();
    expect(e.cursor).toBe(4);
  });

  it('via handleKey with altKey', () => {
    const e = editor('ls -la', 0);
    e.handleKey('f', false, true);
    expect(e.cursor).toBe(2); // end of 'ls'
  });
});

// ── Alt+B  moveBackwardWord ───────────────────────────────────────────────────
describe('moveBackwardWord (Alt+B)', () => {
  it('moves to start of current word', () => {
    const e = editor('git commit', 10);
    e.moveBackwardWord();
    expect(e.cursor).toBe(4); // start of 'commit'
  });

  it('skips whitespace then word when between words', () => {
    const e = editor('git commit', 4); // cursor at space before 'commit'
    e.moveBackwardWord();
    expect(e.cursor).toBe(0); // start of 'git'
  });

  it('stops at start', () => {
    const e = editor('word', 0);
    e.moveBackwardWord();
    expect(e.cursor).toBe(0);
  });
});

// ── Ctrl+D  deleteForward ─────────────────────────────────────────────────────
describe('deleteForward (Ctrl+D)', () => {
  it('deletes character at cursor', () => {
    const e = editor('hello', 2);
    e.deleteForward();
    expect(e.text).toBe('helo');
    expect(e.cursor).toBe(2);
  });

  it('does nothing at end of line', () => {
    const e = editor('hi', 2);
    const changed = e.deleteForward();
    expect(changed).toBe(false);
    expect(e.text).toBe('hi');
  });

  it('Delete key via handleKey', () => {
    const e = editor('hello', 0);
    e.handleKey('Delete');
    expect(e.text).toBe('ello');
  });
});

// ── Backspace / Ctrl+H  deleteBackward ────────────────────────────────────────
describe('deleteBackward (Backspace)', () => {
  it('deletes character before cursor', () => {
    const e = editor('hello', 3);
    e.deleteBackward();
    expect(e.text).toBe('helo');
    expect(e.cursor).toBe(2);
  });

  it('does nothing at start', () => {
    const e = editor('hi', 0);
    const changed = e.deleteBackward();
    expect(changed).toBe(false);
    expect(e.text).toBe('hi');
  });

  it('Backspace key via handleKey', () => {
    const e = editor('hello', 5);
    e.handleKey('Backspace');
    expect(e.text).toBe('hell');
    expect(e.cursor).toBe(4);
  });
});

// ── Ctrl+K  killToEnd ─────────────────────────────────────────────────────────
describe('killToEnd (Ctrl+K)', () => {
  it('kills from cursor to end', () => {
    const e = editor('git commit -m msg', 10);
    e.killToEnd();
    expect(e.text).toBe('git commit');
    expect(e.cursor).toBe(10);
    expect(e.killRing).toBe(' -m msg');
  });

  it('stores killed text in kill ring', () => {
    const e = editor('hello world', 5);
    e.killToEnd();
    expect(e.killRing).toBe(' world');
  });

  it('returns false at end of line', () => {
    const e = editor('hello', 5);
    expect(e.killToEnd()).toBe(false);
  });
});

// ── Ctrl+U  killToStart ───────────────────────────────────────────────────────
describe('killToStart (Ctrl+U)', () => {
  it('kills from start to cursor', () => {
    const e = editor('sudo apt install', 5); // cursor after 'sudo '
    e.killToStart();
    expect(e.text).toBe('apt install');
    expect(e.cursor).toBe(0);
    expect(e.killRing).toBe('sudo ');
  });

  it('returns false at start', () => {
    const e = editor('hello', 0);
    expect(e.killToStart()).toBe(false);
  });
});

// ── Ctrl+W  killWordBackward ──────────────────────────────────────────────────
describe('killWordBackward (Ctrl+W)', () => {
  it('kills the last whitespace-delimited token', () => {
    const e = editor('git push --force', 16);
    e.killWordBackward();
    expect(e.text).toBe('git push ');
    expect(e.killRing).toBe('--force');
  });

  it('trims leading whitespace from killed region', () => {
    const e = editor('cmd arg ', 8);
    e.killWordBackward();
    // kills the trailing whitespace + 'arg'
    expect(e.text).toBe('cmd ');
  });

  it('returns false at start', () => {
    const e = editor('hello', 0);
    expect(e.killWordBackward()).toBe(false);
  });
});

// ── Alt+D  killWordForward ────────────────────────────────────────────────────
describe('killWordForward (Alt+D)', () => {
  it('kills the word ahead of cursor', () => {
    const e = editor('docker run ubuntu bash', 11); // cursor before 'ubuntu'
    e.killWordForward();
    expect(e.text).toBe('docker run  bash');
    expect(e.killRing).toBe('ubuntu');
  });

  it('skips non-word chars before killing (includes them in kill ring)', () => {
    // readline's Alt+D kills from cursor position to end of next word,
    // including any leading non-word chars at the cursor position
    const e = editor('cmd --flag rest', 4); // cursor before '--flag'
    e.killWordForward();
    // kills '--flag' (non-word '--' + word 'flag')
    expect(e.killRing).toBe('--flag');
    expect(e.text).toBe('cmd  rest');
  });

  it('returns false at end of line', () => {
    const e = editor('hello', 5);
    expect(e.killWordForward()).toBe(false);
  });
});

// ── Ctrl+Y  yank ──────────────────────────────────────────────────────────────
describe('yank (Ctrl+Y)', () => {
  it('inserts kill ring text at cursor', () => {
    const e = editor('hello ', 6);
    e.killRing = 'world';
    e.yank();
    expect(e.text).toBe('hello world');
    expect(e.cursor).toBe(11);
  });

  it('returns false with empty kill ring', () => {
    const e = editor('hello', 5);
    e.killRing = '';
    expect(e.yank()).toBe(false);
  });

  it('kill then yank round-trips text', () => {
    const e = editor('foo bar baz', 7); // cursor after 'bar'
    e.killWordBackward(); // kills 'bar'
    // text is 'foo  baz', cursor=4
    e.moveToEnd();
    e.yank();
    expect(e.text).toBe('foo  bazbar');
  });
});

// ── Ctrl+T  transposeChars ────────────────────────────────────────────────────
describe('transposeChars (Ctrl+T)', () => {
  it('transposes chars around cursor', () => {
    const e = editor('git sattus', 7); // cursor after the first 't' in 'sattus'
    e.transposeChars();
    // 'sa' → at pos 6='a', 7='t', transpose: 'ta'... hmm let me trace
    // text='git sattus', cursor=7
    // pos=7 (cursor < length), chars[6]='a', chars[7]='t' → swap → 'git stauts'?
    // Actually: text[6]='a', text[7]='t' — cursor=7, pos=7, swap chars[6] and chars[7]
    // 'git sa' + 'ttus' → after swap of [6]'a' and [7]'t' → 'git st' + 'atus' → 'git status'
    // wait: 'git sattus'
    //        0123456789A
    // [6]='a', [7]='t', swap → 'git st' + 'a' + 'tus' = 'git status'
    // no: 'git sattus' = g,i,t, ,s,a,t,t,u,s
    //                    0 1 2 3 4 5 6 7 8 9
    // cursor=7, pos=7 (cursor < length=10), swap chars[6] and chars[7]
    // chars[6]='t', chars[7]='t' — they're both 't'!
    // Let me use a simpler example.
    const e2 = editor('helo', 3); // 'l' at 2, 'o' at 3
    e2.transposeChars(); // swap chars[2] and chars[3]
    expect(e2.text).toBe('heol');
  });

  it('transposes last two chars at end of line', () => {
    const e = editor('teh', 3); // cursor at end
    e.transposeChars();
    expect(e.text).toBe('the');
  });

  it('returns false at cursor=0', () => {
    const e = editor('hello', 0);
    expect(e.transposeChars()).toBe(false);
  });
});

// ── insert ────────────────────────────────────────────────────────────────────
describe('insert', () => {
  it('inserts a character at cursor', () => {
    const e = editor('hllo', 1);
    e.insert('e');
    expect(e.text).toBe('hello');
    expect(e.cursor).toBe(2);
  });

  it('inserts at start', () => {
    const e = editor('ello', 0);
    e.insert('h');
    expect(e.text).toBe('hello');
    expect(e.cursor).toBe(1);
  });

  it('inserts at end', () => {
    const e = editor('hell', 4);
    e.insert('o');
    expect(e.text).toBe('hello');
    expect(e.cursor).toBe(5);
  });

  it('printable key via handleKey', () => {
    const e = editor('', 0);
    e.handleKey('x');
    expect(e.text).toBe('x');
  });
});

// ── handleKey — modifier key passthrough ──────────────────────────────────────
describe('handleKey modifier passthrough', () => {
  it('returns false for bare Control key', () => {
    const e = editor('hello');
    expect(e.handleKey('Control', true)).toBe(false);
  });

  it('returns false for bare Alt key', () => {
    const e = editor('hello');
    expect(e.handleKey('Alt', false, true)).toBe(false);
  });

  it('returns false for unhandled Ctrl+X', () => {
    const e = editor('hello');
    expect(e.handleKey('x', true)).toBe(false);
  });
});

// ── Home / End ────────────────────────────────────────────────────────────────
describe('Home / End keys', () => {
  it('Home moves cursor to start', () => {
    const e = editor('hello', 3);
    e.handleKey('Home');
    expect(e.cursor).toBe(0);
  });

  it('End moves cursor to end', () => {
    const e = editor('hello', 0);
    e.handleKey('End');
    expect(e.cursor).toBe(5);
  });
});

// ── complex scenarios ─────────────────────────────────────────────────────────
describe('Complex editing scenarios', () => {
  it('Ctrl+A + Alt+F + Alt+F puts cursor after second word', () => {
    // 'ls -la /home': Ctrl+A → cursor=0
    // Alt+F: skip word 'ls' → cursor=2
    // Alt+F: skip non-word ' -', then word 'la' → cursor=6
    const e = editor('ls -la /home');
    e.moveToStart();           // cursor=0
    e.moveForwardWord();       // skips 'ls', cursor=2
    e.moveForwardWord();       // skips ' -', then 'la', cursor=6
    expect(e.cursor).toBe(6);
  });

  it('kill + yank moves a word', () => {
    // Ctrl+W from end kills the last whitespace-delimited token.
    // 'rm arg1 build' — Ctrl+W kills 'build', moveToStart, Ctrl+Y pastes 'build' at start.
    const e = editor('rm arg1 build', 13); // cursor at end
    e.killWordBackward(); // kills 'build', text='rm arg1 '
    expect(e.text).toBe('rm arg1 ');
    expect(e.killRing).toBe('build');
    e.moveToStart();
    e.yank();             // paste 'build' at start
    expect(e.text).toBe('buildrm arg1 ');
  });

  it('Ctrl+K + Ctrl+U on same buffer clears everything via two operations', () => {
    const e = editor('some long command', 5); // cursor after 'some '
    e.killToEnd();    // kill ' long command', text='some '
    e.killToStart();  // kill 'some ', text=''
    expect(e.text).toBe('');
    expect(e.cursor).toBe(0);
  });

  it('fixes "git sattus" → "git status" using Ctrl+T', () => {
    // 'git sattus': s(4)a(5)t(6)t(7)u(8)s(9)
    // We need to produce 'git status': s(4)t(5)a(6)t(7)u(8)s(9)
    // Swap chars at index 5 and 6 (the 'a' and first 't'):
    // cursor at 6 → transposeChars swaps chars[5] and chars[6]
    const e = editor('git sattus', 6);
    e.transposeChars(); // swap [5]='a' and [6]='t' → 'git status'... 
    // 'git sattus'[5]='a', [6]='t' → 'git status'? No:
    // g(0)i(1)t(2) (3)s(4)a(5)t(6)t(7)u(8)s(9)
    // swap [5] and [6] → g,i,t, ,s,t,a,t,u,s = 'git status' ✓
    expect(e.text).toBe('git status');
  });
});

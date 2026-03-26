const { BashInput } = require('../js/bash-input');

function makeKey(key, opts = {}) {
  return {
    ctrlKey: opts.ctrl || false,
    altKey: opts.alt || false,
    metaKey: opts.meta || false,
    key: key
  };
}

describe('BashInput', () => {
  let input;

  beforeEach(() => {
    input = new BashInput();
  });

  describe('reset', () => {
    test('sets text and cursor to defaults', () => {
      input.reset('hello');
      expect(input.text).toBe('hello');
      expect(input.cursorPos).toBe(5);
      expect(input.keypressCount).toBe(0);
    });

    test('sets cursor to specified position', () => {
      input.reset('hello', 2);
      expect(input.cursorPos).toBe(2);
    });

    test('clears kill ring', () => {
      input.killRing = 'something';
      input.reset('new');
      expect(input.killRing).toBe('');
    });
  });

  describe('character input', () => {
    test('inserts character at cursor', () => {
      input.reset('hllo', 1);
      input.handleKey(makeKey('e'));
      expect(input.text).toBe('hello');
      expect(input.cursorPos).toBe(2);
    });

    test('inserts at end of text', () => {
      input.reset('hell');
      input.handleKey(makeKey('o'));
      expect(input.text).toBe('hello');
      expect(input.cursorPos).toBe(5);
    });

    test('inserts at beginning of text', () => {
      input.reset('ello', 0);
      input.handleKey(makeKey('h'));
      expect(input.text).toBe('hello');
      expect(input.cursorPos).toBe(1);
    });

    test('increments keypress count', () => {
      input.reset('');
      input.handleKey(makeKey('a'));
      input.handleKey(makeKey('b'));
      expect(input.keypressCount).toBe(2);
    });
  });

  describe('Ctrl+A - move to start', () => {
    test('moves cursor to beginning', () => {
      input.reset('hello world', 5);
      input.handleKey(makeKey('a', { ctrl: true }));
      expect(input.cursorPos).toBe(0);
      expect(input.text).toBe('hello world');
    });

    test('already at start stays at 0', () => {
      input.reset('hello', 0);
      input.handleKey(makeKey('a', { ctrl: true }));
      expect(input.cursorPos).toBe(0);
    });
  });

  describe('Ctrl+E - move to end', () => {
    test('moves cursor to end', () => {
      input.reset('hello world', 0);
      input.handleKey(makeKey('e', { ctrl: true }));
      expect(input.cursorPos).toBe(11);
    });

    test('already at end stays at end', () => {
      input.reset('hello');
      input.handleKey(makeKey('e', { ctrl: true }));
      expect(input.cursorPos).toBe(5);
    });
  });

  describe('Ctrl+B / ArrowLeft - move back one char', () => {
    test('moves cursor back one', () => {
      input.reset('abc', 2);
      input.handleKey(makeKey('b', { ctrl: true }));
      expect(input.cursorPos).toBe(1);
    });

    test('does not move below 0', () => {
      input.reset('abc', 0);
      input.handleKey(makeKey('b', { ctrl: true }));
      expect(input.cursorPos).toBe(0);
    });

    test('ArrowLeft also works', () => {
      input.reset('abc', 2);
      input.handleKey(makeKey('ArrowLeft'));
      expect(input.cursorPos).toBe(1);
    });
  });

  describe('Ctrl+F / ArrowRight - move forward one char', () => {
    test('moves cursor forward one', () => {
      input.reset('abc', 1);
      input.handleKey(makeKey('f', { ctrl: true }));
      expect(input.cursorPos).toBe(2);
    });

    test('does not move beyond text length', () => {
      input.reset('abc');
      input.handleKey(makeKey('f', { ctrl: true }));
      expect(input.cursorPos).toBe(3);
    });
  });

  describe('Alt+B - move back one word', () => {
    test('moves to beginning of current word', () => {
      input.reset('hello world', 11);
      input.handleKey(makeKey('b', { alt: true }));
      expect(input.cursorPos).toBe(6);
    });

    test('skips spaces then moves over word', () => {
      input.reset('hello  world', 7);
      input.handleKey(makeKey('b', { alt: true }));
      expect(input.cursorPos).toBe(0);
    });

    test('from beginning stays at 0', () => {
      input.reset('hello', 0);
      input.handleKey(makeKey('b', { alt: true }));
      expect(input.cursorPos).toBe(0);
    });
  });

  describe('Alt+F - move forward one word', () => {
    test('moves past current word and spaces', () => {
      input.reset('hello world', 0);
      input.handleKey(makeKey('f', { alt: true }));
      expect(input.cursorPos).toBe(6);
    });

    test('from end stays at end', () => {
      input.reset('hello', 5);
      input.handleKey(makeKey('f', { alt: true }));
      expect(input.cursorPos).toBe(5);
    });

    test('skips over word and trailing spaces', () => {
      input.reset('hello  world', 0);
      input.handleKey(makeKey('f', { alt: true }));
      expect(input.cursorPos).toBe(7);
    });
  });

  describe('Ctrl+D - delete forward char', () => {
    test('deletes character at cursor', () => {
      input.reset('hello', 2);
      input.handleKey(makeKey('d', { ctrl: true }));
      expect(input.text).toBe('helo');
      expect(input.cursorPos).toBe(2);
    });

    test('does nothing at end', () => {
      input.reset('hello');
      input.handleKey(makeKey('d', { ctrl: true }));
      expect(input.text).toBe('hello');
    });
  });

  describe('Ctrl+H / Backspace - delete backward char', () => {
    test('deletes character before cursor', () => {
      input.reset('hello', 3);
      input.handleKey(makeKey('h', { ctrl: true }));
      expect(input.text).toBe('helo');
      expect(input.cursorPos).toBe(2);
    });

    test('does nothing at beginning', () => {
      input.reset('hello', 0);
      input.handleKey(makeKey('h', { ctrl: true }));
      expect(input.text).toBe('hello');
      expect(input.cursorPos).toBe(0);
    });

    test('Backspace key also works', () => {
      input.reset('hello', 3);
      input.handleKey(makeKey('Backspace'));
      expect(input.text).toBe('helo');
      expect(input.cursorPos).toBe(2);
    });
  });

  describe('Ctrl+K - kill to end of line', () => {
    test('deletes from cursor to end', () => {
      input.reset('hello world', 5);
      input.handleKey(makeKey('k', { ctrl: true }));
      expect(input.text).toBe('hello');
      expect(input.cursorPos).toBe(5);
      expect(input.killRing).toBe(' world');
    });

    test('at end does nothing to text but clears kill ring section', () => {
      input.reset('hello');
      input.handleKey(makeKey('k', { ctrl: true }));
      expect(input.text).toBe('hello');
      expect(input.killRing).toBe('');
    });
  });

  describe('Ctrl+U - kill to start of line', () => {
    test('deletes from cursor to start', () => {
      input.reset('hello world', 5);
      input.handleKey(makeKey('u', { ctrl: true }));
      expect(input.text).toBe(' world');
      expect(input.cursorPos).toBe(0);
      expect(input.killRing).toBe('hello');
    });

    test('at start does nothing', () => {
      input.reset('hello', 0);
      input.handleKey(makeKey('u', { ctrl: true }));
      expect(input.text).toBe('hello');
      expect(input.killRing).toBe('');
    });
  });

  describe('Ctrl+W - kill word backward', () => {
    test('deletes word before cursor', () => {
      input.reset('hello world', 11);
      input.handleKey(makeKey('w', { ctrl: true }));
      expect(input.text).toBe('hello ');
      expect(input.cursorPos).toBe(6);
      expect(input.killRing).toBe('world');
    });

    test('deletes word and preceding spaces', () => {
      input.reset('hello  world  ', 14);
      input.handleKey(makeKey('w', { ctrl: true }));
      expect(input.text).toBe('hello  ');
      expect(input.killRing).toBe('world  ');
    });

    test('at start does nothing', () => {
      input.reset('hello', 0);
      input.handleKey(makeKey('w', { ctrl: true }));
      expect(input.text).toBe('hello');
    });
  });

  describe('Alt+D - kill word forward', () => {
    test('deletes word after cursor', () => {
      input.reset('hello world', 6);
      input.handleKey(makeKey('d', { alt: true }));
      expect(input.text).toBe('hello ');
      expect(input.cursorPos).toBe(6);
      expect(input.killRing).toBe('world');
    });

    test('deletes word and following spaces', () => {
      input.reset('hello  world', 0);
      input.handleKey(makeKey('d', { alt: true }));
      expect(input.text).toBe('world');
      expect(input.killRing).toBe('hello  ');
    });

    test('at end does nothing', () => {
      input.reset('hello', 5);
      input.handleKey(makeKey('d', { alt: true }));
      expect(input.text).toBe('hello');
    });
  });

  describe('Ctrl+Y - yank', () => {
    test('pastes killed text at cursor', () => {
      input.reset('hello world', 5);
      input.handleKey(makeKey('k', { ctrl: true })); // kill " world"
      input.handleKey(makeKey('a', { ctrl: true })); // go to start
      input.handleKey(makeKey('y', { ctrl: true })); // yank
      expect(input.text).toBe(' worldhello');
      expect(input.cursorPos).toBe(6);
    });

    test('with empty kill ring does nothing', () => {
      input.reset('hello');
      input.handleKey(makeKey('y', { ctrl: true }));
      expect(input.text).toBe('hello');
    });
  });

  describe('Ctrl+T - transpose', () => {
    test('transposes two chars before cursor', () => {
      input.reset('abcd', 3);
      input.handleKey(makeKey('t', { ctrl: true }));
      expect(input.text).toBe('acbd');
    });

    test('at beginning with 2+ chars swaps first two', () => {
      input.reset('abcd', 0);
      input.handleKey(makeKey('t', { ctrl: true }));
      expect(input.text).toBe('bacd');
      expect(input.cursorPos).toBe(2);
    });

    test('at pos 1 swaps first two chars', () => {
      input.reset('abcd', 1);
      input.handleKey(makeKey('t', { ctrl: true }));
      expect(input.text).toBe('bacd');
      expect(input.cursorPos).toBe(2);
    });
  });

  describe('unhandled keys', () => {
    test('returns false for unhandled keys', () => {
      input.reset('hello');
      const result = input.handleKey(makeKey('Tab'));
      expect(result).toBe(false);
    });

    test('returns true for handled keys', () => {
      input.reset('hello');
      const result = input.handleKey(makeKey('a', { ctrl: true }));
      expect(result).toBe(true);
    });
  });

  describe('Home/End keys', () => {
    test('Home moves to start', () => {
      input.reset('hello', 5);
      input.handleKey(makeKey('Home'));
      expect(input.cursorPos).toBe(0);
    });

    test('End moves to end', () => {
      input.reset('hello', 0);
      input.handleKey(makeKey('End'));
      expect(input.cursorPos).toBe(5);
    });
  });

  describe('Delete key', () => {
    test('deletes character forward', () => {
      input.reset('hello', 2);
      input.handleKey(makeKey('Delete'));
      expect(input.text).toBe('helo');
    });
  });
});

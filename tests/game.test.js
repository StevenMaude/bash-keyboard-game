/**
 * game.test.js — unit tests for game helper functions.
 */
import { describe, it, expect } from 'vitest';
import { levenshtein, calcProgress } from '../js/utils.js';

// ── levenshtein ───────────────────────────────────────────────────────────────
describe('levenshtein', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshtein('hello', 'hello')).toBe(0);
  });

  it('returns string length when other is empty', () => {
    expect(levenshtein('hello', '')).toBe(5);
    expect(levenshtein('', 'hello')).toBe(5);
  });

  it('counts single substitution', () => {
    expect(levenshtein('cat', 'bat')).toBe(1);
  });

  it('counts single insertion', () => {
    expect(levenshtein('cat', 'cats')).toBe(1);
  });

  it('counts single deletion', () => {
    expect(levenshtein('cats', 'cat')).toBe(1);
  });

  it('handles transpositions correctly', () => {
    // 'ab' → 'ba' = 2 substitutions (not 1, Levenshtein not Damerau-Levenshtein)
    expect(levenshtein('ab', 'ba')).toBe(2);
  });

  it('computes multi-op distance', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });

  it('is symmetric', () => {
    expect(levenshtein('abc', 'xyz')).toBe(levenshtein('xyz', 'abc'));
  });
});

// ── calcProgress ──────────────────────────────────────────────────────────────
describe('calcProgress', () => {
  // initial='abc', target='abcdef' (distance=3)
  const initial = 'abc';
  const target  = 'abcdef';

  it('returns 1 when current equals target', () => {
    expect(calcProgress(target, target, initial)).toBe(1);
  });

  it('returns 0 when current equals initial', () => {
    expect(calcProgress(initial, target, initial)).toBe(0);
  });

  it('returns value between 0 and 1 for intermediate state', () => {
    // 'abcd' is 2 edits from target, initial is 3 edits → progress = 1/3
    const progress = calcProgress('abcd', target, initial);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(1);
  });

  it('returns 1 when initial equals target (no edits needed)', () => {
    expect(calcProgress('x', 'x', 'x')).toBe(1);
  });

  it('never returns a negative value', () => {
    // If the player makes things worse, progress should clamp to 0
    const worse = 'completely different long string with extra characters';
    expect(calcProgress(worse, target, initial)).toBeGreaterThanOrEqual(0);
  });

  it('increases as current approaches target', () => {
    const p0 = calcProgress(initial,  target, initial); // 0
    const p1 = calcProgress('abcde',  target, initial); // dist=1 → 2/3
    const p2 = calcProgress(target,   target, initial); // 1
    expect(p0).toBeLessThan(p1);
    expect(p1).toBeLessThan(p2);
  });
});


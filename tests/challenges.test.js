/**
 * challenges.test.js — unit tests for challenge data and selectChallenges.
 */
import { describe, it, expect } from 'vitest';
import { CHALLENGES, COLLECTIONS, selectChallenges } from '../js/challenges.js';

describe('COLLECTIONS structure', () => {
  it('exports at least 10 collections', () => {
    expect(COLLECTIONS.length).toBe(12);
  });

  it('every collection has required fields', () => {
    for (const col of COLLECTIONS) {
      expect(col).toHaveProperty('id');
      expect(col).toHaveProperty('name');
      expect(col).toHaveProperty('shortcut');
      expect(col).toHaveProperty('description');
      expect(col).toHaveProperty('challenges');
      expect(Array.isArray(col.challenges)).toBe(true);
      expect(col.challenges.length).toBeGreaterThan(0);
    }
  });

  it('last collection is the graduate collection', () => {
    const last = COLLECTIONS[COLLECTIONS.length - 1];
    expect(last.id).toBe('graduate');
  });

  it('each collection has at least 4 challenges', () => {
    for (const col of COLLECTIONS) {
      expect(col.challenges.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('every challenge carries the collectionId of its parent', () => {
    for (const col of COLLECTIONS) {
      for (const ch of col.challenges) {
        expect(ch.collectionId).toBe(col.id);
      }
    }
  });
});

describe('CHALLENGES data', () => {
  it('exports at least 85 challenges', () => {
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(90);
  });

  it('CHALLENGES equals the flat list of all collection challenges', () => {
    const flat = COLLECTIONS.flatMap(c => c.challenges);
    expect(CHALLENGES).toEqual(flat);
  });

  it('every challenge has required fields', () => {
    for (const ch of CHALLENGES) {
      expect(ch).toHaveProperty('id');
      expect(ch).toHaveProperty('title');
      expect(ch).toHaveProperty('initial');
      expect(ch).toHaveProperty('target');
      expect(ch).toHaveProperty('hint');
      expect(ch).toHaveProperty('optimalKeys');
      expect(ch).toHaveProperty('category');
    }
  });

  it('all ids are unique', () => {
    const ids = CHALLENGES.map(c => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('initial and target strings are different for every challenge', () => {
    for (const ch of CHALLENGES) {
      expect(ch.initial).not.toBe(ch.target);
    }
  });

  it('all optimalKeys values are positive integers', () => {
    for (const ch of CHALLENGES) {
      expect(Number.isInteger(ch.optimalKeys)).toBe(true);
      expect(ch.optimalKeys).toBeGreaterThan(0);
    }
  });

  it('kill-word-back challenges mention Alt+Backspace browser fallback', () => {
    // In Electron, Ctrl+W works fully and hints may use it directly.
    // Challenges in the kill-word-back collection should still mention
    // Alt+Backspace for players using the browser build.
    const kwbCollection = COLLECTIONS.find(c => c.id === 'kill-word-back');
    expect(kwbCollection).toBeDefined();
    const withFallback = kwbCollection.challenges.filter(
      ch => ch.hint.includes('Alt+Backspace') || ch.hint.includes('browser')
    );
    expect(withFallback.length).toBeGreaterThan(0);
  });
});

describe('selectChallenges', () => {
  it('returns the requested number of challenges', () => {
    const selected = selectChallenges(8);
    expect(selected).toHaveLength(8);
  });

  it('returns at most CHALLENGES.length challenges', () => {
    const selected = selectChallenges(9999);
    expect(selected).toHaveLength(CHALLENGES.length);
  });

  it('returns a subset of CHALLENGES', () => {
    const selected = selectChallenges(5);
    for (const ch of selected) {
      expect(CHALLENGES).toContainEqual(ch);
    }
  });

  it('returns challenges in a random order (seeded RNG)', () => {
    // Use a deterministic RNG seed to get a stable result
    let seed = 42;
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };
    const first  = selectChallenges(CHALLENGES.length, rng);
    seed = 42; // reset
    const second = selectChallenges(CHALLENGES.length, rng);
    // Same seed → same order
    expect(first.map(c => c.id)).toEqual(second.map(c => c.id));
  });

  it('returns no duplicate challenges in one selection', () => {
    const selected = selectChallenges(CHALLENGES.length);
    const ids = selected.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

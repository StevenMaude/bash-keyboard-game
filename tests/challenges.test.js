const { CHALLENGES } = require('../js/challenges');

describe('Challenges', () => {
  test('has at least 30 challenges', () => {
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(30);
  });

  test('each challenge has required fields', () => {
    CHALLENGES.forEach((challenge, index) => {
      expect(challenge).toHaveProperty('id');
      expect(challenge).toHaveProperty('description');
      expect(challenge).toHaveProperty('hint');
      expect(challenge).toHaveProperty('startText');
      expect(challenge).toHaveProperty('targetText');
      expect(challenge).toHaveProperty('parKeypresses');
    });
  });

  test('each challenge has unique id', () => {
    const ids = CHALLENGES.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('startText differs from targetText for each challenge', () => {
    CHALLENGES.forEach((challenge) => {
      expect(challenge.startText).not.toBe(challenge.targetText);
    });
  });

  test('parKeypresses is a positive number', () => {
    CHALLENGES.forEach((challenge) => {
      expect(challenge.parKeypresses).toBeGreaterThan(0);
    });
  });

  test('description is a non-empty string', () => {
    CHALLENGES.forEach((challenge) => {
      expect(typeof challenge.description).toBe('string');
      expect(challenge.description.length).toBeGreaterThan(0);
    });
  });

  test('hint is a non-empty string', () => {
    CHALLENGES.forEach((challenge) => {
      expect(typeof challenge.hint).toBe('string');
      expect(challenge.hint.length).toBeGreaterThan(0);
    });
  });
});

const { CHALLENGES, TRACKS, getChallengesForTrack, getTrackIds } = require('../js/challenges');

describe('Challenges', () => {
  test('has at least 80 challenges', () => {
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(80);
  });

  test('each challenge has required fields', () => {
    CHALLENGES.forEach((challenge, index) => {
      expect(challenge).toHaveProperty('id');
      expect(challenge).toHaveProperty('track');
      expect(challenge).toHaveProperty('stage');
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

  test('each challenge has a valid track', () => {
    const validTracks = getTrackIds();
    CHALLENGES.forEach((challenge) => {
      expect(validTracks).toContain(challenge.track);
    });
  });

  test('each challenge has a positive stage number', () => {
    CHALLENGES.forEach((challenge) => {
      expect(typeof challenge.stage).toBe('number');
      expect(challenge.stage).toBeGreaterThan(0);
    });
  });
});

describe('Tracks', () => {
  test('has at least 5 tracks', () => {
    expect(TRACKS.length).toBeGreaterThanOrEqual(5);
  });

  test('each track has required fields', () => {
    TRACKS.forEach((track) => {
      expect(track).toHaveProperty('id');
      expect(track).toHaveProperty('name');
      expect(track).toHaveProperty('icon');
      expect(track).toHaveProperty('description');
      expect(track).toHaveProperty('shortcuts');
      expect(Array.isArray(track.shortcuts)).toBe(true);
    });
  });

  test('each track has unique id', () => {
    const ids = TRACKS.map(t => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('each track has at least 2 challenges', () => {
    TRACKS.forEach((track) => {
      const challenges = getChallengesForTrack(track.id);
      expect(challenges.length).toBeGreaterThanOrEqual(2);
    });
  });

  test('each track has multiple stages', () => {
    TRACKS.forEach((track) => {
      const challenges = getChallengesForTrack(track.id);
      const stages = new Set(challenges.map(c => c.stage));
      expect(stages.size).toBeGreaterThanOrEqual(2);
    });
  });

  test('each track has a graduation stage (stage 4)', () => {
    TRACKS.forEach((track) => {
      const challenges = getChallengesForTrack(track.id);
      const hasGraduation = challenges.some(c => c.stage >= 3);
      expect(hasGraduation).toBe(true);
    });
  });
});

describe('getChallengesForTrack', () => {
  test('returns challenges sorted by stage then id', () => {
    const trackIds = getTrackIds();
    trackIds.forEach((trackId) => {
      const challenges = getChallengesForTrack(trackId);
      for (let i = 1; i < challenges.length; i++) {
        const prev = challenges[i - 1];
        const curr = challenges[i];
        const sorted = prev.stage < curr.stage ||
          (prev.stage === curr.stage && prev.id <= curr.id);
        expect(sorted).toBe(true);
      }
    });
  });

  test('returns empty array for unknown track', () => {
    const challenges = getChallengesForTrack('nonexistent');
    expect(challenges).toEqual([]);
  });
});

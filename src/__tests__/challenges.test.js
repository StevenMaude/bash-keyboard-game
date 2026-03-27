import { describe, it, expect } from 'vitest'
import { CHALLENGES, LEARNING_PATH, pickChallenges } from '../challenges.js'

describe('learning path challenges', () => {
  it('contains a substantial set of exercises', () => {
    expect(LEARNING_PATH.length).toBeGreaterThanOrEqual(6)
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(80)
  })

  it('picks stage-balanced challenges for a run', () => {
    const rounds = pickChallenges(12, () => 0.1)
    expect(rounds).toHaveLength(12)
    const stageIds = new Set(rounds.map((round) => round.stageId))
    expect(stageIds.size).toBeGreaterThanOrEqual(6)
  })
})

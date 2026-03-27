import { describe, it, expect } from 'vitest'
import { createGame, incrementKeypress, evaluateRound, getProgress, totalBaseline } from '../game.js'

describe('game logic', () => {
  it('creates twelve rounds and baseline budget', () => {
    const game = createGame(() => 0)
    expect(game.rounds).toHaveLength(12)
    expect(totalBaseline(game)).toBeGreaterThan(0)
  })

  it('increments keypress count while active', () => {
    const game = createGame(() => 0)
    incrementKeypress(game)
    incrementKeypress(game)
    expect(game.keypresses).toBe(2)
  })

  it('advances rounds only on exact match and finishes game', () => {
    const game = createGame(() => 0)
    const first = game.rounds[0]
    expect(evaluateRound(game, first.start)).toEqual({ matched: false, finished: false })

    for (const round of game.rounds) {
      expect(evaluateRound(game, round.target).matched).toBe(true)
    }

    expect(game.finished).toBe(true)
    expect(getProgress(game)).toBe(100)
  })
})

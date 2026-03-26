import { pickChallenges } from './challenges.js'

export function createGame(random = Math.random) {
  const rounds = pickChallenges(5, random).map((challenge) => ({
    ...challenge,
    baseline: challenge.start.length
  }))

  return {
    rounds,
    currentRound: 0,
    keypresses: 0,
    finished: false,
    bestTotal: null
  }
}

export function incrementKeypress(state) {
  if (!state.finished) {
    state.keypresses += 1
  }
}

export function evaluateRound(state, value) {
  if (state.finished) {
    return { matched: false, finished: true }
  }

  const round = state.rounds[state.currentRound]
  if (!round) {
    state.finished = true
    return { matched: false, finished: true }
  }

  if (value !== round.target) {
    return { matched: false, finished: false }
  }

  state.currentRound += 1
  if (state.currentRound >= state.rounds.length) {
    state.finished = true
    if (state.bestTotal === null || state.keypresses < state.bestTotal) {
      state.bestTotal = state.keypresses
    }
    return { matched: true, finished: true }
  }

  return { matched: true, finished: false }
}

export function getProgress(state) {
  return Math.round((state.currentRound / state.rounds.length) * 100)
}

export function totalBaseline(state) {
  return state.rounds.reduce((sum, round) => sum + round.baseline, 0)
}

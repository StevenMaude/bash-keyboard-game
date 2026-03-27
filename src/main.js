import './style.css'
import {
  createGame,
  incrementKeypress,
  evaluateRound,
  getProgress,
  totalBaseline
} from './game.js'
import { applyReadlineShortcut } from './readlineShortcuts.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="game-shell">
    <header class="top">
      <h1>Bash Keyboard Edit Trainer</h1>
      <p>Edit each command from <strong>Start</strong> to <strong>Target</strong> using bash shortcuts.</p>
      <small class="hint">Readline-like keys: Ctrl+A/E/B/F/U/K/W and Alt+B/F</small>
      <small class="hint" id="runtime-hint"></small>
    </header>

    <section class="status-grid">
      <article><span>Round</span><strong id="round">1 / 12</strong></article>
      <article><span>Keypresses</span><strong id="keypresses">0</strong></article>
      <article><span>Target Max</span><strong id="target-budget">0</strong></article>
      <article><span>Best Score</span><strong id="best">—</strong></article>
    </section>

    <section class="progress-wrap">
      <label for="progress">Progress</label>
      <progress id="progress" max="100" value="0">0%</progress>
    </section>

    <section class="card">
      <h2 id="stage-title"></h2>
      <p id="stage-objective" class="hint"></p>
    </section>

    <section class="card">
      <h2>Start</h2>
      <pre id="start"></pre>
    </section>

    <section class="card">
      <h2>Target</h2>
      <pre id="target"></pre>
    </section>

    <section class="card">
      <h2>Your edit</h2>
      <textarea id="editor" rows="3" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>
      <div class="button-row">
        <button id="check" type="button">Check</button>
        <button id="restart" type="button">Try again from start</button>
      </div>
      <p id="message" aria-live="polite"></p>
    </section>
  </main>
`

const roundText = document.querySelector('#round')
const keypressText = document.querySelector('#keypresses')
const targetBudgetText = document.querySelector('#target-budget')
const bestText = document.querySelector('#best')
const runtimeHint = document.querySelector('#runtime-hint')
const progress = document.querySelector('#progress')
const stageTitle = document.querySelector('#stage-title')
const stageObjective = document.querySelector('#stage-objective')
const start = document.querySelector('#start')
const target = document.querySelector('#target')
const editor = document.querySelector('#editor')
const check = document.querySelector('#check')
const restart = document.querySelector('#restart')
const message = document.querySelector('#message')

let game = createGame()

function render() {
  const round = game.rounds[game.currentRound]
  runtimeHint.textContent =
    window.desktopEnvironment?.runtime === 'electron'
      ? 'Running in Electron desktop mode.'
      : 'Running in browser mode.'

  keypressText.textContent = String(game.keypresses)
  targetBudgetText.textContent = String(totalBaseline(game))
  bestText.textContent = game.bestTotal === null ? '—' : String(game.bestTotal)
  progress.value = getProgress(game)

  if (!round) {
    roundText.textContent = `${game.rounds.length} / ${game.rounds.length}`
    stageTitle.textContent = 'Learning path complete'
    stageObjective.textContent = 'Great work — restart to practice another randomized run.'
    start.textContent = 'Finished!'
    target.textContent = 'Finished!'
    editor.disabled = true
    check.disabled = true
    return
  }

  roundText.textContent = `${game.currentRound + 1} / ${game.rounds.length}`
  stageTitle.textContent = round.stageTitle
  stageObjective.textContent = round.objective ?? ''
  start.textContent = round.start
  target.textContent = round.target
  editor.value = round.start
  editor.disabled = false
  check.disabled = false
  editor.focus()
}

editor.addEventListener('keydown', (event) => {
  const shortcutResult = applyReadlineShortcut({
    value: editor.value,
    selectionStart: editor.selectionStart ?? 0,
    selectionEnd: editor.selectionEnd ?? 0,
    key: event.key,
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    metaKey: event.metaKey
  })

  if (shortcutResult) {
    event.preventDefault()
    incrementKeypress(game)
    editor.value = shortcutResult.value
    editor.setSelectionRange(shortcutResult.selectionStart, shortcutResult.selectionEnd)
    keypressText.textContent = String(game.keypresses)
    return
  }

  const ignored = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab']
  if (!ignored.includes(event.key)) {
    incrementKeypress(game)
    keypressText.textContent = String(game.keypresses)
  }
})

check.addEventListener('click', () => {
  const result = evaluateRound(game, editor.value)
  if (!result.matched) {
    message.textContent = 'Not yet. Keep editing until it exactly matches the target.'
    return
  }

  if (result.finished) {
    message.textContent = `Great run! Total keypresses: ${game.keypresses}.`
  } else {
    message.textContent = 'Nice! Next round loaded.'
  }

  render()
})

restart.addEventListener('click', () => {
  const best = game.bestTotal
  game = createGame()
  game.bestTotal = best
  message.textContent = 'Restarted from round 1 with a fresh challenge set.'
  render()
})

render()

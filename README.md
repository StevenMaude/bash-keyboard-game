# bash-keyboard-game

An interactive, browser-based educational game that teaches you bash keyboard editing shortcuts (GNU Readline bindings) through hands-on challenges. Edit real-looking commands using only keyboard shortcuts and try to do it in as few keypresses as possible.

**[▶ Play the game](https://stevenmaude.github.io/bash-keyboard-game/)**

---

## Features

- **28 varied challenges** covering all the major Readline shortcuts
- **Progress bar** showing how close your edit is to the target (Levenshtein distance)
- **Keystroke counter** and per-challenge optimal target
- **Star ratings** (★★★ / ★★ / ★ / ☆) based on your efficiency
- **Randomised play sessions** — 8 challenges drawn at random per session so every play is different
- **In-game shortcut reference** — no need to leave the page
- Terminal-inspired dark UI with colour-coded diff view
- No dependencies at runtime — plain ES modules, one script bundle

---

## Shortcuts Covered

| Shortcut | Action |
|---|---|
| `Ctrl+A` / `Home` | Move to beginning of line |
| `Ctrl+E` / `End` | Move to end of line |
| `Ctrl+F` / `→` | Move forward one character |
| `Ctrl+B` / `←` | Move backward one character |
| `Alt+F` | Move forward one word |
| `Alt+B` | Move backward one word |
| `Backspace` / `Ctrl+H` | Delete character before cursor |
| `Ctrl+D` / `Delete` | Delete character at cursor |
| `Ctrl+K` | Kill (cut) to end of line |
| `Ctrl+U` | Kill from start of line to cursor |
| `Ctrl+W` | Kill word backward (whitespace boundary) |
| `Alt+D` | Kill word forward (alphanumeric boundary) |
| `Ctrl+Y` | Yank (paste) from kill ring |
| `Ctrl+T` | Transpose characters around cursor |

---

## Project Structure

```
bash-keyboard-game/
├── index.html            # Entry point (loaded by Vite; also the source for GitHub Pages)
├── js/
│   ├── shortcuts.js      # BashLineEditor — pure Readline emulation logic
│   ├── challenges.js     # 28 challenge definitions + selectChallenges()
│   ├── utils.js          # levenshtein, calcProgress, getRating, renderStars
│   └── game.js           # DOM controller — connects editor to the UI
├── css/
│   └── style.css         # Terminal-inspired dark theme
├── tests/
│   ├── shortcuts.test.js # Unit tests for BashLineEditor (55 tests)
│   ├── game.test.js      # Unit tests for utility functions (14 tests)
│   └── challenges.test.js# Structural tests for challenge data (10 tests)
├── docs/                 # Built output — served by GitHub Pages
├── .devcontainer/
│   └── devcontainer.json # VS Code Dev Container (Node 20)
├── package.json
├── vite.config.js        # Builds to docs/
└── vitest.config.js      # Tests run in jsdom environment
```

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (or open in the Dev Container — see below)

### Getting started

```bash
npm install          # install dev dependencies
npm run dev          # start Vite dev server (hot reload)
npm test             # run all tests once
npm run test:watch   # run tests in watch mode
npm run build        # build to docs/ for GitHub Pages
npm run lint         # lint source files
```

### Dev Container

Open the repository in [VS Code](https://code.visualstudio.com/) with the
[Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
and click **Reopen in Container**. The container installs all dependencies
automatically (`postCreateCommand: npm install`) and forwards the Vite dev
server port so you can open the game in your browser straight away.

---

## Deploying to GitHub Pages

The `docs/` directory contains the built output and is committed to the
repository. To update it after making changes:

```bash
npm run build        # regenerates docs/
git add docs/
git commit -m "rebuild"
git push
```

In your repository settings go to **Pages → Source** and set it to
**Deploy from a branch → main / docs**.

---

## Running the Tests

```bash
npm test
```

79 tests across three suites:

- **shortcuts.test.js** — unit tests for every Readline method in `BashLineEditor`
- **game.test.js** — unit tests for `levenshtein` and `calcProgress`
- **challenges.test.js** — structural validation of all challenge objects

---

## Architecture Notes

### `BashLineEditor` (`js/shortcuts.js`)

A pure-data class with no DOM dependency. It holds a `text` string and a
`cursor` integer, and exposes one method per Readline operation plus a
`handleKey(key, ctrlKey, altKey, metaKey, shiftKey)` dispatcher. Because it
has no side effects beyond mutating its own state, it is straightforward to
unit-test and can be reused in any environment (browser or Node.js).

### Keypress interception

The visible command area is a read-only `<div>` that renders the editor state
with colour-coded character diffs. Underlying it is a 1×1-pixel invisible
`<textarea>` that has keyboard focus. Every `keydown` event is sent to
`BashLineEditor.handleKey`, which updates the state; then the div is
re-rendered and the textarea is synced. This approach prevents any browser
default text-editing behaviour from interfering with the Readline emulation.

### Progress calculation

Progress is `max(0, (d(initial, target) − d(current, target)) / d(initial, target))`
where `d` is the Levenshtein edit distance. This gives 0 at the start and 1
when the target is reached, with intermediate values reflecting how much
closer the player's edit is to the target than the initial text was.

---

## Licence

MIT

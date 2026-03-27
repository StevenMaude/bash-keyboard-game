# bash-keyboard-game

An interactive, browser-based educational game that teaches GNU Readline (bash) keyboard editing shortcuts through hands-on challenges. Edit real-looking commands using only keyboard shortcuts and try to do it in as few keypresses as possible.

**[▶ Play the game](https://stevenmaude.github.io/bash-keyboard-game/)**

---

## Features

- **48 challenges** organised into 11 focused collections — one shortcut family at a time
- **Learning Track** — work through collections in order, building skills systematically, finishing with a "Graduate" collection of mixed-technique challenges
- **Practice Mode** — 8 randomly selected challenges from all collections for quick drilling
- **Collection-complete overlay** (learn mode) shows your score and names the next collection
- **Progress bar** showing how close your edit is to the target (Levenshtein distance)
- **Keystroke counter** and per-challenge optimal target
- **Star ratings** (★★★ / ★★ / ★ / ☆) based on your efficiency
- **In-game shortcut reference** — no need to leave the page
- Terminal-inspired dark UI with colour-coded diff view

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
| `Alt+Backspace` | Kill word backward (whitespace boundary) |
| `Alt+D` | Kill word forward (alphanumeric boundary) |
| `Ctrl+Y` | Yank (paste) from kill ring |
| `Ctrl+T` | Transpose characters around cursor |

### Browser compatibility

| Shortcut | Status |
|---|---|
| `Ctrl+W` | **Closes the browser tab** — cannot be intercepted. Use `Alt+Backspace` (identical behaviour) instead. |
| `Ctrl+T` | May open a new browser tab. Challenges that use it are marked with ⚠️. |
| `Ctrl+F` | Intercepted by the window-level capture handler before the browser find bar opens. |
| Most others | Fully functional in the game. |

---

## Learning Track

Collections are presented in this order:

1. **Line Navigation** — `Ctrl+A` / `Ctrl+E`
2. **Word Navigation** — `Alt+F` / `Alt+B`
3. **Character Navigation** — `Ctrl+F` / `Ctrl+B`
4. **Character Deletion** — `Ctrl+D` / `Backspace`
5. **Kill to End** — `Ctrl+K`
6. **Kill to Start** — `Ctrl+U`
7. **Kill Word Backward** — `Alt+Backspace`
8. **Kill Word Forward** — `Alt+D`
9. **Yank (Paste)** — `Ctrl+Y`
10. **Transpose Characters** — `Ctrl+T`
11. **Graduate** — all shortcuts combined

---

## Project Structure

```
bash-keyboard-game/
├── index.html            # Entry point
├── js/
│   ├── shortcuts.js      # BashLineEditor — pure Readline emulation logic
│   ├── challenges.js     # 48 challenges in COLLECTIONS + selectChallenges()
│   ├── utils.js          # levenshtein, calcProgress, getRating, renderStars
│   └── game.js           # DOM controller — learn/practice modes, window-level keydown
├── css/
│   └── style.css         # Terminal-inspired dark theme
├── tests/
│   ├── shortcuts.test.js # Unit tests for BashLineEditor (55 tests)
│   ├── game.test.js      # Unit tests for utility functions (14 tests)
│   └── challenges.test.js# Structural tests for collection/challenge data (17 tests)
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
server port.

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

## Tests

```bash
npm test
```

86 tests across three suites:

- **shortcuts.test.js** — unit tests for every Readline method in `BashLineEditor`
- **game.test.js** — unit tests for `levenshtein` and `calcProgress`
- **challenges.test.js** — structural validation of all collection and challenge objects,
  including a rule that no hint may instruct players to press bare Ctrl+W

---

## Architecture Notes

### `BashLineEditor` (`js/shortcuts.js`)

A pure-data class with no DOM dependency. All state is `text` (string) and
`cursor` (integer). Methods return `true` when state changed, so the caller
knows whether to count the keypress.

### Keypress interception

All keyboard events are attached to `window` in the **capture phase**
(`{ capture: true }`). This fires before element-level handlers and before
most browser page-level shortcuts (Ctrl+F, Ctrl+D, etc.), allowing
`preventDefault()` to be effective. Browser process-level shortcuts (Ctrl+W,
Ctrl+T, Ctrl+N) cannot be intercepted regardless of phase; these are
documented in the How-to-Play screen and in the affected challenge hints.

### Browser-safe kill-word

`Ctrl+W` closes the browser tab on all platforms and cannot be blocked by
JavaScript. The game uses `Alt+Backspace` (readline's Meta+Backspace binding)
as the browser-safe equivalent — it performs the identical kill-word-backward
action. Challenge hints never instruct players to press bare `Ctrl+W`.

### Progress calculation

Progress is `max(0, (d(initial, target) − d(current, target)) / d(initial, target))`
where `d` is the Levenshtein edit distance. This gives 0 at the start and 1
when the target is reached.

---

## Licence

MIT

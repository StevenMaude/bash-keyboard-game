# bash-keyboard-game

An educational game that teaches GNU Readline (bash) keyboard editing shortcuts through hands-on challenges. Edit real-looking commands using only keyboard shortcuts and try to do it in as few keypresses as possible.

**[▶ Play the web version](https://stevenmaude.github.io/bash-keyboard-game/)** (some shortcuts limited by browser)

The primary version is the **Electron desktop app**, where all shortcuts including `Ctrl+W`, `Ctrl+T` etc. work without any browser interference.

---

## Features

- **90 challenges** organised into 12 focused collections — one shortcut family at a time
- **Learning Track** — work through collections in order, building skills systematically, finishing with a "Graduate" collection of mixed-technique challenges
- **Practice Mode** — 8 randomly selected challenges from all collections for quick drilling
- **Collection-complete overlay** (learn mode) shows your score and names the next collection
- **Progress bar** showing how close your edit is to the target (Levenshtein distance)
- **Keystroke counter** and per-challenge optimal target
- **Star ratings** (★★★ / ★★ / ★ / ☆) based on your efficiency
- **In-game shortcut reference** — no need to leave the app

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
| `Ctrl+K` | Cut to end of line |
| `Ctrl+U` | Cut from start of line to cursor |
| `Ctrl+W` | Cut word backward (whitespace boundary) |
| `Alt+D` | Cut word forward (alphanumeric boundary) |
| `Ctrl+Y` | Yank (paste) from cut ring |
| `Ctrl+T` | Transpose characters around cursor |

> **Note** — In the browser build, `Ctrl+W` closes the tab and `Ctrl+T` opens a new one. These shortcuts work normally in the Electron app.

---

## Learning Track

Collections are presented in this order:

1. **Line Navigation** — `Ctrl+A` / `Ctrl+E`
2. **Word Navigation** — `Alt+F` / `Alt+B`
3. **Character Navigation** — `Ctrl+F` / `Ctrl+B`
4. **Character Deletion** — `Ctrl+D` / `Backspace`
5. **Cut to End** — `Ctrl+K`
6. **Cut to Start** — `Ctrl+U`
7. **Cut Word Backward** — `Ctrl+W`
8. **Cut Word Forward** — `Alt+D`
9. **Yank (Paste)** — `Ctrl+Y`
10. **Transpose Characters** — `Ctrl+T`
11. **Mixed Techniques** — multiple shortcuts per challenge
12. **Graduate** — complex, multi-step real-world scenarios

---

## Project Structure

```
bash-keyboard-game/
├── index.html               # Entry point (web + Electron renderer)
├── electron/
│   ├── main.js              # Electron main process
│   └── preload.js           # Context bridge — exposes isElectron flag
├── js/
│   ├── shortcuts.js         # BashLineEditor — pure Readline emulation logic
│   ├── challenges.js        # 90 challenges in 12 COLLECTIONS + selectChallenges()
│   ├── utils.js             # levenshtein, calcProgress, getRating, renderStars
│   └── game.js              # DOM controller — learn/practice modes, keydown
├── css/
│   └── style.css            # Terminal-inspired dark theme
├── tests/
│   ├── shortcuts.test.js    # Unit tests for BashLineEditor (55 tests)
│   ├── game.test.js         # Unit tests for utility functions (14 tests)
│   └── challenges.test.js   # Structural tests for challenge data (17 tests)
├── dist/renderer/           # Built Electron renderer (generated)
├── docs/                    # Built web output for GitHub Pages (generated)
├── .devcontainer/
│   └── devcontainer.json    # Dev Container with Node 20 + desktop + VNC
├── Dockerfile               # Run Electron via Xvfb + VNC in a container
├── docker-entrypoint.sh     # Container start script
├── package.json
├── vite.config.js           # Dual build: web (docs/) and Electron (dist/renderer/)
└── vitest.config.js         # Tests run in jsdom environment
```

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 20+

### Getting started

```bash
npm install               # install all dependencies

# Web development
npm run dev               # Vite dev server with hot reload
npm run build             # build to docs/ for GitHub Pages

# Electron development
npm run electron:dev      # Vite dev server + Electron (hot reload)
npm run build:electron    # build Electron renderer to dist/renderer/
npm run electron          # run the built Electron app

# Packaging (creates an AppImage / dmg / exe)
npm run dist

# Tests and lint
npm test                  # run all tests once
npm run test:watch        # tests in watch mode
npm run lint              # lint source files
```

### Dev Container (with desktop + VNC)

Open the repository in [VS Code](https://code.visualstudio.com/) with the
[Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
and click **Reopen in Container**.

The container:
- Installs all Node dependencies and pre-builds the Electron renderer
- Provides a lightweight **Fluxbox desktop** accessible via **noVNC in the browser** (port **6080**) or a native VNC client (port **5901**, password: `vscode`)
- Forwards the Vite dev server port (5173)

Once inside, run `npm run electron:dev` and connect to `localhost:6080` to see the app.

---

## Docker

```bash
# Build the image
docker build -t bash-keyboard-game .

# Run with VNC exposed on port 5900
docker run --rm -it -p 5900:5900 --shm-size=512m bash-keyboard-game
```

Connect with any VNC viewer to `localhost:5900` (no password). The game launches automatically inside a virtual desktop.

---

## Deploying to GitHub Pages

The `docs/` directory contains the built web output and is committed to the repository. To update it after making changes:

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
- **challenges.test.js** — structural validation of all collection and challenge objects

---

## Architecture Notes

### `BashLineEditor` (`js/shortcuts.js`)

A pure-data class with no DOM dependency. All state is `text` (string) and
`cursor` (integer). Methods return `true` when state changed, so the caller
knows whether to count the keypress.

### Electron vs. browser

When running in **Electron** (primary build), the game has full control over every key combination — including `Ctrl+W`, `Ctrl+T`, `Ctrl+D`, etc. The preload script exposes `window.electronAPI.isElectron = true` so `game.js` can adapt the shortcut reference table and unlock all shortcuts.

When running as a **web page**, the keydown listener is attached to `window` in the capture phase (`{ capture: true }`) so it fires before most page-level browser shortcuts. `Ctrl+W` (close tab) and `Ctrl+T` (new tab) still cannot be intercepted — the game detects the browser environment and guides users to use `Alt+Backspace` instead.

### Progress calculation

Progress is `max(0, (d(initial, target) − d(current, target)) / d(initial, target))`
where `d` is the Levenshtein edit distance. This gives 0 at the start and 1
when the target is reached.

---

## Licence

MIT

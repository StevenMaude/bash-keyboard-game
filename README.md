# Bash Keyboard Game

An educational game to learn and practice bash (readline) keyboard edit
shortcuts. Edit command-line text to match a target using as few keypresses as
possible.

## Play

Open `index.html` in a browser, or visit the
[GitHub Pages deployment](https://stevenmaude.github.io/bash-keyboard-game/).

## How it works

1. Choose a **learning track** to study specific shortcuts, or play a
   **random mix** of challenges.
2. Each round shows a **starting command** and a **target command**.
3. Edit the text using bash keyboard shortcuts to match the target.
4. Try to meet or beat the **par** (ideal keypress count) for each round.
5. After completing all rounds your total score and a per-round breakdown are
   shown.
6. Press **Play Again** to try again.

## Learning tracks

Each track focuses on a specific set of shortcuts and progresses through four
stages: introduction, practice, advanced, and graduation.

| Track             | Focus                                           |
| ----------------- | ----------------------------------------------- |
| 🧭 Navigation     | Ctrl+A/E/B/F, Alt+B/F – moving the cursor      |
| ✂️ Killing & Deleting | Ctrl+K/U/W/D/H, Alt+D – removing text      |
| 📋 Kill & Yank    | Ctrl+W/K/U + Ctrl+Y – cut and paste             |
| 🔀 Transpose      | Ctrl+T – swapping characters to fix typos       |
| 🔗 Combined Skills| Multi-shortcut editing                           |
| 🎓 Graduation     | Complex challenges combining all techniques     |

## Supported shortcuts

| Shortcut | Action                        |
| -------- | ----------------------------- |
| Ctrl+A   | Move to beginning of line     |
| Ctrl+E   | Move to end of line           |
| Ctrl+B   | Move back one character       |
| Ctrl+F   | Move forward one character    |
| Alt+B    | Move back one word            |
| Alt+F    | Move forward one word         |
| Ctrl+D   | Delete character under cursor |
| Ctrl+H   | Delete character before cursor|
| Ctrl+K   | Kill from cursor to end       |
| Ctrl+U   | Kill from cursor to start     |
| Ctrl+W   | Kill word backward            |
| Alt+D    | Kill word forward             |
| Ctrl+Y   | Yank (paste) last killed text |
| Ctrl+T   | Transpose two characters      |

Arrow keys, Home, End, Backspace, and Delete also work as expected.

### Browser compatibility note

Some browsers intercept certain keyboard shortcuts (e.g. Ctrl+W closes a tab,
Ctrl+T opens a new tab). The game uses capture-phase event listeners with
`preventDefault` and `stopPropagation` to override these, and also handles
macOS where Alt+key produces special characters by falling back to
`event.code`. If a shortcut still conflicts with your browser, consider using a
different browser or disabling the conflicting shortcut.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Setup

```bash
npm install
```

### Running tests

```bash
npm test
```

### Dev Container

A `.devcontainer/devcontainer.json` is included for VS Code / GitHub
Codespaces. It uses the Node 22 image, installs dependencies automatically,
and includes useful VS Code extensions. The Live Server extension is configured
to forward port 5500 for local preview.

## Project structure

```
├── index.html              # Main game page (deploy this)
├── css/style.css           # Game styling
├── js/
│   ├── challenges.js       # 85 challenges + track metadata
│   ├── bash-input.js       # Bash readline emulation
│   ├── game.js             # Game engine (tracks, rounds, scoring)
│   └── app.js              # DOM wiring
├── tests/
│   ├── bash-input.test.js  # BashInput unit tests
│   ├── game.test.js        # Game engine tests
│   └── challenges.test.js  # Challenge & track data validation
├── .devcontainer/          # VS Code dev container config
├── package.json
└── jest.config.js
```

## License

MIT

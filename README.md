# Bash Keyboard Game

An educational game to learn and practice bash (readline) keyboard edit
shortcuts. Edit command-line text to match a target using as few keypresses as
possible.

## Play

Open `index.html` in a browser, or visit the
[GitHub Pages deployment](https://stevenmaude.github.io/bash-keyboard-game/).

## How it works

1. Each round shows a **starting command** and a **target command**.
2. Edit the text using bash keyboard shortcuts to match the target.
3. Try to meet or beat the **par** (ideal keypress count) for each round.
4. After 10 rounds your total score and a per-round breakdown are shown.
5. Press **Play Again** to try a new random set of challenges.

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
│   ├── challenges.js       # 40 challenge definitions
│   ├── bash-input.js       # Bash readline emulation
│   ├── game.js             # Game engine (rounds, scoring)
│   └── app.js              # DOM wiring
├── tests/
│   ├── bash-input.test.js  # BashInput unit tests
│   ├── game.test.js        # Game engine tests
│   └── challenges.test.js  # Challenge data validation
├── .devcontainer/          # VS Code dev container config
├── package.json
└── jest.config.js
```

## License

MIT

# bash-keyboard-game (Electron)

An Electron desktop educational game for practicing Bash line-edit keyboard shortcuts without browser keybinding conflicts.

## Features

- Electron desktop runtime to avoid browser shortcut collisions
- Large staged learning path (80+ exercises) across beginner-to-expert drills
- Randomized 12-round sessions sampled from all learning stages
- Start and target command shown for each challenge
- Keypress tracking while editing
- Readline-like shortcuts in the editor (Ctrl+A/E/B/F/U/K/W and Alt+B/F)
- Target keypress budget and progress bar per run
- Restart button to replay from round 1

## Development

```bash
npm install
npm run build:renderer
npm run start
```

For iterative renderer development you can still use:

```bash
npm run dev:renderer
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

Build artifacts are committed in:

- `dist/` (renderer static build)
- `electron-dist/` (packaged runnable project layout for desktop app testing)

## Devcontainer desktop + VNC

The devcontainer includes Xvfb + Fluxbox + x11vnc + noVNC.

- VNC: `5901`
- noVNC web client: `6080`

After container startup, run:

```bash
npm run build
npm run start
```

Then connect through noVNC to interact with the Electron app.

## Docker build

```bash
docker build -t bash-keyboard-game-electron .
docker run --rm -it bash-keyboard-game-electron
```

This builds and launches the Electron app using Xvfb in the container.

## UI Preview

![Game UI preview](./game-ui.png)

#!/bin/sh
# docker-entrypoint.sh — starts Xvfb, a window manager, x11vnc and the game.
set -e

DISPLAY_NUM="${DISPLAY_NUM:-1}"
SCREEN_SIZE="${SCREEN_SIZE:-1280x800x24}"
VNC_PORT="${VNC_PORT:-5900}"

export DISPLAY=":${DISPLAY_NUM}"

# Start virtual framebuffer
Xvfb "${DISPLAY}" -screen 0 "${SCREEN_SIZE}" -ac +extension RANDR &
XVFB_PID=$!
echo "Xvfb started (PID ${XVFB_PID}, display ${DISPLAY})"

# Give Xvfb a moment to be ready
sleep 1

# Start a minimal window manager
fluxbox &
echo "fluxbox started"

# Start the game
npm --prefix /app run electron &
GAME_PID=$!
echo "Electron game started (PID ${GAME_PID})"

# Start VNC server (no password, share existing display)
x11vnc -display "${DISPLAY}" -nopw -forever -rfbport "${VNC_PORT}" -shared &
echo "x11vnc listening on port ${VNC_PORT}"

# Wait for the game process; if it exits, tear down everything
wait "${GAME_PID}"

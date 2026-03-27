#!/usr/bin/env bash
set -euo pipefail

export DISPLAY=${DISPLAY:-:1}

if ! pgrep -x Xvfb >/dev/null 2>&1; then
  Xvfb "$DISPLAY" -screen 0 1920x1080x24 -nolisten tcp >/tmp/xvfb.log 2>&1 &
fi

sleep 1

if ! pgrep -x fluxbox >/dev/null 2>&1; then
  fluxbox >/tmp/fluxbox.log 2>&1 &
fi

if ! pgrep -f "x11vnc .*${DISPLAY}" >/dev/null 2>&1; then
  x11vnc -display "$DISPLAY" -forever -shared -nopw -rfbport 5901 >/tmp/x11vnc.log 2>&1 &
fi

if ! pgrep -f "websockify .*6080" >/dev/null 2>&1; then
  websockify --web=/usr/share/novnc/ 6080 localhost:5901 >/tmp/novnc.log 2>&1 &
fi

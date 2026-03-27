FROM mcr.microsoft.com/devcontainers/javascript-node:20

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install -y --no-install-recommends \
    xvfb \
    x11vnc \
    fluxbox \
    websockify \
    novnc \
    dbus-x11 \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV DISPLAY=:1
WORKDIR /workspaces/bash-keyboard-game

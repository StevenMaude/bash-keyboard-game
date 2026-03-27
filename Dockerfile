# Dockerfile — runs the Bash Keyboard Game (Electron) inside a container
# with a virtual X11 display and an x11vnc server so you can connect via VNC.
#
# Build:
#   docker build -t bash-keyboard-game .
#
# Run (VNC on port 5900):
#   docker run --rm -it -p 5900:5900 --shm-size=512m bash-keyboard-game
#
# Connect with any VNC viewer to localhost:5900 (no password by default).
# Or run headlessly (tests / CI) — the game will start but no display appears.

FROM node:20-bookworm-slim

# ── System dependencies ───────────────────────────────────────────────────────
# Electron needs a large set of shared libraries and a display server.
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Virtual framebuffer and window manager
    xvfb \
    fluxbox \
    # VNC server so we can view the desktop remotely
    x11vnc \
    # Electron / Chromium runtime dependencies
    libgtk-3-0 \
    libdrm2 \
    libgbm1 \
    libasound2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libxkbcommon0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    # Fonts
    fonts-liberation \
    # Clean up
    && rm -rf /var/lib/apt/lists/*

# ── Application ────────────────────────────────────────────────────────────────
WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

# Pre-build the Electron renderer (so the container is ready to launch)
RUN npm run build:electron

# ── Entrypoint ────────────────────────────────────────────────────────────────
# Starts Xvfb, a minimal window manager, the game, and an x11vnc server.
# VNC is exposed on port 5900 with no password (suitable for dev/demo use).
EXPOSE 5900

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

FROM node:20-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb \
    libnss3 \
    libxss1 \
    libasound2 \
    libx11-xcb1 \
    libxtst6 \
    libgtk-3-0 \
    libgbm1 \
    libxrandr2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV DISPLAY=:99
CMD ["bash", "-lc", "Xvfb :99 -screen 0 1280x800x24 & npm run start:dist"]

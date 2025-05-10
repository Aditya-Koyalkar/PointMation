# 1. Start from a slim Python base
FROM python:3.10-slim

# 2. Install system deps: Node.js, Manim prerequisites, LaTeX, FFmpeg

RUN apt-get update && apt-get install -y --no-install-recommends \
      curl gnupg ca-certificates \
      ffmpeg \
      libcairo2-dev pkg-config libpango1.0-dev libgdk-pixbuf2.0-0 libffi-dev \
      texlive texlive-latex-extra texlive-fonts-recommended \
      git build-essential \
    && rm -rf /var/lib/apt/lists/*

# 3. Install Node.js LTS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 4. Install Manim
RUN pip install --upgrade pip \
    && pip install manim
    
# Install Manim

RUN npm install -g bun

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
# COPY package.json ./
# COPY apps/code-worker/package.json ./apps/code-worker/
# COPY apps/web/package.json ./apps/web/
# COPY packages/db/package.json ./packages/db/
# COPY packages/eslint-config/package.json ./packages/eslint-config/
# COPY packages/typescript-config/package.json ./packages/typescript-config
# COPY packages/ui/package.json ./packages/ui

COPY . .


RUN bun install

# Copy the entire mono repo excluding dirs in dockerignore file


#build all the packages 
RUN bun run build

#Generate prisma client
RUN npx  prisma generate --schema=packages/db/prisma/schema.prisma


WORKDIR /app/apps/code-worker


# Expose the port your Express server runs on
EXPOSE 4000

# Start the server
CMD ["bun", "start"]

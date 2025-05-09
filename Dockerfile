# Base image with Python and Node.js
FROM node:18-bullseye

# Install system dependencies for Manim
RUN apt-get update && apt-get install -y \
    python3-pip \
    ffmpeg \
    libcairo2 \
    pango1.0-tools \
    fonts-freefont-ttf \
    texlive \
    texlive-latex-extra \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Manim
RUN pip install manim

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

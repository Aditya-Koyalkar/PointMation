# Use prebuilt Manim image
FROM manimcommunity/manim:stable

# Switch to root user to install system dependencies
USER root

# Install curl and unzip
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    nodejs \
    npm

RUN curl -fsSL https://bun.sh/install | bash \
    && echo 'export PATH="/root/.bun/bin:$PATH"' >> /root/.bashrc

    ENV PATH="/root/.bun/bin:$PATH:/usr/local/bin:$PATH"
    

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

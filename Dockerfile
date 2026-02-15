FROM node:20-slim

# Install staticrypt CLI globally
RUN npm install -g staticrypt

WORKDIR /app

# Copy package files and install dependencies
COPY app/package.json app/tsconfig.json ./
RUN npm install

# Copy source and build TypeScript
COPY app/src ./src
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

# Copy public assets
COPY app/public ./public

# Environment
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "src/server.js"]

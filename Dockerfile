FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "dev"]
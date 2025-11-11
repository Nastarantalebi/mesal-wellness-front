# ---------- build stage ----------
FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- runtime stage ----------
FROM node:22-slim AS runner
WORKDIR /app

# copy static assets only
COPY --from=builder /app/dist ./dist

# lightweight global install of the tiny Serve CLI
RUN npm install --global serve

EXPOSE 3000
CMD ["serve", "-s", "dist"]
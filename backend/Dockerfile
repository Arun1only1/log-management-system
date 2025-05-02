FROM node:22 AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# ✅ explicitly copy log files to ensure they're in build context
COPY src/logs-data/log-files ./src/logs-data/log-files

RUN pnpm run build

# --- run stage ---
FROM node:22
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

#  copy logs from builder stage
COPY --from=builder /app/src/logs-data/log-files /log-files


RUN pnpm install --prod --frozen-lockfile

EXPOSE 8080

CMD ["node", "dist/main"]

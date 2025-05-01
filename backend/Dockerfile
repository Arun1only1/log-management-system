# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS app
RUN pnpm run build

# Stage 2: Run the application
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Set PNPM_HOME and update PATH to avoid global bin directory errors
ENV PNPM_HOME=/usr/local/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Install pnpm and NestJS CLI globally
RUN npm install -g pnpm && \
    mkdir -p $PNPM_HOME && \
    pnpm install -g @nestjs/cli

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["pnpm", "run", "start:prod"]
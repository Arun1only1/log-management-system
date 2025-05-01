# Stage 1: Build the React Vite app
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to leverage Docker cache
COPY package*.json ./

# Install dependencies (including dev dependencies for Vite and TypeScript)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app (generates static files in /app/dist)
RUN npm run build

# Stage 2: Serve the static files using serve
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Install serve globally to serve static files
RUN npm install -g serve

# Copy the built static files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 5173 (default for serving the app)
EXPOSE 5173

# Command to serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]
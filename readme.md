# Project Title

The Log Management System is a comprehensive platform designed to streamline the management of nginx and apache logs.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Arun1only1/log-management-system
   cd log-management-system
   ```

2. Create a `.env` file in the backend directory and configure the necessary environment variables:

   ```env
    NODE_ENV=dev
    API_PORT=8080
    SYSTEM_LANGUAGE=EN
    DB_HOST=8080
    DB_NAME=
    DB_OPTIONS=
    DB_PASSWORD=
    DB_USERNAME=
    JWT_ACCESS_TOKEN_SECRET=
    JWT_ACCESS_TOKEN_EXPIRES_IN=
    JWT_REFRESH_TOKEN_SECRET=
    JWT_REFRESH_TOKEN_EXPIRES_IN=
    FRONTEND_URL=http://localhost:5173
   ```

3. Create a `.env` file in the ui directory and configure the necessary environment variables:

   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. Build and start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to see the frontend.

2. The backend API will be available at `http://localhost:8080`.

3. Hit `http://localhost:8080/logs/seed` to seed the database with logs.

### Stopping the Services

To stop the Docker services, run:

```sh
docker-compose down
```

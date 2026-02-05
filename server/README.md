# 8Words Server Roadmap

This document outlines the development roadmap for the 8Words backend.

## Phase 1: Project Setup
- [ ] Initialize a new Node.js project (`npm init`).
- [ ] Install dependencies:
    -   `express`: Web framework.
    -   `typescript`, `ts-node`, `@types/node`, `@types/express`: TypeScript support.
    -   `cors`: Cross-Origin Resource Sharing.
    -   `dotenv`: Environment variable management.
    -   `pg`: PostgreSQL client.
- [ ] Configure TypeScript (`tsconfig.json`).
- [ ] Set up ESLint and Prettier.
- [ ] Create a basic Express server entry point (`src/index.ts`) that listens on a port defined in `.env`.

## Phase 2: Database Setup
- [ ] Set up a local PostgreSQL database.
- [ ] Create a database connection module (`src/db/index.ts`) using `pg.Pool`.
- [ ] Create a migration script (`src/db/migrate.ts`) to create the `word_sets` table:
    ```sql
    CREATE TABLE IF NOT EXISTS word_sets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        words TEXT NOT NULL,
        published_at TIMESTAMP WITH TIME ZONE
    );
    ```
- [ ] Create a seed script (`src/db/seed.ts`) to insert sample word sets for testing.
- [ ] Add `npm` scripts to run migrations and seeds.

## Phase 3: API Implementation
- [ ] Implement `GET /api/word-sets`:
    -   Query the database for all word sets.
    -   Return a list of lightweight objects (id, title, published_at).
    -   Order by `published_at` descending.
- [ ] Implement `GET /api/word-sets/:id`:
    -   Query the database for a specific word set by ID.
    -   Return the full object including the `words` list.
    -   Handle 404 Not Found if the ID does not exist.
- [ ] Add error handling middleware (logger, generic error response).

## Phase 4: Testing & Polish
- [ ] Add basic tests for the endpoints (using `jest` and `supertest`).
- [ ] Ensure proper error messages are returned.
- [ ] Verify CORS settings allow requests from the client.

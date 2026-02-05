# 8Words

8Words is a single player game where the objective is to guess a series of related words. Each word is related to the last, and you receive the first word to get you started.

## Overview
This is a monorepo which implements the 8Words game.

## Stack
### Frontend
- Typescript
- React
- Tailwind

### Backend
- Typescript
- Express

### Database
- Postgres

#### Schema
There will be one table: `word_sets`

A word set refers to the collection of related words. It will contain:
- `id` (Integer): Auto-incrementing ID, primary key.
- `title` (String): The title of the word set (e.g., "Birds" or "Esoteric Journey from Fire to Flying Cars").
- `type` (String): The format of the connecting words (e.g., "last word only" or "all words"). This currently informs the UI about the nature of the connection.
- `words` (String): Comma-separated list of words to make up the set (e.g., "feather,bird,sky,blue").
- `published_at` (DateTime): Nullable. Date this word set was made playable.

## Gameplay

1.  **Selection**: The game starts by selecting a word set (entry) to play. By default, the most recent published entry is selected.
2.  **Start**: The player is presented with the first word fully revealed.
3.  **Progression**:
    -   The player sees the first letter of the *next* word and blanks representing the remaining letters (revealing the length).
    -   The player attempts to guess the word.
4.  **Guessing**:
    -   Each guess is recorded locally.
    -   If the guess is correct, the word is revealed, and the game advances to the next word in the chain.
    -   If the guess is incorrect, it counts against the allowed number of guesses.
5.  **Win/Loss**:
    -   **Win**: The player successfully guesses all words in the set.
    -   **Loss**: The player runs out of guesses for a specific word. The correct word is then revealed to show what they missed.

## API Specification

The Client communicates with the Server via a REST API.

### Endpoints

#### `GET /api/word-sets`
Returns a list of available word sets. Use this to populate the selection screen.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Birds",
    "published_at": "2023-10-27T10:00:00Z"
  },
  ...
]
```

#### `GET /api/word-sets/:id`
Returns the full details of a specific word set. Note: This endpoint returns the solution (`words`). The client is responsible for keeping this hidden from the user until they guess correctly.

**Response:**
```json
{
  "id": 1,
  "title": "Birds",
  "type": "standard",
  "words": "feather,bird,sky,blue",
  "published_at": "2023-10-27T10:00:00Z"
}
```

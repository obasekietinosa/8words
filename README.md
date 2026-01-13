# 8Words

8Words is a single player game where the objective is to guess a series of related words. Each word is related to the last and you receive the first word to get you started.

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
There will be one table:
`word_sets`
A word set refers to the collection of related words. It will contain:
- id (auto incrementing ID, primary key)
- title (string, the title of the wird set, e.g "birds" or "esoteric journey from fire to flying cars"
- words (string, comma seperated list of words to make up the set)
- published_at (datetime, nullable, date this word set was made playable) 

## Gameplay
Game starts by selecting which entry to play. We can default to the most recent entry.

The player received the first word in full along with the first letter of the next word and the length of the unknown word.

The player will attempt guesses on the current unknown word. Esch guess will be recorded on the client and once the plager is of guesses they will have lost the game. At the end we show them what the word they lost on was.

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

## Gameplay
Game starts by selecting which entry to play. We can default to the most recent entry.

The player received the first word in full along with the first letter of the next word and the length of the unknown word.

The player will attempt guesses on the current unknown word. Esch guess will be recorded on the client and once the plager is of guesses they will have lost the game. At the end we show them what the word they lost on whas

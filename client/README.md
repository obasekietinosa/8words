# 8Words Client Roadmap

This document outlines the development roadmap for the 8Words frontend.

## Phase 1: Project Setup
- [ ] Initialize a new Vite project with React and TypeScript (`npm create vite@latest client -- --template react-ts`).
- [ ] Install dependencies:
    -   `tailwindcss`, `postcss`, `autoprefixer`: CSS framework.
    -   `axios` or `fetch`: API client.
    -   `react-router-dom`: Routing (optional, but good for structure).
- [ ] Configure Tailwind CSS.
- [ ] Set up project structure (components, hooks, services, types).

## Phase 2: Core Logic (State Management)
- [ ] Define TypeScript interfaces for `WordSet` and `GameState`.
- [ ] Create a custom hook `useGame(wordSet)`:
    -   **State**: `currentWordIndex`, `guesses` (array of strings), `status` ('playing', 'won', 'lost'), `revealedWords` (boolean array).
    -   **Actions**: `submitGuess(guess)`, `revealWord()`, `resetGame()`.
    -   **Logic**:
        -   Check guess against current target word.
        -   Handle correct guess: Reveal word, increment index.
        -   Handle incorrect guess: Decrement allowed guesses (if we track count) or just record failure.
        -   Detect Game Over (Win/Loss).

## Phase 3: UI Components
- [ ] **Home Screen (`/`)**:
    -   Fetch and display a list of available word sets.
    -   Clicking an item navigates to the Game Screen with that ID.
- [ ] **Game Screen (`/play/:id`)**:
    -   **Header**: Title and current status.
    -   **WordChain**:
        -   Display the list of words.
        -   Revealed words are shown fully.
        -   Current target word shows first letter + blanks.
        -   Future words are hidden (or just blanks).
    -   **GuessInput**: Text input for the user to type their guess.
    -   **Feedback**: Visual cues for correct/incorrect guesses.
- [ ] **End Screen**:
    -   Shown when `status` is 'won' or 'lost'.
    -   Display summary message.
    -   "Back to Home" button.

## Phase 4: Integration
- [ ] Create an API service to fetch data from the backend.
- [ ] Integrate API calls into the Home and Game screens.
- [ ] Add loading states and error handling for network requests.

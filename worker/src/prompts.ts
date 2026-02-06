export const PROMPTS = [
  {
    type: 'Chain',
    text: "Generate a creative word set for a word guessing game. This set must be a 'Chain' type, which means it is a sequence of 8 words where each word is related to the previous one (e.g., sun -> light -> float -> butterfly -> hurricane). The 'type' field in the response MUST be 'Chain'."
  },
  {
    type: 'Theme',
    text: "Generate a creative word set for a word guessing game. This set must be a 'Theme' type, which means it is a set of 8 words that all follow a specific theme (e.g., sun -> stars -> asteroid -> planet -> solar system). The 'type' field in the response MUST be 'Theme'."
  }
];

export const getPrompt = () => {
    const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    return randomPrompt.text;
};

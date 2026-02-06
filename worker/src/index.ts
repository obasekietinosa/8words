import { generateWordSet } from './gemini';
import { query } from './db';
import { getPrompt } from './prompts';

const main = async () => {
  const prompt = process.argv[2] || getPrompt();

  console.log(`Starting generation with prompt: "${prompt}"`);

  try {
    const data = await generateWordSet(prompt);
    console.log("Generated data:", data);

    const wordsString = data.words.join(',');

    const text = 'INSERT INTO word_sets (title, type, words, published_at) VALUES ($1, $2, $3, NOW()) RETURNING id';
    const values = [data.title, data.type, wordsString];

    const result = await query(text, values);

    console.log(`Successfully inserted word set with ID: ${result.rows[0].id}`);
    process.exit(0);
  } catch (error) {
    console.error("Error generating or inserting word set:", error);
    process.exit(1);
  }
};

main();

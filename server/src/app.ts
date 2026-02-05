import express from 'express';
import cors from 'cors';
import wordSetsRouter from './routes/wordSets';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/word-sets', wordSetsRouter);

app.get('/', (req, res) => {
  res.send('8Words API is running');
});

export default app;

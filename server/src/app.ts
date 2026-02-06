import express from 'express';
import cors from 'cors';
import wordSetsRouter from './routes/wordSets';

const app = express();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : '*',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/word-sets', wordSetsRouter);

app.get('/', (req, res) => {
  res.send('8Words API is running');
});

export default app;

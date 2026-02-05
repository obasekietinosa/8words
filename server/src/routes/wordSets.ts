import { Router, Request, Response } from 'express';
import * as WordSetModel from '../models/wordSet';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const wordSets = await WordSetModel.findAll();
    res.json(wordSets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  try {
    const wordSet = await WordSetModel.findById(id);
    if (wordSet) {
      res.json(wordSet);
    } else {
      res.status(404).json({ error: 'Word Set not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

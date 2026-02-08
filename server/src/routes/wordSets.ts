import { Router, Request, Response } from 'express';
import * as WordSetModel from '../models/wordSet';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { wordSets, total } = await WordSetModel.findAll(page, limit);

    res.json({
      data: wordSets,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/random', async (req: Request, res: Response) => {
  try {
    const id = await WordSetModel.findRandomId();
    if (id) {
      res.json({ id });
    } else {
      res.status(404).json({ error: 'No word sets found' });
    }
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

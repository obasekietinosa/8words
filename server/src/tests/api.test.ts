import request from 'supertest';
import app from '../app';
import * as WordSetModel from '../models/wordSet';

// Mock the model
jest.mock('../models/wordSet');

const mockedWordSetModel = WordSetModel as jest.Mocked<typeof WordSetModel>;

describe('Word Sets API', () => {
  const mockWordSets = [
    { id: 1, title: 'Test Set 1', published_at: new Date('2023-01-01') },
    { id: 2, title: 'Test Set 2', published_at: new Date('2023-01-02') },
  ];

  const mockWordSetDetail = {
    id: 1,
    title: 'Test Set 1',
    type: 'standard',
    words: 'word1,word2',
    published_at: new Date('2023-01-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/word-sets', () => {
    it('should return a list of word sets', async () => {
      mockedWordSetModel.findAll.mockResolvedValue(mockWordSets);

      const res = await request(app).get('/api/word-sets');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].title).toBe('Test Set 1');
      // Date is serialized to string in JSON
      expect(res.body[0].published_at).toBe(mockWordSets[0].published_at.toISOString());
    });

    it('should handle errors', async () => {
      mockedWordSetModel.findAll.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/word-sets');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /api/word-sets/:id', () => {
    it('should return a specific word set', async () => {
      mockedWordSetModel.findById.mockResolvedValue(mockWordSetDetail);

      const res = await request(app).get('/api/word-sets/1');

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Set 1');
      expect(res.body.words).toBe('word1,word2');
    });

    it('should return 404 if not found', async () => {
      mockedWordSetModel.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/word-sets/999');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Word Set not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/word-sets/abc');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid ID' });
    });
  });
});

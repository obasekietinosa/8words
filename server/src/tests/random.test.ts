import request from 'supertest';
import app from '../app';
import * as WordSetModel from '../models/wordSet';

// Mock the model
jest.mock('../models/wordSet');

const mockedWordSetModel = WordSetModel as jest.Mocked<typeof WordSetModel>;

describe('Random Word Set API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/word-sets/random', () => {
    it('should return a random word set ID', async () => {
      mockedWordSetModel.findRandomId.mockResolvedValue(123);

      const res = await request(app).get('/api/word-sets/random');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 123 });
    });

    it('should return 404 if no word sets found', async () => {
      mockedWordSetModel.findRandomId.mockResolvedValue(null);

      const res = await request(app).get('/api/word-sets/random');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'No word sets found' });
    });

    it('should handle errors', async () => {
      mockedWordSetModel.findRandomId.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/word-sets/random');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
  });
});

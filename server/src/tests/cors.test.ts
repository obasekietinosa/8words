import request from 'supertest';

// Mock the DB module to prevent connection attempts
jest.mock('../db', () => ({
  query: jest.fn(),
  default: {
    query: jest.fn(),
  }
}));

describe('CORS Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
    // Clear env var before each test
    delete process.env.CORS_ALLOWED_ORIGINS;
  });

  it('should allow all origins when CORS_ALLOWED_ORIGINS is not set', async () => {
    const { default: app } = await import('../app');
    const res = await request(app).get('/');
    // Default cors() sets Access-Control-Allow-Origin to '*'
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });

  it('should allow specific origin when CORS_ALLOWED_ORIGINS is set', async () => {
    process.env.CORS_ALLOWED_ORIGINS = 'http://trusted.com';
    const { default: app } = await import('../app');

    const res = await request(app)
      .get('/')
      .set('Origin', 'http://trusted.com');

    expect(res.headers['access-control-allow-origin']).toBe('http://trusted.com');
  });

  it('should not allow disallowed origin when CORS_ALLOWED_ORIGINS is set', async () => {
    process.env.CORS_ALLOWED_ORIGINS = 'http://trusted.com';
    const { default: app } = await import('../app');

    const res = await request(app)
      .get('/')
      .set('Origin', 'http://malicious.com');

    // cors middleware does not set the header if origin is not allowed
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('should allow multiple origins when CORS_ALLOWED_ORIGINS is a list', async () => {
    process.env.CORS_ALLOWED_ORIGINS = 'http://trusted1.com,http://trusted2.com';
    const { default: app } = await import('../app');

    const res1 = await request(app)
      .get('/')
      .set('Origin', 'http://trusted1.com');
    expect(res1.headers['access-control-allow-origin']).toBe('http://trusted1.com');

    const res2 = await request(app)
      .get('/')
      .set('Origin', 'http://trusted2.com');
    expect(res2.headers['access-control-allow-origin']).toBe('http://trusted2.com');

    const res3 = await request(app)
      .get('/')
      .set('Origin', 'http://other.com');
    expect(res3.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('should handle whitespace in CORS_ALLOWED_ORIGINS', async () => {
    process.env.CORS_ALLOWED_ORIGINS = 'http://trusted1.com, http://trusted2.com ';
    const { default: app } = await import('../app');

    const res = await request(app)
        .get('/')
        .set('Origin', 'http://trusted2.com');
    expect(res.headers['access-control-allow-origin']).toBe('http://trusted2.com');
  });

  it('should ignore trailing slashes in CORS_ALLOWED_ORIGINS', async () => {
    process.env.CORS_ALLOWED_ORIGINS = 'http://trusted1.com, http://trusted2.com/';
    const { default: app } = await import('../app');

    const res = await request(app)
      .get('/')
      .set('Origin', 'http://trusted2.com');
    expect(res.headers['access-control-allow-origin']).toBe('http://trusted2.com');
  });

  it('should support wildcards in CORS_ALLOWED_ORIGINS', async () => {
    process.env.CORS_ALLOWED_ORIGINS = 'https://*.example.com, https://*-app.netlify.app';
    const { default: app } = await import('../app');

    const res1 = await request(app)
      .get('/')
      .set('Origin', 'https://sub.example.com');
    expect(res1.headers['access-control-allow-origin']).toBe('https://sub.example.com');

    const res2 = await request(app)
      .get('/')
      .set('Origin', 'https://my-app.netlify.app');
    expect(res2.headers['access-control-allow-origin']).toBe('https://my-app.netlify.app');

    const res3 = await request(app)
      .get('/')
      .set('Origin', 'https://other.com');
    expect(res3.headers['access-control-allow-origin']).toBeUndefined();
  });
});

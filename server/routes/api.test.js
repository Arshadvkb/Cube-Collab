import request from 'supertest';
import express from 'express';

// Setup a mock express app to test simple routes
const app = express();
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('API Routes', () => {
  it('should return 200 OK for health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});

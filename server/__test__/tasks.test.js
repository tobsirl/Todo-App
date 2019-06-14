import app from '../server';
import request from 'supertest';

describe('Testing the task routes', () => {
  test('should get a json string form /test', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
  });
});

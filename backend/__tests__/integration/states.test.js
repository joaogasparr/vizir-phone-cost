// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import truncate from '../util/truncate';

describe('States', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to list all states', async () => {
    const token = await jwt();

    const response = await request(app)
      .get('/states')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

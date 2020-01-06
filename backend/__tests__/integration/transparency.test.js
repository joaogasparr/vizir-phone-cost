// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Transparencies', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to calculate the cost of a call', async () => {
    const token = await jwt();

    const origin = await factory.create('State');
    const destiny = await factory.create('State');

    await factory.create('Rate', {
      origin_id: origin.id,
      destiny_id: destiny.id,
    });

    const plans = await factory.create('Plan', {
      duration: 120,
    });

    const response = await request(app)
      .post('/transparencies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin_id: origin.id,
        destiny_id: destiny.id,
        duration: 300,
        plan: plans.id,
      });

    expect(response.status).toBe(200);
  });

  it('should be allowed to check if the plan exists', async () => {
    const token = await jwt();

    const response = await request(app)
      .post('/transparencies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin_id: 9999,
        destiny_id: 9999,
        duration: 9999,
        plan: 9999,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'No registered rates for informed origin and destination',
    });
  });

  it('should be allowed to check if the plan exists', async () => {
    const token = await jwt();

    const origin = await factory.create('State');
    const destiny = await factory.create('State');

    await factory.create('Rate', {
      origin_id: origin.id,
      destiny_id: destiny.id,
    });

    const response = await request(app)
      .post('/transparencies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin_id: origin.id,
        destiny_id: destiny.id,
        duration: 300,
        plan: 9999,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'Plan does not exists' });
  });
});

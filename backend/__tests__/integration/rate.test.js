// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Rate', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to list all rates', async () => {
    const token = await jwt();

    const response = await request(app)
      .get('/rates')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to list a rate', async () => {
    const token = await jwt();

    const origin = await factory.create('State');
    const destiny = await factory.create('State');

    const { id } = await factory.create('Rate', {
      origin_id: origin.id,
      destiny_id: destiny.id,
    });

    const response = await request(app)
      .get(`/rates/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to register new plan', async () => {
    const token = await jwt();

    const origin = await factory.create('State');
    const destiny = await factory.create('State');

    const rates = await factory.attrs('Rate', {
      origin_id: origin.id,
      destiny_id: destiny.id,
    });

    const response = await request(app)
      .post('/rates')
      .set('Authorization', `Bearer ${token}`)
      .send(rates);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be allowed to update a rate', async () => {
    const token = await jwt();

    const origin = await factory.create('State');
    const destiny = await factory.create('State');

    const rates = await factory.attrs('Rate', {
      origin_id: origin.id,
      destiny_id: destiny.id,
    });

    const { body } = await request(app)
      .post('/rates')
      .set('Authorization', `Bearer ${token}`)
      .send(rates);

    const response = await request(app)
      .put(`/rates/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...rates, destiny_id: origin.id });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...rates,
      destiny_id: origin.id,
    });
  });

  it('should be allowed to delete a rate', async () => {
    const token = await jwt();

    const origin = await factory.create('State');
    const destiny = await factory.create('State');

    const rates = await factory.attrs('Rate', {
      origin_id: origin.id,
      destiny_id: destiny.id,
    });

    const { body } = await request(app)
      .post('/rates')
      .set('Authorization', `Bearer ${token}`)
      .send(rates);

    const response = await request(app)
      .delete(`/rates/${body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

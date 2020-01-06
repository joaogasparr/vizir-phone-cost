// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import factory from '../factories';
import truncate from '../util/truncate';

describe('Sessions', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with the admin user', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should verify that the user attempting to authenticate exists', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'jest@jest.com',
        password: '123123',
      });

    expect(response.status).toBe(401);
  });

  it('should verify that the password is correct to authenticate', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(401);
  });

  it('should be allowed to verify that user has token', async () => {
    const { name, email } = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .send({
        name,
        email,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Token not provided' });
  });

  it('should be allowed to verify if token is valid', async () => {
    const { name, email } = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .set('Authorization', 'Bearer zzzzzzz')
      .send({
        name,
        email,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Token Invalid' });
  });
});

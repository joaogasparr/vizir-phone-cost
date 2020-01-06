// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to register new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be check if a user already exists', async () => {
    await factory.create('User', {
      email: 'jest@jest.com',
    });

    const user = await factory.attrs('User', {
      email: 'jest@jest.com',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'User already exists.' });
  });

  it('should be allowed to update a user', async () => {
    const token = await jwt();

    const { id, email, password } = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .set('Authorization', `Bearer ${token}`)
      .set('req.userId', id)
      .send({
        name: 'Vizir Jest',
        email,
        oldPassword: password,
        password: '123456',
        confirmPassword: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id, name: 'Vizir Jest', email });
  });
});

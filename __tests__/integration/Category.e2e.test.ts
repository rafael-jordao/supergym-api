import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database/prismaClient';

beforeAll(async () => {
  try {
    prisma.$connect();
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('/categories', () => {
  it('should be able to create a new category', async () => {

    const userPayload = {
      email: 'john@user.com',
      password: 'password'
    };

    const userResponse = await request(app)
      .post('/auth')
      .send(userPayload);

    const token = userResponse.body.user.token;

    const payload = {
      'name': 'Artes Marciais',
      'icon': '🥋'
    };

    const res = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer  ${token}`)
      .send(payload);

    expect(res.status).toBe(200);
  });

  it('should not be able to create a new category', async () => {
    const payload = {
      'name': 'Artes Marciais',
      'icon': '🥋'
    };

    const res = await request(app)
      .post('/categories')
      .send(payload);

    expect(res.status).toBe(401);
  });

  it('should be able to list all categories', async () => {
    const userPayload = {
      email: 'john@user.com',
      password: 'password'
    };

    const userResponse = await request(app)
      .post('/auth')
      .send(userPayload);

    const token = userResponse.body.user.token;

    const res = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer  ${token}`);

    expect(res.status).toBe(200);
  });

  it('should not be able to list categories', async () => {
    const payload = {
      'name': 'Artes Marciais',
      'icon': '🥋'
    };

    const res = await request(app)
      .post('/categories')
      .send(payload);

    expect(res.status).toBe(401);
  });

  it('should not able to list all exercises by category if exercises not exists', async () => {
    const userPayload = {
      email: 'john@user.com',
      password: 'password'
    };

    const userResponse = await request(app)
      .post('/auth')
      .send(userPayload);

    const token = userResponse.body.user.token;

    const resCategories = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer  ${token}`);

    const categoryId = resCategories.body.categoryId;

    const res = await request(app)
      .get(`/categories/${categoryId}/exercises`)
      .set('Authorization', `Bearer  ${token}`);

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({
      'success': false,
      'message': 'Theres no categories registred. 🔎'
    });
  });

});
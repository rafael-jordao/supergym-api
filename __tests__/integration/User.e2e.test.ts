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

describe('/users', () => {
  it('Should be able to create a new user', async () => {
    const payload = {
      'name': 'JohnDoe',
      'email': 'johndoe@user.com',
      'password': 'password'
    };

    const res = await request(app)
      .post('/users')
      .send(payload);

    expect(res.status).toBe(201);

  });

  it('Should not be able to create a new user', async () => {
    const payload = {
      'name': 'JohnDoe',
      'email': 'rafaeljordao.picado@gmail.com',
      'password': 'password'
    };

    const res = await request(app)
      .post('/users')
      .send(payload);

    expect(res.status).toBe(500);

  });

});


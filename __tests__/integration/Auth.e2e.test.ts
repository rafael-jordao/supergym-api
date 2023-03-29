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

describe('/auth', () => {
  it('Should be able to authenticate a user', async () => {
    const payload = {
      'email': 'johndoe@user.com',
      'password': 'password'
    };

    const res = await request(app)
      .post('/auth').send(payload);

    expect(res.status).toBe(200);
  });

  it('Should not be able to authenticate a user', async () => {
    const payload = {
      'email': 'johndoe@user.com',
      'password': 'wrongpassword'
    };

    const res = await request(app)
      .post('/auth').send(payload);

    expect(res.status).toBe(500);
  });
});

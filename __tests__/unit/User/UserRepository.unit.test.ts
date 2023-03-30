import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { randomUUID } from 'crypto';
import UserRepository from '../../../src/app/repositories/UserRepository';
import { prisma } from '../../../src/database/prismaClient';

import bcrypt from 'bcryptjs';

interface RequestTypes {

  name: string;
  email: string;
  password: string;

}

jest.mock('../../../src/database/prismaClient', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

const userRepository = UserRepository;

const users = [
  {
    id: randomUUID().toString(),
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: randomUUID().toString(),
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: '123456',
    created_at: new Date(),
    updated_at: new Date()
  }
];

beforeEach(() => {
  mockReset(prismaMock);
});

describe('UserRepository', () => {
  it('should return all users when there are users registred', async () => {
    prismaMock.user.findMany.mockResolvedValue(users);

    const result = await userRepository.findAll();

    expect(prismaMock.user.findMany).toHaveBeenCalled();
    expect(result).toEqual(users);
  });


  it('should find an user by ID', async () => {
    const id = users[0].id;
    const user = users.find(user => user.id === id);

    if (user) {
      prismaMock.user.findUnique.mockResolvedValue(user);
    } else {
      prismaMock.user.findUnique.mockResolvedValue(null);
    }

    const result = await userRepository.findById(id);

    expect(prismaMock.user.findUnique).toHaveBeenCalled();
    expect(result).toEqual(users[0]);
  });

  it('should find an user by email', async () => {
    const email = users[0].email;
    const user = users.find(user => user.email === email);

    if (user) {
      prismaMock.user.findUnique.mockResolvedValue(user);
    } else {
      prismaMock.user.findUnique.mockResolvedValue(null);
    }

    const result = await userRepository.findByEmail(email);

    expect(prismaMock.user.findUnique).toHaveBeenCalled();
    expect(result).toEqual(users[0]);
  });

  it('should create a new user', async () => {

    const newUser: RequestTypes = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const createdUser = {
      id: randomUUID().toString(),
      name: newUser.name,
      email: newUser.email,
      password: bcrypt.hashSync(newUser.password, 8),
      created_at: new Date(),
      updated_at: new Date()
    };


    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await userRepository.create(newUser);

    expect(prismaMock.user.create).toHaveBeenCalled();
    expect(result).toEqual(createdUser);
  });

});

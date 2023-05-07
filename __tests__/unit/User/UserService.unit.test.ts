import UserService from '../../../src/app/services/UserService';
import UserRepository from '../../../src/app/repositories/UserRepository';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

interface UserRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

// Criar um mock do UserRepository
jest.mock('../../../src/app/repositories/UserRepository');

const mockedFindAll = UserRepository.findAll as jest.MockedFunction<typeof UserRepository.findAll>;
const mockFindByEmail = UserRepository.findByEmail as jest.MockedFunction<typeof UserRepository.findByEmail>;
const mockCreate = UserRepository.create as jest.MockedFunction<typeof UserRepository.create>;


describe('UserService', () => {
  it('should return all users when there are users registred', async () => {

    const users: User[] = [
      { id: '2aff8ee5-20f2-254b-19cd-2d6dc28ac43d', name: 'John', email: 'john@example.com', password: '123456', created_at: new Date(), updated_at: new Date() },
      { id: '2aff8ee5-20f2-254b-19cd-2d6dc23a143s', name: 'John', email: 'john@example2.com', password: '123456', created_at: new Date(), updated_at: new Date() },
    ];

    mockedFindAll.mockResolvedValue(users);

    const userService = UserService;
    const result = await userService.getAllUsers();

    expect(result).toEqual(users);
  });

  it('should create a new user succefuly', async () => {

    const user: UserRequest = {
      id: randomUUID().toString(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date()
    };

    mockCreate.mockResolvedValue(user);

    const userService = UserService;
    const result = await userService.createUser(user);

    expect(result).toEqual(user);
  });

  it('Should not create a new user if email already exists.', async () => {
    const users: User[] = [
      {
        id: '2aff8ee5-20f2-254b-19cd-2d6dc28ac43d',
        name: 'John',
        email: 'john@example.com',
        password: '123456',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2aff8ee5-20f2-254b-19cd-2d6dc23a143s',
        name: 'John',
        email: 'john@example2.com',
        password: '123456',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const user: UserRequest = {
      id: randomUUID().toString(),
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const emailExists = users.some((u) => u.email === user.email);

    mockFindByEmail.mockResolvedValue(emailExists ? {
      id: randomUUID().toString(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date()
    } : null);

    const userService = UserService;
    const error = new Error('Este e-mail já está em uso. 😕');
    await expect(userService.createUser(user)).rejects.toThrowError(error);
  });

});


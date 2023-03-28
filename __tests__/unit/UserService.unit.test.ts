import UserService from '../../src/app/services/UserService';
import UserRepository from '../../src/app/repositories/UserRepository';
import { User } from '@prisma/client';

// Criar um mock do UserRepository
jest.mock('../../src/app/repositories/UserRepository');
const mockedFindAll = UserRepository.findAll as jest.MockedFunction<typeof UserRepository.findAll>;

describe('UserService', () => {
  describe('getAllUsers', () => {
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
  });
});

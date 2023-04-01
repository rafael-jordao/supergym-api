import { ApiError } from '../helpers/apiError';
import UserRepository from '../repositories/UserRepository';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async getAllUsers() {
    const users = await UserRepository.findAll();

    if (users.length === 0) {
      throw new ApiError(404, 'Theres no users registred 🔎');
    }

    return users;
  }

  async createUser(userRequest: UserRequest) {
    const { name, email, password } = userRequest;

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      throw new ApiError(409, 'This e-mail is already in use 😕');
    }

    if (!name || !email || !password) {
      throw new ApiError(422, 'All fields must be filled 🧐');
    }

    const user = await UserRepository.create({ name, email, password });

    return user;
  }
}

export default new UserService();
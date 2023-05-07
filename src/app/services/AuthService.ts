import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../helpers/apiError';

interface AuthRequestTypes {
  email: string;
  password: string
}

class AuthService {
  async auth({ email, password }: AuthRequestTypes) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(404, 'Usuário não encontrado. 🧐');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ApiError(401, 'Senha inválida. 🧐');
    }

    const token = jwt.sign({ id: user.id }, 'secret', {
      expiresIn: '1d'
    });

    const user_email = user.email;
    const user_id = user.id;

    return { user_id, user_email, token };
  }
}

export default new AuthService();
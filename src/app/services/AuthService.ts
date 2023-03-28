import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthRequestTypes {
  email: string;
  password: string
}

class AuthService {
  async auth({ email, password }: AuthRequestTypes) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error('Unauthorized. 🧐');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Unauthorized. 🧐');
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
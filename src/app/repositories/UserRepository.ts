import { prisma } from '../../database/prismaClient';

import bcrypt from 'bcryptjs';

interface RequestTypes {
  name: string;
  email: string;
  password: string;
}

class UserRepository {

  async findAll() {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  }

  async create({ name, email, password }: RequestTypes) {
    password = bcrypt.hashSync(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password
      }
    });

    return user;
  }

}

export default new UserRepository();
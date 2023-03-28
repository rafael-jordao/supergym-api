import { prisma } from '../../database/prismaClient';

interface RequestTypes {
  name: string;
  icon: string;
}

class CategoryRepository {

  async findAll() {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id: id
      }
    });

    return category;
  }


  async create({ name, icon }: RequestTypes) {
    const category = await prisma.category.create({
      data: {
        name: name,
        icon: icon,
      }
    });

    return category;
  }

  async delete(id: string) {
    await prisma.category.delete({
      where: {
        id: id
      }
    });
  }

}

export default new CategoryRepository();
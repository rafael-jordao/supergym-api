import { prisma } from '../../database/prismaClient';

interface RequestTypes {
  name: string;
  description: string;
  instructions: string[];
  waitTime: string;
  series: string;
  imagePath: string;
  categoryId: string;
  userId: string;
}

class ExerciseRepository {

  async findByUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (user) {
      const exercises = await prisma.exercise.findMany({
        where: {
          userId: user.id
        }
      });
      return exercises;
    }
    return null;
  }


  async findById(id: string) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: id
      }
    });

    return exercise;
  }

  async findByCategory(id: string) {
    const exercise = await prisma.exercise.findMany({
      where: {
        categoryId: id
      }
    });

    return exercise;
  }

  async create({ name, description, instructions, series, waitTime, imagePath, categoryId, userId }: RequestTypes) {

    const exercise = await prisma.exercise.create({
      data: {
        name: name,
        description: description,
        instructions: instructions,
        series: series,
        waitTime: waitTime,
        imagePath: imagePath,
        categoryId: categoryId,
        userId: userId
      }
    });

    return exercise;
  }

  async delete(id: string) {
    await prisma.exercise.delete({
      where: {
        id: id
      }
    });
  }
}

export default new ExerciseRepository();
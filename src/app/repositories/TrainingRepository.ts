import { prisma } from '../../database/prismaClient';
import { Exercise } from '@prisma/client';

interface RequestTypes {
  clientName: string;
  exercises: Exercise[];
  userId: string
}

class TrainingRepository {
  async findAll() {
    const trainings = await prisma.training.findMany({
      include: { exercises: true },
    });

    return trainings;
  }

  async findAllCreatedByUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (user) {
      const trainings = await prisma.training.findMany({
        where: {
          userId: user.id
        },
        include: { exercises: true },
      });

      return trainings;
    }

    return null;
  }

  async create({ clientName, exercises, userId }: RequestTypes) {
    const training = await prisma.training.create({
      data: {
        clientName: clientName,
        exercises: {
          connect: exercises.map((exercise) => ({ id: exercise.id }))
        },
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        exercises: true,
        user: true
      },
    });

    return training;
  }
}

export default new TrainingRepository();
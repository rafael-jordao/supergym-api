import TrainingRepository from '../repositories/TrainingRepository';
import { Exercise } from '@prisma/client';

interface RequestTypes {
  clientName: string;
  exercises: Exercise[];
  userId: string;
}

class TrainingService {

  async getAllTrainingCreatedByUser(userId: string) {
    const trainings = await TrainingRepository.findAllCreatedByUser(userId);

    if (trainings?.length === 0) {
      throw new Error('Theres no trainings registred 🔎.');
    }

    return trainings;
  }

  async createTraining({ clientName, exercises, userId }: RequestTypes) {

    if (!clientName) {
      throw new Error('Must define clientName 🧐');
    }

    if (exercises.length === 0) {
      throw new Error('Must have at least 1 exercise 🧐');
    }

    if (!userId) {
      throw new Error('Must define the userId 🧐');
    }

    const training = await TrainingRepository.create({ clientName, exercises, userId });

    return training;
  }
}

export default new TrainingService();
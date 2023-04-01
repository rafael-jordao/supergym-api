import { ApiError } from '../helpers/apiError';
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
      throw new ApiError(404, 'Theres no trainings registred 🔎.');
    }

    return trainings;
  }

  async createTraining({ clientName, exercises, userId }: RequestTypes) {

    if (!clientName) {
      throw new ApiError(422, 'Must define clientName 🧐');
    }

    if (exercises.length === 0) {
      throw new ApiError(422, 'Must have at least 1 exercise 🧐');
    }

    if (!userId) {
      throw new ApiError(422, 'Must define the userId 🧐');
    }

    const training = await TrainingRepository.create({ clientName, exercises, userId });

    return training;
  }
}

export default new TrainingService();
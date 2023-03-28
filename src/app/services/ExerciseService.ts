import CategoryRepository from '../repositories/CategoryRepository';
import ExerciseRespository from '../repositories/ExerciseRespository';

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


class ExerciseService {
  async getAllExercisesCreatedByUser(userId: string) {
    const exercises = await ExerciseRespository.findByUser(userId);

    if (!exercises) {
      throw new Error('Theres no exercises registred 🔎');
    }

    return exercises;
  }

  async createExercise({ name, description, instructions, series, waitTime, imagePath, categoryId, userId }: RequestTypes) {

    const categoryExists = await CategoryRepository.findById(categoryId);

    if (!categoryExists) {
      throw new Error('This category doesn\'t exist. 🔎');
    }

    if (!name) {
      throw new Error('Required name. ✍️');
    }

    if (!userId) {
      throw new Error('Required userId 🧐');
    }

    const exercise = await ExerciseRespository.create({ name, description, instructions, series, waitTime, imagePath, categoryId, userId });

    return exercise;
  }
}

export default new ExerciseService();
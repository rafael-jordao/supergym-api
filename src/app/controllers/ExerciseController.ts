import { NextFunction, Request, Response } from 'express';
import ExerciseRespository from '../repositories/ExerciseRespository';
import ExerciseService from '../services/ExerciseService';

class ExerciseController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const exercises = await ExerciseService.getAllExercisesCreatedByUser(userId);

      return res.json(exercises);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, instructions, series, waitTime, imagePath, categoryId, userId } = req.body;

      const exercise = await ExerciseService.createExercise({ name, description, instructions, series, waitTime, imagePath, categoryId, userId });

      return res.status(201).json(exercise);
    } catch (error) {
      next(error);
    }
  }


  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const exerciseExistes = await ExerciseRespository.findById(id);

      if (!exerciseExistes) {
        return res.status(404).json({ error: 'This exercise doesn\'t exist.' });
      }

      await ExerciseRespository.delete(id);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

export default new ExerciseController();
import { NextFunction, Request, Response } from 'express';
import TrainingService from '../services/TrainingService';

class TrainingController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const training = await TrainingService.getAllTrainingCreatedByUser(userId);

      return res.json(training);
    } catch (error) {
      next(error);
    }
  }

  async getTrainingById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const training = await TrainingService.getTrainingById(id);

      console.log(training);

      return res.json(training);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientName, exercises, userId } = req.body;

      const training = await TrainingService.createTraining({
        clientName, exercises, userId
      });

      return res.json(training);

    } catch (error) {
      next(error);
    }
  }
}

export default new TrainingController();
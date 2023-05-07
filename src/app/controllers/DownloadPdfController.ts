import { NextFunction, Request, Response } from 'express';
import path from 'path';

import TrainingService from '../services/TrainingService';
import { ApiError } from '../helpers/apiError';
import { pdfGenarator } from '../helpers/pdfGenarator';

class DownloadPdfController {

  async download(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const training = await TrainingService.getTrainingById(id);

      if (!training) {
        return new ApiError(404, 'Training not found');
      }

      const mapExercises = training.exercises.map((exercise) => {
        return `
          <div style="width:max-width: 800px; margin: 0 auto;">
            <img style="max-width:200px; border-radius: 5px;" src="${exercise.imagePath}" />
            <h3>${exercise.name}</h3>
            <h5>Descrição: ${exercise.description}</h5>
            <p><strong>Instruções:</strong> ${exercise.instructions}</p>
            <p><strong>Séries:</strong> ${exercise.series}</p>
            <p><strong>Descanso:</strong> ${exercise.waitTime}</p>
          </div>
        `;
      });

      const content = `
      <h1>Aluno: ${training.clientName}</h1>
      <h2>Exercícios</h2>
      ${mapExercises}
    `;
      const pdf = await pdfGenarator(content);

      const file = path.join(`/usr/app/${pdf}`);

      return res.download(file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Download PDF');
        }
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new DownloadPdfController();
import { NextFunction, Request, Response } from 'express';
import CategoryService from '../services/CategoryService';

class CategoryController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();

      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async findExercisesByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const exercises = await CategoryService.findExercisesByCategory(categoryId);

      res.json(exercises);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, icon } = req.body;

      const category = await CategoryService.createCategory({ name, icon });

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await CategoryService.deleteCategory(id);

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

}

export default new CategoryController();
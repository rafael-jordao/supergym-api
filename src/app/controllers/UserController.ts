import UserService from '../services/UserService';
import { NextFunction, Request, Response } from 'express';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();

      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: 'Theres no users registred 🔎' });
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const user = await UserService.createUser({ name, email, password });

      return res.status(201).json(user);

    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;


      const user = await UserService.updateUserPassword({ email, password });

      const jsonUser = JSON.stringify(user);

      console.log(jsonUser);

      return res.status(204).json(user);


    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
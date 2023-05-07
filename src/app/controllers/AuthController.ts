import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.auth({ email, password });
      console.log(user);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
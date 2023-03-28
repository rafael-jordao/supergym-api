import { Request, Response, NextFunction } from 'express';

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error.stack);
  res.status(500).json({ error: error.message });
}

import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/apiError';

export default function errorHandler(error: ApiError, req: Request, res: Response, next: NextFunction) {
  console.error(error.stack);

  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    success: false,
    message: error.message,
  });
}


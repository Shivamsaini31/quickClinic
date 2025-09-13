import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: any;
}

const Errormiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default Errormiddleware;

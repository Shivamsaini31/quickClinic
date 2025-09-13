import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/usermodel';
import ErrorHander from '../utils/errorhander';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const isauthenticateuser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
  req.user = await User.findById(decodedData.id) || undefined;
  next();
};

export const authorizeroles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorHander("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

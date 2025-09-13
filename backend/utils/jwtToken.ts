import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/usermodel';

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = user.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

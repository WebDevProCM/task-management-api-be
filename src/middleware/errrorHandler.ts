import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
  data?: unknown;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  //handling expired jwt token
  if(err.name === "TokenExpiredError"){
    err.message = "Session expired. Please log in again"
  }

  //handling invalid token
  if(err.name === "JsonWebTokenError"){
    err.message = "Invalid token. Please log in again"
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: err.data 
  });
};


module.exports = errorHandler;
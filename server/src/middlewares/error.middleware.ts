import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("Something went wrong");
  }
};

import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DataBaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("handling this error as a RequestValidationError");
  }

  if (err instanceof DataBaseConnectionError) {
    console.log("handling this error as a DataBaseConnectionError");
  }
  res.status(400).send({
    message: err.message,
  });
};

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
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof DataBaseConnectionError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }
  res.status(400).send({
    error: [{ message: "Something went wrong" }],
  });
};

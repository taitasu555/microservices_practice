import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();
    //   Only because we extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

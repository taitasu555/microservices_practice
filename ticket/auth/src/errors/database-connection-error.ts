import { CustomError } from "./custom-error";
export class DataBaseConnectionError extends Error implements CustomError {
  statusCode = 500;
  reason = "Error connecting to database";
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}

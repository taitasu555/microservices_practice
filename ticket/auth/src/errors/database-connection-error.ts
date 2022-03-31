export class DataBaseConnectionError extends Error {
  reason = "Error connecting to database";
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }
}

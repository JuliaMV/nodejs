export class ApiError extends Error {
  status: number;

  constructor(public message: string, public apiStatus: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = apiStatus;
  }
}

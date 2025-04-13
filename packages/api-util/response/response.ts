import { HttpStatus } from "@nestjs/common";

type ExtraArgs = Record<string, any>;

export class Response<T> {
  readonly data: T;
  readonly statusCode: number;
  readonly message?: string;

  [key: string]: any;

  constructor(
    data: T,
    statusCode: number = HttpStatus.OK,
    message?: string,
    extraArgs?: ExtraArgs
  ) {
    this.data = data;
    this.statusCode = statusCode;

    if (message) this.message = message;

    if (extraArgs) Object.assign(this, extraArgs);
  }

  static of<T>(
    data: T,
    statusCode: number = HttpStatus.OK,
    message?: string,
    extraArgs?: ExtraArgs
  ) {
    return new Response<T>(data, statusCode, message, extraArgs);
  }
}

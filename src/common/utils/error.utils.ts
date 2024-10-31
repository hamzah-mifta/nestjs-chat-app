import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from './response.util';

export class HttpError extends HttpResponse {
  success: boolean;
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(false, statusCode, message);
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad request') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(HttpStatus.FORBIDDEN, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Data not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Something went wrong') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

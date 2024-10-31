import { HttpStatus } from '@nestjs/common';

export const buildResponse = (
  status: boolean,
  statusCode: HttpStatus,
  message: string,
  data: unknown = null,
) => {
  return {
    status,
    statusCode,
    message,
    data,
  };
};

interface IHttpResponse<T = any> {
  success: boolean;
  statusCode: HttpStatus;
  message: string;
  data?: T | null;
}

export class HttpResponse<T = any> implements IHttpResponse {
  success: boolean;
  statusCode: HttpStatus;
  message: string;
  data?: any;

  constructor(
    success: boolean,
    statusCode: HttpStatus,
    message: string,
    data: T | null = null,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class SuccessResponse<T> extends HttpResponse<T> {
  constructor(data: any = {}, message: string = 'Success') {
    super(true, HttpStatus.OK, message, data);
  }
}

export class CreatedResponse<T> extends HttpResponse<T> {
  constructor(data: T | null, message: string | null = 'Success') {
    super(true, HttpStatus.CREATED, message, data);
  }
}

import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { buildResponse } from '../utils/response.util';
import { WithSentry } from '@sentry/nestjs';

export class HttpExceptionFilter implements ExceptionFilter {
  @WithSentry()
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR,
      message = 'Something went wrong.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse['message']
      ) {
        message = exceptionResponse['message'];
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    }

    const errorResponse = buildResponse(false, status, message);

    response.status(status).json(errorResponse);
  }
}

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CANNOT_DELETE_FOREIGN_CONSTRAINT, NO_REFERENCE_ROW } from '../constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.info('--------> Caught:', request.url, request.body, status, exceptionResponse);

    if ((exception.cause as any)?.errno === NO_REFERENCE_ROW) {
      return response
        .status(status)
        .json({
          statusCode: status,
          path: request.url,
          message: 'Referenced entity is missing'
        });
    }

    if ((exception.cause as any)?.errno === CANNOT_DELETE_FOREIGN_CONSTRAINT) {
      return response
        .status(status)
        .json({
          statusCode: 409,
          path: request.url,
          message: 'Entity cannot be deleted as it is used as reference'
        });
    }

    console.info('Caught:', request.url, request.body, status, exceptionResponse);

    response
      .status(status)
      .json({
        statusCode: status,
        path: request.url,
        message: JSON.stringify(exceptionResponse)
      });
  }
}

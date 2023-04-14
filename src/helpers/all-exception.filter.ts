import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CANNOT_DELETE_FOREIGN_CONSTRAINT, NO_COLUMN_DEFAULT_ROW, NO_REFERENCE_ROW } from '../constants';


@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let exceptionToRespond = exception;

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.info('--------> Caught exception:', (exception as any)?.message, (exception as Error).stack);

      let message = 'Something went wrong';
      let statusCode = 500;
      const description = (exception as any).message || '';

      if ((exception as any)?.errno === NO_REFERENCE_ROW) {
        message = 'Referenced entity is missing';
        statusCode = 400;
      }

      if ((exception as any)?.errno === CANNOT_DELETE_FOREIGN_CONSTRAINT) {
        message = 'Entity cannot be deleted as it is used as a reference';
        statusCode = 409;
      }

      if ((exception as any)?.errno === NO_COLUMN_DEFAULT_ROW) {
        message = 'Field cannot be empty';
        statusCode = 400;
      }

      exceptionToRespond = new HttpException(
        {message, description, statusCode },
        statusCode,
        { cause: exception as Error }
      );
    }

    super.catch(exceptionToRespond, host);
  }
}

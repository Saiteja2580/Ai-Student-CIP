import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch() // Catch ALL exceptions, not just HttpException
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default status is 500 (Internal Server Error) if the exception is not HttpException
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Error message (if available) or default to 'Internal Server Error'
    const message = exception?.message || 'Internal Server Error';

    // Handle unexpected exceptions (like TypeErrors, Database errors, etc.)
    //console.error('Exception Caught:', exception);

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception?.name || 'UnknownException',
      timestamp: new Date().toISOString(),
      path: request.url,
      stack:
        process.env.NODE_ENV === 'development' ? exception?.stack : undefined, // Include stack trace in development
    });
  }
}

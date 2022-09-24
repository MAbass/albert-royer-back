import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const responseParse = JSON.stringify(exception);
    const statusCode = exception.getResponse()["response"]
      ? exception.getResponse()["response"]["statusCode"]
      : exception.getStatus();
    const message = exception.getResponse()["response"]
      ? exception.getResponse()["response"]["message"]
      : exception.message;

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    });
    this.logger.error(`${responseParse}`);
  }
}

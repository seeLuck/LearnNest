import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        response
            .status(HttpStatus.FORBIDDEN)
            .json({
                statusCode: exception.getStatus(),
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
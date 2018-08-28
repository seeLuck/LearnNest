import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomForbiddenException extends HttpException {
    constructor() {
        super({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
        }, HttpStatus.FORBIDDEN);
    }
}
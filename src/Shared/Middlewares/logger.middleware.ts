import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    //resolve可以傳參
    async resolve(...args: any[]): Promise<MiddlewareFunction> {
        //會返回ExpressMiddleware
        return async (req, res, next) => {
            console.log(args)
            console.log('執行middleware...');
            //呼叫next()方法，程式才會繼續往下執行，否則將停在此階段。
            next();
        }
    }
}
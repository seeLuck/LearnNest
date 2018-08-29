import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        return call$.pipe(
            catchError(err =>
                _throw(new HttpException({'errMsg': err}, HttpStatus.BAD_GATEWAY)),
            ),
        );
    }
}
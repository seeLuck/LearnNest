import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Injectable()
export class WebSocketRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles:any = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const data = context.switchToWs().getData();

        const hasRole = () => !!data.roles.find((role) => !!roles.find((item) => item === role));
        return data && data.roles && hasRole();
    }
}
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../Modules/Users/Services/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async createToken() {
        const user: JwtPayload = { userId: 2 };
        return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.getUser(payload.userId);
    }
}
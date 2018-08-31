import { UsersService } from '../Modules/Users/Services/users.service';
import { AuthService } from './auth.service';
import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Get('getToken')
    async createToken(){
        return await this.authService.createToken();
    }
}
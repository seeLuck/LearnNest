import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../Modules/Users/users.module';
import * as passport from 'passport';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})

export class AuthModule{}
// export class AuthModule implements NestModule {
//     public configure(consumber: MiddlewareConsumer) {
//         //apply、forRoute方法允許傳入多個參數
//         consumber.apply(passport.authenticate('jwt', { session: false }))
//             .forRoutes({ path: '/users', method: RequestMethod.ALL });
//     }
// }
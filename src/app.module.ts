import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {UsersModule} from './Modules/Users/users.module';
import {AuthModule} from './Auth/auth.module';
import {ChatModule} from './Modules/Chat/chat.module';
import {CatsModule} from './Modules/Cats/cats.module';
import {UsersController} from './Modules/Users/users.controller';
import {LoggerMiddleware} from './Shared/Middlewares/logger.middleware';
import {SimpleMiddleware} from './Shared/Middlewares/simple.middleware';

@Module({
    imports: [UsersModule, ChatModule, CatsModule, AuthModule]
})

export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware, SimpleMiddleware)
            .with('aaa')
            .forRoutes(UsersController);
    }
}
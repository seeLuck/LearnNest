import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as express from 'express';//使用express模組
import * as path from 'path';
import {INestApplication} from '@nestjs/common/interfaces/nest-application.interface';
import * as session from 'express-session';

async function bootstrap(){
    const instance = express();

    instance.set('views', path.join(__dirname, 'views'));
    instance.set('view engine', 'ejs');

    instance.use(session({
        secret: 'nestjs session',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    const app: INestApplication = await NestFactory.create(ApplicationModule, instance);
    try {
        await app.listen(3000);
        console.log(`Application based on Express is listening on port 3000`);
    }catch (err){
        console.error(`Application configured to listen on port 3000 failed to start`, err);
    }
}

bootstrap();
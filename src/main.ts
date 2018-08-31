import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as express from 'express';//使用express模組
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {INestApplication} from '@nestjs/common/interfaces/nest-application.interface';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(){
    const instance = express();

    instance.use(bodyParser.json());
    instance.use(bodyParser.urlencoded({ extended: false }));

    instance.set('views', path.join(__dirname, 'views'));
    instance.set('view engine', 'ejs');

    instance.use(session({
        secret: 'nestjs session',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    const app: INestApplication = await NestFactory.create(ApplicationModule, instance);

    const options = new DocumentBuilder()
        .setTitle('Users Restful API')
        .setDescription('The users Restful API description')
        .setVersion('1.0')
        .addTag('users')
        .build();

    //restful API 文檔
    const document = SwaggerModule.createDocument(app, options);

    //打開http://localhost:3000/api 就會連結到swagger服務。
    SwaggerModule.setup('/api', app, document);

    try {
        await app.listen(3000);
        console.log(`Application based on Express is listening on port 3000`);
    }catch (err){
        console.error(`Application configured to listen on port 3000 failed to start`, err);
    }
}

bootstrap();
import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as express from 'express';//使用express模組
import {INestApplication} from '@nestjs/common/interfaces/nest-application.interface';

async function bootstrap(){
    const instance = express();
    const app: INestApplication = await NestFactory.create(ApplicationModule, instance);
    try {
        await app.listen(3000);
        console.log(`Application based on Express is listening on port 3000`);
    }catch (err){
        console.error(`Application configured to listen on port 3000 failed to start`, err);
    }
}

bootstrap();
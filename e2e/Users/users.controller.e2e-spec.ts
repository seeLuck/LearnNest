import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../src/Modules/Users/users.module';
import { UsersService } from '../../src/Modules/Users/Services/users.service';
import { INestApplication } from '@nestjs/common';

describe('Users', () => {
    let app: INestApplication;
   //預期資料，測試要用
    const usersService = {
        getAllUsers: () => [
            { "_id": 1, "_name": "Michael", "_age": 25 },
            { "_id": 2, "_name": "Mary", "_age": 27 }
        ]
    };
    //使用Testing class
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [UsersModule]
        })
            .overrideProvider(UsersService)
            .useValue(usersService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });
    //測試你的Restful API
    it('/GET users',()=>{
        return request(app.getHttpServer())
            .get('/users')
            //狀態碼
            .expect(200)
            //檢驗是否符合預期資料
            .expect(usersService.getAllUsers())
    });

    afterAll(async () => {
        await app.close();
    });
});
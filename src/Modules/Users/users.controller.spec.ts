import { UsersController } from './users.controller';
import { UsersService } from './Services/users.service';
import { ProductsService } from '../Products/Services/products.service';
import { Request, Response, Next } from '@nestjs/common';
import { Test } from '@nestjs/testing';

describe('UsersController', () => {

    let usersController: UsersController;
    let usersService: UsersService;
    let productService: ProductsService;

    //使用Nest Testing class
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, ProductsService],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersController = module.get<UsersController>(UsersController);
    });

    describe('runTest', () => {
        it('should return an array of users', async () => {
            //預期回傳的資料
            const result = [
                { "_id": 1, "_name": "Michael", "_age": 251 },
                { "_id": 2, "_name": "Mary", "_age": 27 }
            ];
            //jest會監視usersService.()，並給予假資料 result
            jest.spyOn(usersService, 'getAllUsers').mockImplementation(() => result);

            expect(await usersController.getAllUsers(Request, Response, Next)).toBe(result);
        })
    })
});
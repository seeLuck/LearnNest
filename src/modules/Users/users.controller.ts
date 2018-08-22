import {Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body} from "@nestjs/common";
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from './Services/users.serivce';
import { ProductsService } from '../Products/Services/products.service';

@Controller('users')
export class UsersController {
    //依賴注入，建議要使用，這是低耦合作法
    constructor(private userService: UsersService, private productsService: ProductsService) { }

    @Get()
    //使用Express的參數
    async getAllUsers( @Request() req, @Response() res, @Next() next) {
        try {
            let users: CreateUserDTO[] = await this.userService.getAllUsers();
            res.status(HttpStatus.OK).json(users);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/testProducts')
    //使用Express的參數
    async testGetAllProducts( @Request() req, @Response() res, @Next() next) {
        //res.status(HttpStatus.OK).json([1,2,3]);
        try {
            let products = await this.productsService.getAllProducts();
            res.status(HttpStatus.OK).json(products);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    //使用Express的參數
    async getUser( @Response() res, @Param('id') id ) {
        try {
            let user: CreateUserDTO = await this.userService.getUser(+id);
            res.status(HttpStatus.OK).json(user);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    //post過來的body要符合DTO class所描述的屬性
    async addUser( @Response() res, @Body() createUserDTO:CreateUserDTO) {
        try {
            let users: CreateUserDTO[] = await this.userService.addUser(createUserDTO);
            res.status(HttpStatus.OK).json(users);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
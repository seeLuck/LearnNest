import {Controller, Get, Post, Request, Response, Param, Next, HttpStatus,
    Body, UseFilters, UseGuards, UseInterceptors} from "@nestjs/common";
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from './Services/users.serivce';
import { ProductsService } from '../Products/Services/products.service';
import { CustomForbiddenException } from '../../Shared/ExceptionFilters/forbidden.exception';
import { HttpExceptionFilter } from '../../Shared/ExceptionFilters/http-exception.filter';
import { ValidationPipe } from '../../Shared/Pipes/validation.pipe';
import { ParseIntPipe } from '../../Shared/Pipes/parse-int.pipe';
import { RolesGuard } from '../../Shared/Guards/roles.guard';
import { Roles } from '../../Shared/Decorators/roles.decorator';
import { LoggingInterceptor } from '../../Shared/Interceptors/logging.interceptor';
import { TransformInterceptor } from '../../Shared/Interceptors/transform.interceptor';
import { ExceptionInterceptor } from '../../Shared/Interceptors/exception.interceptor';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    //依賴注入，建議要使用，這是低耦合作法
    constructor(private userService: UsersService, private productsService: ProductsService) { }

    @Get()
    @Roles('general')
    //使用Express的參數
    async getAllUsers( @Request() req, @Response() res, @Next() next) {
        try {
            let users: CreateUserDTO[] = await this.userService.getAllUsers();
            res.status(HttpStatus.OK).json(users);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
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

    //新增/getException使用HttpException
    @Get('getException')
    @UseFilters(new HttpExceptionFilter())
    async getException(@Request() req, @Response() res, @Next() next){
        throw new CustomForbiddenException();
    }

    @Get('testInterceptor')
    @UseInterceptors(LoggingInterceptor)
    async testInterceptor( @Request() req, @Response() res, @Next() next) {
        console.log('執行testInterceptor()');
        res.status(HttpStatus.OK).json();
    }

    @Get('testTransformInterceptor')
    @UseInterceptors(TransformInterceptor)
    async testTransformInterceptor( ) {
        return "test response";
    }

    @Get('testExceptionInterceptor')
    @UseInterceptors(ExceptionInterceptor)
    async testExceptionInterceptor(@Request() req, @Response() res, @Next() next ) {
        throw `123`;
    }

    @Get('/:id')
    //使用Express的參數
    async getUser( @Response() res, @Param('id', new ParseIntPipe()) id ) {
        try {
            let user: CreateUserDTO = await this.userService.getUser(+id);
            res.status(HttpStatus.OK).json(user);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @Roles('admin')
    //post過來的body要符合DTO class所描述的屬性
    async addUser( @Response() res, @Body(new ValidationPipe()) createUserDTO:CreateUserDTO) {
        try {
            let users: CreateUserDTO[] = await this.userService.addUser(createUserDTO);
            res.status(HttpStatus.OK).json(users);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
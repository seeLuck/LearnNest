import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './Services/users.serivce';
import {ProductsModule} from "../Products/products.module";

@Module({
    imports:[ProductsModule],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UsersModule {
}

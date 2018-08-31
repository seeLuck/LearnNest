import { Module } from '@nestjs/common';
import { CatsServices } from './cats.services';
import { CatsController } from './cats.controller';
import { CatsProvider } from './cats.providers';
import { DatabaseModule } from '../../Databases/Sequelize/database.module';
//import { DatabaseModule } from '../../Databases/TypeORM/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CatsController],
    providers: [
        CatsServices,
        CatsProvider
    ]
})
export class CatsModule { }
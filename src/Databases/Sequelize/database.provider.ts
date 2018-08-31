import { Sequelize } from 'sequelize-typescript';
import { CatsEntity } from '../../Modules/Cats/cats.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeInstance',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'platform',
                timezone: '+08:00',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            });
            sequelize.addModels([CatsEntity]);
            await sequelize.sync();
            return sequelize;
        }
    }
]
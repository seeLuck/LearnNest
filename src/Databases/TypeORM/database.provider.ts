import { createConnection } from 'typeorm';

//这里就是Provider的工厂方法，貌似可以用来各种封装
export const databaseProviders = [
    {
        provide: 'TypeORMInstance',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'platform',
            timezone: '+08:00',
            entities: [
                __dirname + '/Schemas/*.entity{.ts,.js}'
            ]
        })
    }
];
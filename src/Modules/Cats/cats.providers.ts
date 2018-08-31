import { CatsEntity } from '../../Databases/Sequelize/Schemas/cats.entity';

export const CatsProvider = {
    provide: 'CatsRepository',
    useValue: CatsEntity
};

export default CatsEntity


// import { CatsEntity } from '../../Databases/TypeORM/Schemas/cats.entity';
// import { Connection, Repository } from 'typeorm';
// export const CatsProvider = {
//     provide: 'CatsRepository',
//     useFactory:(connection:Connection)=>connection.getRepository(CatsEntity),
//     inject:['TypeORMInstance']
// };
//
// export default CatsEntity
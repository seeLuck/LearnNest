import { CatsEntity } from '../cats.entity';
import { ICats } from './ICats';

export interface ICatsService {
    findAll(): Promise<Array<CatsEntity>>;
    findById(ID: number): Promise<CatsEntity | null>;
    findOne(options: Object): Promise<CatsEntity | null>;
    create(users: ICats): Promise<CatsEntity>;
    update(ID: number, newValue: ICats): Promise<CatsEntity | null>;
    delete(ID: number): Promise<number>;
}
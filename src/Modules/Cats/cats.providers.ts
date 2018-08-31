import { CatsEntity } from './cats.entity';

export const CatsProvider = {
    provide: 'CatsRepository',
    useValue: CatsEntity
};
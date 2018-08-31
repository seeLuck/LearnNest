import { Injectable, Inject } from '@nestjs/common';
import CatsEntity from './cats.providers';
import { Model } from 'sequelize-typescript';
import { ICats, ICatsService } from './DTO/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatsServices implements ICatsService {
    constructor(
        @Inject('CatsRepository') private readonly catsRepository: typeof CatsEntity,
        @Inject('SequelizeInstance') private readonly sequelizeInstance) { }

    // constructor(
    //     @Inject('CatsRepository')
    //     private readonly catsRepository: Repository<CatsEntity>) { }

    public async findAll():Promise<Array<CatsEntity>>{
        return await this.catsRepository.findAll<CatsEntity>();
    }

    public async findOne(options: Object): Promise<CatsEntity | null> {
        return await this.catsRepository.findOne<CatsEntity>(options);
    }

    public async findById(id: number): Promise<CatsEntity | null> {
        return await this.catsRepository.findById<CatsEntity>(id);
    }

    public async create(rentDetail: ICats): Promise<CatsEntity> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.catsRepository.create<CatsEntity>(rentDetail, {
                returning: true,
                transaction,
            });
        });
    }

    public async update(id: number, newValue: ICats): Promise<CatsEntity | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let rentDetail = await this.catsRepository.findById<CatsEntity>(id, { transaction });
            if (!rentDetail){
                console.error("cat不存在");
            }

            rentDetail = this._assign(rentDetail, newValue);
            return await rentDetail.save({
                returning: true,
                transaction,
            });
        });
    }

    public async delete(id: number): Promise<number> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.catsRepository.destroy({
                where: { id },
                transaction,
            });
        });
    }

    private _assign(rentDetail: ICats, newValue: ICats): CatsEntity {
        for (const key of Object.keys(rentDetail)) {
            if (rentDetail[key] !== newValue[key]) rentDetail[key] = newValue[key];
        }

        return rentDetail as CatsEntity;
    }
}
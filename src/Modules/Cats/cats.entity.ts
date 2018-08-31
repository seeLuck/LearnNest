import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

const tableOptions: IDefineOptions = { timestamp: false, tableName: 'Cats' } as IDefineOptions;

@Table(tableOptions)
export class CatsEntity extends Model<CatsEntity>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'id' })
    public ID: number;

    @Column({ type: DataType.STRING(50), allowNull: true, comment: '姓名', field: 'Name'})
    public Name: string;

    @Column({ type: DataType.INTEGER, allowNull: true, comment: '年紀',field:'Age' })
    public Age: number;
}
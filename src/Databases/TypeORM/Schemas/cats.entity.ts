import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cats')
export class CatsEntity {
    //主鍵，SQL Server識別種子
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ length: 50 })
    Name: string;

    @Column('int')
    Age: number;
}
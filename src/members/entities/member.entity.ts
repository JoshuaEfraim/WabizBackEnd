import { defaultIfEmpty } from 'rxjs';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Member extends Model<Member> {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password: string;

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: true,
    })
    gender: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    picture: string;

}
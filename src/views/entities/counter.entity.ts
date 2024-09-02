import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Counter extends Model<Counter> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  contentId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  count: number;
}

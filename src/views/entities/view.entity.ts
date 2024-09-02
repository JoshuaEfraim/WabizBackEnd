import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class View extends Model<View> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  contentId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userIp: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  viewDate: Date;
}

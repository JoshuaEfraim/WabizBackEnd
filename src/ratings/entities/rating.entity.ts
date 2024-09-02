import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { Post } from 'src/modules/posts/post.entity';

@Table
export class Rating extends Model<Rating> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Post)
  @Column
  contentId: number;

  @Column
  value: number; // This will store either 1 (like) or 0 (unlike)
}
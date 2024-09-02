import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Post extends Model<Post> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    body: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    contentID: number;

    @Column({
        type: DataType.STRING(10), // Example: 'ENG', 'IDN', etc.
        allowNull: false,
    })
    language: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3]], // Ensures the value is either 1, 2, or 3
        },
    })
    category: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('tags');
            return rawValue ? rawValue.split(',') : [];
        },
        set(value: string[]) {
            this.setDataValue('tags', value.join(','));
        },
    })
    tags: string[];

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    updatedBy: number;

    @BelongsTo(() => User, { foreignKey: 'userId' })
    user: User;

    @BelongsTo(() => User, { foreignKey: 'updatedBy' })
    updatedByUser: User;

    // Method to auto-generate contentID if it's not provided
    static async autoGenerateContentID() {
        const latestPost = await Post.findOne({
            order: [['contentID', 'DESC']]
        });
        return latestPost ? latestPost.contentID + 1 : 1;
    }
}

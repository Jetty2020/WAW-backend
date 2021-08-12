import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Post } from './post.entity';

@InputType('CommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Comment extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(0, 100)
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User;

  @RelationId((comment: Comment) => comment.user)
  userId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @RelationId((comment: Comment) => comment.post)
  postId: number;
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@InputType('LikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Like extends CoreEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  post: User;
}

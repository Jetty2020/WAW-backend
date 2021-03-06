import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Artist } from './artist.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@InputType('PostInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Post extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(1, 100)
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  imgUrl: string;

  @Field(() => Artist, { nullable: true })
  @ManyToOne(() => Artist, (artist) => artist.posts, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  artist: Artist;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  @IsInt()
  year: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  desc: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    eager: true,
  })
  writer: User;

  @RelationId((post: Post) => post.writer)
  writerId: number;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Field(() => Int)
  @IsInt()
  likesNum: number;

  @Field(() => Boolean)
  @IsBoolean()
  isLike: boolean;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  comments: Comment[];
}

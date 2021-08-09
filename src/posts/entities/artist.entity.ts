import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@InputType('ArtistInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Artist extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  @Length(2)
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.artist)
  posts: Post[];
}

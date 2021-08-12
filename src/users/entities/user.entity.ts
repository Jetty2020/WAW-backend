import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';
import { Like } from 'src/posts/entities/like.entity';
import { Comment } from 'src/posts/entities/comment.entity';

export enum UserRole {
  Guest = 'Guest',
  Manager = 'Manager',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  @Length(4, 13)
  nickname: string;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.writer)
  posts: Post[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}

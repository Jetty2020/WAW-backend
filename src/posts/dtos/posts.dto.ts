import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class PostsInput extends PaginationInput {}

@ObjectType()
export class PostsOutput extends PaginationOutput {
  @Field(() => [Post], { nullable: true })
  results?: Post[];
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class SearchPostInput extends PaginationInput {
  @Field(() => String)
  query: string;
}

@ObjectType()
export class SearchPostOutput extends PaginationOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}

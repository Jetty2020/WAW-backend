import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class SearchByUserInput extends PaginationInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class SearchByUserOutput extends PaginationOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}

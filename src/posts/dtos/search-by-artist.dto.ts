import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class SearchByArtistInput extends PaginationInput {
  @Field(() => Number)
  artistId: number;
}

@ObjectType()
export class SearchByArtistOutput extends PaginationOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}

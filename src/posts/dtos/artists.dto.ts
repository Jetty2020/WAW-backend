import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Artist } from '../entities/artist.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class ArtistsInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  slug?: string;
}

@ObjectType()
export class ArtistsOutput extends PaginationOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Artist], { nullable: true })
  artists?: Artist[];

  @Field(() => Artist, { nullable: true })
  artist?: Artist;
}

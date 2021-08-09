import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Artist } from '../entities/artist.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class ArtistInput extends PaginationInput {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class ArtistOutput extends PaginationOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => Artist, { nullable: true })
  artist?: Artist;
}

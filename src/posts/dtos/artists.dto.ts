import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Artist } from '../entities/artist.entity';

@ObjectType()
export class ArtistsOutput extends PaginationOutput {
  @Field(() => [Artist], { nullable: true })
  artists?: Artist[];
}

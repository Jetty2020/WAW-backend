import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class CreatePostInput extends PickType(PartialType(Post), [
  'title',
  'imgUrl',
  'desc',
  'year',
]) {
  @Field(() => String, { nullable: true })
  artistName: string;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {
  @Field(() => Int)
  postId?: number;
}

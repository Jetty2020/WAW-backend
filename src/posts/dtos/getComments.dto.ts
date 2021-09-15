import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Comment } from '../entities/comment.entity';

@InputType()
export class GetCommentsInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class GetCommentsOutput extends CoreOutput {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => Int, { nullable: true })
  totalResults?: number;
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteCommentInput {
  @Field(() => Number)
  commentId: number;
}

@ObjectType()
export class DeleteCommentOutput extends CoreOutput {}

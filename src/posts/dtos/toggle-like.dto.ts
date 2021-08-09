import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ToggleLikeInput {
  @Field(() => Number)
  postId: number;
}

@ObjectType()
export class ToggleLikeOutput extends CoreOutput {}

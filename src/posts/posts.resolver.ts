import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { MyPostsInput, MyPostsOutput } from './dtos/my-posts.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { Post } from './entities/post.entity';
import { PostService } from './posts.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => CreatePostOutput)
  @Role(['Any'])
  async createPost(
    @AuthUser() authUser: User,
    @Args('input') createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(authUser, createPostInput);
  }

  @Query(() => PostsOutput)
  posts(@Args('input') postsInput: PostsInput): Promise<PostsOutput> {
    return this.postService.allPosts(postsInput);
  }

  @Query(() => MyPostsOutput)
  @Role(['Any'])
  myPosts(
    @AuthUser() writer: User,
    @Args('input') myPostsInput: MyPostsInput,
  ): Promise<MyPostsOutput> {
    return this.postService.myPosts(writer, myPostsInput);
  }
}

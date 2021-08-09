import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { ArtistInput, ArtistOutput } from './dtos/artist.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { MyPostsInput, MyPostsOutput } from './dtos/my-posts.dto';
import { PostDetailInput, PostDetailOutput } from './dtos/postDetail.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { Artist } from './entities/artist.entity';
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

  @Query(() => PostDetailOutput)
  postDetail(
    @Args('input') postDetailInput: PostDetailInput,
  ): Promise<PostDetailOutput> {
    return this.postService.findPostById(postDetailInput);
  }
}
@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => ArtistOutput)
  artist(@Args('input') artistInput: ArtistInput): Promise<ArtistOutput> {
    return this.postService.findArtistBySlug(artistInput);
  }
}

import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { ArtistInput, ArtistOutput } from './dtos/artist.dto';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dtos/delete-comment.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edti-post.dto';
import { MyPostsInput, MyPostsOutput } from './dtos/my-posts.dto';
import { PostDetailInput, PostDetailOutput } from './dtos/postDetail.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { SearchPostInput, SearchPostOutput } from './dtos/search-post.dto';
import { ToggleLikeInput, ToggleLikeOutput } from './dtos/toggle-like.dto';
import { Artist } from './entities/artist.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
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

  @Mutation(() => EditPostOutput)
  @Role(['Any'])
  editPost(
    @AuthUser() writer: User,
    @Args('input') editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(writer, editPostInput);
  }

  @Mutation(() => DeletePostOutput)
  @Role(['Any'])
  deletePost(
    @AuthUser() writer: User,
    @Args('input') deletePostInput: DeletePostInput,
  ): Promise<DeletePostOutput> {
    return this.postService.deletePost(writer, deletePostInput);
  }

  @Query(() => SearchPostOutput)
  searchPost(
    @Args('input') searchPostInput: SearchPostInput,
  ): Promise<SearchPostOutput> {
    return this.postService.searchPostByTitle(searchPostInput);
  }

  @ResolveField(() => Number)
  likesNum(@Parent() post: Post) {
    return this.postService.getLikesNumber(post);
  }

  @ResolveField(() => Boolean)
  isLike(@Context() ctx: any, @Parent() post: Post) {
    return this.postService.checkILike(ctx, post);
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

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => ToggleLikeOutput)
  @Role(['Any'])
  async toggleLike(
    @AuthUser() authUser: User,
    @Args('input') toggleLikeInput: ToggleLikeInput,
  ): Promise<ToggleLikeOutput> {
    return this.postService.toggleLike(authUser, toggleLikeInput);
  }
}

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => CreateCommentOutput)
  @Role(['Any'])
  async createComment(
    @AuthUser() authUser: User,
    @Args('input') createcommentInput: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    return this.postService.createComment(authUser, createcommentInput);
  }

  @Mutation(() => DeleteCommentOutput)
  @Role(['Any'])
  async deleteComment(
    @AuthUser() authUser: User,
    @Args('input') deletecommentInput: DeleteCommentInput,
  ): Promise<DeleteCommentOutput> {
    return this.postService.deleteComment(authUser, deletecommentInput);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CONFIG_PAGES } from 'src/common/common.constants';
import { User } from 'src/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { ArtistInput, ArtistOutput } from './dtos/artist.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edti-post.dto';
import { MyPostsInput, MyPostsOutput } from './dtos/my-posts.dto';
import { PostDetailInput, PostDetailOutput } from './dtos/postDetail.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { SearchPostInput, SearchPostOutput } from './dtos/search-post.dto';
import { Artist } from './entities/artist.entity';
import { Post } from './entities/post.entity';
import { ArtistRepository } from './repositoties/artist.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
    private readonly artists: ArtistRepository,
  ) {}

  async createPost(
    writer: User,
    createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      const newPost = this.posts.create(createPostInput);
      newPost.writer = writer;
      if (createPostInput.artistName) {
        const artist = await this.artists.getOrCreate(
          createPostInput.artistName,
        );
        newPost.artist = artist;
      }
      await this.posts.save(newPost);
      return {
        ok: true,
        postId: newPost.id,
      };
    } catch {
      return {
        ok: false,
        error: '게시글 생성에 실패했습니다.',
      };
    }
  }

  async allPosts({ page }: PostsInput): Promise<PostsOutput> {
    try {
      const [posts, totalResults] = await this.posts.findAndCount({
        skip: (page - 1) * CONFIG_PAGES,
        take: CONFIG_PAGES,
        order: {
          createdAt: 'DESC',
        },
      });
      return {
        ok: true,
        results: posts,
        totalPages: Math.ceil(totalResults / CONFIG_PAGES),
        totalResults,
      };
    } catch {
      return {
        ok: false,
        error: '게시글 불러오는데 실패했습니다.',
      };
    }
  }

  async myPosts(writer: User, { page }: MyPostsInput): Promise<MyPostsOutput> {
    try {
      const [posts, totalResults] = await this.posts.findAndCount({
        where: {
          writer,
        },
        skip: (page - 1) * CONFIG_PAGES,
        take: CONFIG_PAGES,
        order: {
          createdAt: 'DESC',
        },
      });
      return {
        ok: true,
        posts,
        totalPages: Math.ceil(totalResults / CONFIG_PAGES),
        totalResults,
      };
    } catch {
      return {
        ok: false,
        error: '내 게시글을 불러오는데 실패했습니다.',
      };
    }
  }

  async findPostById({ postId }: PostDetailInput): Promise<PostDetailOutput> {
    try {
      const post = await this.posts.findOne(postId);
      if (!post) {
        return {
          ok: false,
          error: '게시물을 찾을 수 없습니다.',
        };
      }
      return {
        ok: true,
        post,
      };
    } catch {
      return {
        ok: false,
        error: '게시물을 불러오는데 실패했습니다.',
      };
    }
  }

  async editPost(
    writer: User,
    editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    try {
      const post = await this.posts.findOne(editPostInput.postId);
      if (!post) {
        return {
          ok: false,
          error: '게시물이 존재하지 않습니다.',
        };
      }
      if (writer.id !== post.writerId) {
        return {
          ok: false,
          error: '게시물을 편집할 권한이 없습니다.',
        };
      }
      let artist: Artist = null;
      if (editPostInput.artistName) {
        artist = await this.artists.getOrCreate(editPostInput.artistName);
      }
      await this.posts.save([
        {
          id: editPostInput.postId,
          ...editPostInput,
          ...(artist && { artist }),
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '게시물을 편집하는데 실패했습니다.',
      };
    }
  }

  async deletePost(
    writer: User,
    { postId }: DeletePostInput,
  ): Promise<DeletePostOutput> {
    try {
      const post = await this.posts.findOne(postId);
      if (!post) {
        return {
          ok: false,
          error: '게시물이 존재하지 않습니다.',
        };
      }
      if (writer.id !== post.writerId) {
        return {
          ok: false,
          error: '게시물을 삭제할 권한이 없습니다.',
        };
      }
      await this.posts.delete(postId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '게시물을 삭제하는데 실패했습니다.',
      };
    }
  }

  async searchPostByTitle({
    query,
    page,
  }: SearchPostInput): Promise<SearchPostOutput> {
    try {
      const [posts, totalResults] = await this.posts.findAndCount({
        where: {
          title: ILike(`%${query}%`),
        },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        posts,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch {
      return { ok: false, error: '게시물을 검색하는데 실패했습니다.' };
    }
  }

  async findArtistBySlug({ slug, page }: ArtistInput): Promise<ArtistOutput> {
    try {
      const artist = await this.artists.findOne({ slug });
      if (!artist) {
        return {
          ok: false,
          error: '작가를 찾을 수 없습니다.',
        };
      }
      const [posts, totalResults] = await this.posts.findAndCount({
        where: {
          artist,
        },
        order: {
          createdAt: 'DESC',
        },
        take: CONFIG_PAGES,
        skip: (page - 1) * CONFIG_PAGES,
      });
      return {
        ok: true,
        posts,
        artist,
        totalPages: Math.ceil(totalResults / CONFIG_PAGES),
        totalResults,
      };
    } catch {
      return {
        ok: false,
        error: '작가를 불러오는데 실패했습니다.',
      };
    }
  }
}

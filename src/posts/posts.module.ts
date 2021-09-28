import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Post } from './entities/post.entity';
import {
  ArtistResolver,
  CommentResolver,
  LikeResolver,
  PostResolver,
} from './posts.resolver';
import { PostService } from './posts.service';
import { ArtistRepository } from './repositoties/artist.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, ArtistRepository, Like, Comment]),
  ],
  providers: [
    PostResolver,
    PostService,
    ArtistResolver,
    LikeResolver,
    CommentResolver,
  ],
})
export class PostsModule {}

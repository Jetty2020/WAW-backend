import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Post } from './entities/post.entity';
import { ArtistResolver, LikeResolver, PostResolver } from './posts.resolver';
import { PostService } from './posts.service';
import { ArtistRepository } from './repositoties/artist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post, ArtistRepository, Like])],
  providers: [PostResolver, PostService, ArtistResolver, LikeResolver],
})
export class PostsModule {}

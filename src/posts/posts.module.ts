import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ArtistResolver, PostResolver } from './posts.resolver';
import { PostService } from './posts.service';
import { ArtistRepository } from './repositoties/artist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post, ArtistRepository])],
  providers: [PostResolver, PostService, ArtistResolver],
})
export class PostsModule {}

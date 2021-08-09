import { EntityRepository, Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {
  async getOrCreate(name: string): Promise<Artist> {
    const artistName = name.trim().toLowerCase();
    const artistSlug = artistName.replace(/ /g, '-');
    let artist = await this.findOne({ slug: artistSlug });
    if (!artist) {
      artist = await this.save(
        this.create({ slug: artistSlug, name: artistName }),
      );
    }
    return artist;
  }
}

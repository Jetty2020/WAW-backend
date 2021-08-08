import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    nickname,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: '이미 다른 유저가 사용하는 메일입니다.' };
      }
      await this.users.save(
        this.users.create({ email, nickname, password, role }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: '계정을 만들 수 없습니다.' };
    }
  }
}

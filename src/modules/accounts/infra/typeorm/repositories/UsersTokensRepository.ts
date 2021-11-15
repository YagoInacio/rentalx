import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    return this.repository.findOne({
      where: { user: userId, refreshToken },
      relations: ['user'],
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };

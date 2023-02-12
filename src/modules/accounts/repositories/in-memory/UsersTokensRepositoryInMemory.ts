import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = [];

  async create({
    user,
    expirationDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user,
      expirationDate,
      refreshToken,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    throw new Error('Method not implemented.');
  }

  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    throw new Error('Method not implemented.');
  }
}

export { UsersTokensRepositoryInMemory };

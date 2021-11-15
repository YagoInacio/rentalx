import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(refreshToken: string): Promise<IResponse> {
    const { sub: userId, email } = verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exist!');
    }

    if (dayjs(userToken.expirationDate).isBefore(new Date())) {
      throw new AppError('Refresh token expired');
    }

    const token = sign({}, process.env.SECRET_TOKEN, {
      subject: userId,
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: userToken.user.name,
        email,
      },
      refreshToken,
    };

    return tokenReturn;
  }
}

export { RefreshTokenUseCase };

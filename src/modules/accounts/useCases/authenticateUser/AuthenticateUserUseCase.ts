import { compare } from 'bcrypt';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
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
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, process.env.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    const refreshToken = sign({ email }, process.env.SECRET_REFRESH_TOKEN, {
      subject: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    const refreshTokenExpirationDays = parseInt(
      process.env.REFRESH_TOKEN_EXPIRES_DAYS,
      10
    );

    await this.usersTokensRepository.create({
      user,
      refreshToken,
      expirationDate: dayjs().add(refreshTokenExpirationDays, 'days').toDate(),
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

import { User } from '../infra/typeorm/entities/User';

interface ICreateUserTokenDTO {
  user: User;
  expirationDate: Date;
  refreshToken: string;
}

export { ICreateUserTokenDTO };

import { IMailVariablesDTO } from './dtos/IMailVariablesDTO';

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IMailVariablesDTO,
    path: string
  ): Promise<void>;
}

export { IMailProvider };

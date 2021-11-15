import { container } from 'tsyringe';

import { IMailProvider } from './MailProvider/IMailProvider';
// import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { MailProvider } from './MailProvider/implementations/MailProvider';

// container.registerInstance<IMailProvider>(
//   'EtherealMailProvider',
//   new EtherealMailProvider()
// );

container.registerSingleton<IMailProvider>('MailProvider', MailProvider);

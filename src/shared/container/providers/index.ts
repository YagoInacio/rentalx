import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
// import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { MailProvider } from './MailProvider/implementations/MailProvider';

// container.registerInstance<IMailProvider>(
//   'EtherealMailProvider',
//   new EtherealMailProvider()
// );

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);

container.registerSingleton<IMailProvider>('MailProvider', MailProvider);

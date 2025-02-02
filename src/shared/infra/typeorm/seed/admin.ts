import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO public.users
    (id, "name", "password", email, "isAdmin", driver_license, created_at)
    VALUES('${id}', 'admin', '${password}', 'admin@rentx.com.br', true, '1234', now());
  `);

  await connection.close();
}

create().then(() => console.log('Admin user created'));

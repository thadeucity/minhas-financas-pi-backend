import { container } from 'tsyringe';

import '@providers/index';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/repositories/typeOrm/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

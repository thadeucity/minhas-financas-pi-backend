import { container } from 'tsyringe';

import '@providers/index';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/repositories/typeOrm/UsersRepository';

import { IDreamsRepository } from '@modules/dreams/repositories/IDreamsRepository';
import { DreamsRepository } from '@modules/dreams/repositories/typeOrm/DreamsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDreamsRepository>(
  'DreamsRepository',
  DreamsRepository,
);

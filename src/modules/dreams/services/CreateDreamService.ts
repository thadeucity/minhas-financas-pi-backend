import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Dream } from '@entities/Dream';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { isValidDate } from '@shared/utils/isValidDate';
import { IDreamsRepository } from '../repositories/IDreamsRepository';

interface IRequest {
  name: string;
  value: number;
  deadline: string;
  userId: string;
}

@injectable()
export class CreateDreamService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    deadline,
    userId,
    value,
  }: IRequest): Promise<Dream> {
    const deadLineDate = new Date(deadline);

    if (!isValidDate(deadLineDate)) {
      throw new AppError('Invalid date');
    }

    if (deadLineDate < new Date()) {
      throw new AppError('Deadline must be a future date');
    }

    const checkUserExists = await this.usersRepository.findById(userId);

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }

    if (value < 0) {
      throw new AppError('Value must be positive');
    }

    const dream = await this.dreamsRepository.create({
      name,
      value,
      userId,
      deadline: deadLineDate,
    });

    return dream;
  }
}

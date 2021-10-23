import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Dream } from '@entities/Dream';

import { isValidDate } from '@shared/utils/isValidDate';
import { IDreamsRepository } from '../repositories/IDreamsRepository';

interface IRequest {
  name?: string;
  value?: number;
  deadline?: string;
  userId: string;
  dreamId: string;
}

@injectable()
export class UpdateDreamService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,
  ) {}

  public async execute({
    name,
    deadline,
    value,
    userId,
    dreamId,
  }: IRequest): Promise<Dream> {
    const foundDream = await this.dreamsRepository.findById(dreamId);

    if (!foundDream) {
      throw new AppError('Dream not found', 404);
    }

    if (foundDream.user_id !== userId) {
      throw new AppError('You can only update your dreams', 401);
    }

    const deadLineDate = deadline ? new Date(deadline) : undefined;

    if (deadLineDate && !isValidDate(deadLineDate)) {
      throw new AppError('Invalid date');
    }

    if (deadLineDate && deadLineDate < new Date()) {
      throw new AppError('Deadline must be a future date');
    }

    if ((value || 0) < 0) {
      throw new AppError('Value must be positive');
    }

    const updatedDream = {
      ...foundDream,
      name: name || foundDream.name,
      deadline: deadLineDate || foundDream.deadline,
      value: value || foundDream.value,
    } as Dream;

    const savedDream = await this.dreamsRepository.save(updatedDream);

    return savedDream;
  }
}

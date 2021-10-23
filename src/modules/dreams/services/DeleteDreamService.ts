import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IDreamsRepository } from '../repositories/IDreamsRepository';

interface IRequest {
  dreamId: string;
  userId: string;
}

@injectable()
export class DeleteDreamService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,
  ) {}

  public async execute({ dreamId, userId }: IRequest): Promise<void> {
    const dream = await this.dreamsRepository.findById(dreamId);

    if (!dream) {
      throw new AppError('Dream not found', 404);
    }

    if (dream.user_id !== userId) {
      throw new AppError('You can only delete your dreams', 403);
    }

    await this.dreamsRepository.delete(dreamId);
  }
}

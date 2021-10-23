import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Dream } from '@entities/Dream';

import { IDreamsRepository } from '../repositories/IDreamsRepository';

interface IRequest {
  userId: string;
}

@injectable()
export class BrowseDreamsByUserService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Dream[]> {
    const dream = await this.dreamsRepository.findAllByUser(userId);

    if (!dream) {
      throw new AppError('Dream not found');
    }

    return dream;
  }
}

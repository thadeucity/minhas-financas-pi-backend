import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Contribution } from '@entities/Contribution';

import { IDreamsRepository } from '@modules/dreams/repositories/IDreamsRepository';
import { IContributionsRepository } from '../repositories/IContributionsRepository';

interface IRequest {
  value: number;
  isNegative: boolean;
  dreamId: string;
  userId: string;
}

@injectable()
export class CreateContributionService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,

    @inject('ContributionsRepository')
    private contributionsRepository: IContributionsRepository,
  ) {}

  public async execute({
    value,
    isNegative,
    dreamId,
    userId,
  }: IRequest): Promise<Contribution> {
    const checkDreamExists = await this.dreamsRepository.findById(dreamId);

    if (!checkDreamExists) {
      throw new AppError('Dream not found');
    }

    if (checkDreamExists.user_id !== userId) {
      throw new AppError('You can only contribute to your dreams');
    }

    const absoluteValue = Math.abs(value);

    const contributions = await this.contributionsRepository.create({
      value: absoluteValue,
      is_negative: isNegative,
      dream_id: dreamId,
    });

    return contributions;
  }
}

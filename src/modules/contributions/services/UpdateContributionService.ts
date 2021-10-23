import { injectable, inject } from 'tsyringe';

import { Contribution } from '@entities/Contribution';

import AppError from '@shared/errors/AppError';
import { IContributionsRepository } from '../repositories/IContributionsRepository';

interface IRequest {
  value?: number;
  isNegative?: boolean;
  contributionId: string;
  userId: string;
}

@injectable()
export class UpdateContributionService {
  constructor(
    @inject('ContributionsRepository')
    private contributionsRepository: IContributionsRepository,
  ) {}

  public async execute({
    value,
    isNegative,
    contributionId,
    userId,
  }: IRequest): Promise<Contribution> {
    const contribution = await this.contributionsRepository.findById(
      contributionId,
    );

    if (!contribution) {
      throw new AppError('Contribution not found', 404);
    }

    if (contribution.dream?.user_id !== userId) {
      throw new AppError('You can only read your own contributions', 403);
    }

    const updatedContribution = await this.contributionsRepository.save({
      ...contribution,
      value: value ?? contribution.value,
      is_negative: isNegative ?? contribution.is_negative,
    });

    return updatedContribution;
  }
}

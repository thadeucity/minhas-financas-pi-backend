import { injectable, inject } from 'tsyringe';

import { Contribution } from '@entities/Contribution';

import AppError from '@shared/errors/AppError';
import { IContributionsRepository } from '../repositories/IContributionsRepository';

interface IRequest {
  contributionId: string;
  userId: string;
}

@injectable()
export class ReadContributionService {
  constructor(
    @inject('ContributionsRepository')
    private contributionsRepository: IContributionsRepository,
  ) {}

  public async execute({
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

    return contribution;
  }
}

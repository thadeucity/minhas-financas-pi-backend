import { injectable, inject } from 'tsyringe';

import { Contribution } from '@entities/Contribution';

import { IContributionsRepository } from '../repositories/IContributionsRepository';

interface IRequest {
  dreamId?: string;
  userId: string;
}

@injectable()
export class ListContributionService {
  constructor(
    @inject('ContributionsRepository')
    private contributionsRepository: IContributionsRepository,
  ) {}

  public async execute({ dreamId, userId }: IRequest): Promise<Contribution[]> {
    const contributions = await this.contributionsRepository.list({
      dreamId,
      userId,
    });

    return contributions;
  }
}

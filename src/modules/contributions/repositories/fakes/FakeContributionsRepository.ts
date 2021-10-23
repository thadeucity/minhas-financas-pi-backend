import { uuid } from 'uuidv4';

import { IContributionsRepository } from '@modules/contributions/repositories/IContributionsRepository';
import { ICreateContributionDTO } from '@modules/contributions/dtos/ICreateContributionDTO';

import { Contribution } from '@entities/Contribution';

export class FakeContributionsRepository implements IContributionsRepository {
  private contributions: Contribution[] = [];

  public async findById(id: string): Promise<Contribution | undefined> {
    const findContribution = this.contributions.find(dream => dream.id === id);

    return findContribution;
  }

  public async findByDream(dreamId: string): Promise<Contribution | undefined> {
    const findContribution = this.contributions.find(
      contribution => contribution.dream_id === dreamId,
    );

    return findContribution;
  }

  public async create(
    contributionData: ICreateContributionDTO,
  ): Promise<Contribution> {
    const contribution = new Contribution();

    Object.assign(contribution, { id: uuid() }, contributionData);

    this.contributions.push(contribution);

    return contribution;
  }

  public async save(dream: Contribution): Promise<Contribution> {
    const findIndex = this.contributions.findIndex(
      contribution => contribution.id === dream.id,
    );

    this.contributions[findIndex] = dream;

    return dream;
  }
}

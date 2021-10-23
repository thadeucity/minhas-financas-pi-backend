import { uuid } from 'uuidv4';
import { updateObj } from 'unch';

import { IContributionsRepository } from '@modules/contributions/repositories/IContributionsRepository';
import { ICreateContributionDTO } from '@modules/contributions/dtos/ICreateContributionDTO';

import { Contribution } from '@entities/Contribution';
import { IListContributionsDTO } from '@modules/contributions/dtos/IListContributionsDTO';

export class FakeContributionsRepository implements IContributionsRepository {
  private contributions: Contribution[] = [];

  public async findById(id: string): Promise<Contribution | undefined> {
    const findContribution = this.contributions.find(dream => dream.id === id);

    return findContribution;
  }

  public async list({
    userId = '1',
    dreamId,
  }: IListContributionsDTO): Promise<Contribution[]> {
    return this.contributions.filter(
      contribution =>
        contribution.dream?.user_id === userId &&
        contribution.dream_id === dreamId,
    );
  }

  public async create(
    contributionData: ICreateContributionDTO,
  ): Promise<Contribution> {
    const contribution = new Contribution();
    const lastUserId =
      this.contributions[this.contributions.length - 1]?.dream?.user_id;

    const newUserId = lastUserId === '1' ? '2' : '1';

    const newContribution = updateObj(contribution, {
      id: uuid(),
      dream: {
        ...contribution.dream,
        id: contributionData.dream_id,
        user_id: newUserId,
      },
      ...contributionData,
    });

    this.contributions.push(newContribution);

    return contribution;
  }

  public async save(dream: Contribution): Promise<Contribution> {
    const findIndex = this.contributions.findIndex(
      contribution => contribution.id === dream.id,
    );

    this.contributions[findIndex] = dream;

    return dream;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.contributions.findIndex(
      contribution => contribution.id === id,
    );

    this.contributions.splice(findIndex, 1);
  }
}

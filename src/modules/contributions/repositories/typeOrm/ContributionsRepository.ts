import { getRepository, Repository } from 'typeorm';

import { ICreateContributionDTO } from '@modules/contributions/dtos/ICreateContributionDTO';

import { Contribution } from '@entities/Contribution';
import { IListContributionsDTO } from '@modules/contributions/dtos/IListContributionsDTO';
import { IContributionsRepository } from '../IContributionsRepository';

export class ContributionsRepository implements IContributionsRepository {
  private ormRepository: Repository<Contribution>;

  constructor() {
    this.ormRepository = getRepository(Contribution);
  }

  public async list({
    userId,
    dreamId,
  }: IListContributionsDTO): Promise<Contribution[]> {
    const contributions = await this.ormRepository.find({
      relations: ['dream'],
      where: {
        dream: { user_id: userId },
        ...(dreamId && { dream_id: dreamId }),
      },
    });

    return contributions;
  }

  public async findById(id: string): Promise<Contribution | undefined> {
    const contribution = await this.ormRepository.findOne(id, {
      relations: ['dream'],
    });

    return contribution;
  }

  public async create(
    dreamData: ICreateContributionDTO,
  ): Promise<Contribution> {
    const contribution = this.ormRepository.create(dreamData);

    await this.ormRepository.save(contribution);

    return contribution;
  }

  public async save(dream: Contribution): Promise<Contribution> {
    return this.ormRepository.save(dream);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

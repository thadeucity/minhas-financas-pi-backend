import { getRepository, Repository } from 'typeorm';

import { ICreateContributionDTO } from '@modules/contributions/dtos/ICreateContributionDTO';

import { Contribution } from '@entities/Contribution';
import { IContributionsRepository } from '../IContributionsRepository';

export class ContributionsRepository implements IContributionsRepository {
  private ormRepository: Repository<Contribution>;

  constructor() {
    this.ormRepository = getRepository(Contribution);
  }

  public async findById(id: string): Promise<Contribution | undefined> {
    const contribution = await this.ormRepository.findOne(id);

    return contribution;
  }

  public async findByDream(dreamId: string): Promise<Contribution | undefined> {
    const contribution = await this.ormRepository.findOne({
      where: { dream_id: dreamId },
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
}

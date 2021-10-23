import { Contribution } from '@entities/Contribution';
import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO';

export interface IContributionsRepository {
  findById(id: string): Promise<Contribution | undefined>;
  findByDream(dreamId: string): Promise<Contribution | undefined>;
  create(data: ICreateContributionDTO): Promise<Contribution>;
  save(contribution: Contribution): Promise<Contribution>;
}

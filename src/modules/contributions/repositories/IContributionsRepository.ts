import { Contribution } from '@entities/Contribution';
import { ICreateContributionDTO } from '../dtos/ICreateContributionDTO';
import { IListContributionsDTO } from '../dtos/IListContributionsDTO';

export interface IContributionsRepository {
  list(data: IListContributionsDTO): Promise<Contribution[]>;
  findById(id: string): Promise<Contribution | undefined>;
  create(data: ICreateContributionDTO): Promise<Contribution>;
  save(contribution: Contribution): Promise<Contribution>;
  delete(id: string): Promise<void>;
}

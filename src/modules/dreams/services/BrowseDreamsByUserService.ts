import { injectable, inject } from 'tsyringe';

import { Dream } from '@entities/Dream';
import { IDreamsRepository } from '../repositories/IDreamsRepository';

interface IRequest {
  userId: string;
}

@injectable()
export class BrowseDreamsByUserService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Dream[]> {
    const dreams = await this.dreamsRepository.findAllByUser(userId);

    return dreams;
  }
}

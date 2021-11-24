import { injectable, inject } from 'tsyringe';

import { Dream } from '@entities/Dream';
import { IDreamsRepository } from '../repositories/IDreamsRepository';

interface IRequest {
  userId: string;
}

interface IResponse extends Dream {
  progression: number;
}

@injectable()
export class BrowseDreamsByUserService {
  constructor(
    @inject('DreamsRepository')
    private dreamsRepository: IDreamsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse[]> {
    const dreams = await this.dreamsRepository.findAllByUser(userId);

    const dreamsWithProgression = dreams.map(dream => {
      const { contributions } = dream;

      const contributionsSum = contributions.reduce(
        (acc, curr) =>
          curr.is_negative
            ? acc - Number(curr.value)
            : acc + Number(curr.value),
        0,
      );

      const dreamProgression = contributionsSum / Number(dream.value);

      return { ...dream, progression: dreamProgression };
    });

    return dreamsWithProgression;
  }
}

import { getRepository, Repository } from 'typeorm';

import { ICreateDreamDTO } from '@modules/dreams/dtos/ICreateDreamDTO';

import { Dream } from '@entities/Dream';
import { IDreamsRepository } from '../IDreamsRepository';

export class DreamsRepository implements IDreamsRepository {
  private ormRepository: Repository<Dream>;

  constructor() {
    this.ormRepository = getRepository(Dream);
  }

  public async findById(id: string): Promise<Dream | undefined> {
    const dream = await this.ormRepository.findOne(id, {
      relations: ['contributions'],
    });

    return dream;
  }

  public async findAllByUser(userId: string): Promise<Dream[]> {
    const dream = await this.ormRepository.find({
      where: { user_id: userId },
    });

    return dream;
  }

  public async create(dreamData: ICreateDreamDTO): Promise<Dream> {
    const dream = this.ormRepository.create(dreamData);

    await this.ormRepository.save(dream);

    return dream;
  }

  public async save(dream: Dream): Promise<Dream> {
    return this.ormRepository.save(dream);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

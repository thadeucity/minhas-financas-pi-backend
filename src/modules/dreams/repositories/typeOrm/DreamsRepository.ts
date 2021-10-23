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
    const dream = await this.ormRepository.findOne(id);

    return dream;
  }

  public async findByUser(userId: string): Promise<Dream | undefined> {
    const dream = await this.ormRepository.findOne({
      where: { user_id: userId },
    });

    return dream;
  }

  public async create(dreamData: ICreateDreamDTO): Promise<Dream> {
    const appointment = this.ormRepository.create(dreamData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(dream: Dream): Promise<Dream> {
    return this.ormRepository.save(dream);
  }
}

import { uuid } from 'uuidv4';

import { IDreamsRepository } from '@modules/dreams/repositories/IDreamsRepository';
import { ICreateDreamDTO } from '@modules/dreams/dtos/ICreateDreamDTO';

import { Dream } from '@entities/Dream';

export class FakeDreamsRepository implements IDreamsRepository {
  private dreams: Dream[] = [];

  public async findById(id: string): Promise<Dream | undefined> {
    const findDream = this.dreams.find(dream => dream.id === id);

    return findDream;
  }

  public async findByUser(userId: string): Promise<Dream | undefined> {
    const findDream = this.dreams.find(dream => dream.user_id === userId);

    return findDream;
  }

  public async create(dreamData: ICreateDreamDTO): Promise<Dream> {
    const dream = new Dream();

    Object.assign(dream, { id: uuid() }, dreamData);

    this.dreams.push(dream);

    return dream;
  }

  public async save(dream: Dream): Promise<Dream> {
    const findIndex = this.dreams.findIndex(
      findDream => findDream.id === dream.id,
    );

    this.dreams[findIndex] = dream;

    return dream;
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Dream } from './Dream';

@Entity('contributions')
export class Contribution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('integer')
  value: number;

  @Column('boolean')
  deadline: boolean;

  @Column('uuid')
  dream_id: string;

  @ManyToOne(() => Dream, dream => dream.contributions)
  dream: Dream;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

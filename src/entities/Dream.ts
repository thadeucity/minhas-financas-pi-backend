import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Contribution } from './Contribution';
import { User } from './User';

@Entity('dreams')
export class Dream {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('bigint')
  value: number;

  @Column('timestamp with time zone')
  deadline: Date;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.dreams)
  user: User;

  @OneToMany(() => Contribution, contribution => contribution.dream_id)
  contributions: Contribution[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  account_type!: string;

  @Column()
  provider!: string;

  @Column('decimal', { precision: 15, scale: 2 })
  initial_balance!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  current_balance!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column()
  user_id!: string;
}

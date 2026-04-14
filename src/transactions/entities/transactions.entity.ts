import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  datetime!: Date;

  @Column()
  transaction_category!: string;

  @Column('decimal')
  amount!: number;

  @Column({ nullable: true })
  note?: string;

  @Column()
  transaction_type!: string;

  @Column()
  transaction_account!: string;

  @Column({ nullable: true })
  receiving_account?: string;

  @Column({ nullable: true })
  receiving_category?: string;

  @Column({ nullable: true })
  saving_name?: string;

  @Column({ nullable: true })
  fee?: number;

  @Column({ select: false })
  user_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

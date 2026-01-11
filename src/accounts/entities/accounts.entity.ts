import { Transactions } from '../../transactions/entities/transactions.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  account_class_id: number;

  @Column()
  account_class_name: string;

  @Column()
  account_type_id: number;

  @Column()
  account_type_name: string;

  @Column()
  current_balance: number;

  @Column({ nullable: true })
  interest_rate?: number;

  @Column({ nullable: true })
  goal_amount?: number;

  @Column({ nullable: true })
  network_id?: number;

  @Column({ nullable: true })
  network_name?: string;

  @Column({ nullable: true })
  credit_limit?: number;

  @Column({ nullable: true })
  cash_advance_limit?: number;

  @Column({ nullable: true })
  billing_date?: Date;

  @Column({ nullable: true })
  due_date?: Date;

  @Column({ nullable: true })
  start_date?: Date;

  @Column({ nullable: true })
  end_date?: Date;

  @Column({ select: false })
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => Transactions,
    (transactions) => transactions.account_to_add,
    { nullable: true },
  )
  income_transactions: Transactions[];

  @OneToMany(
    () => Transactions,
    (transactions) => transactions.account_to_deduct,
    { nullable: true },
  )
  expense_transactions: Transactions[];
}

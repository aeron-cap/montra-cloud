import { Accounts } from 'src/accounts/accounts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateTime?: Date;

  @Column()
  transaction_category_id: number;
  @Column()
  transaction_category_name: string;

  @Column()
  amount: number;

  @Column()
  transaction_name: string;

  @Column()
  transaction_note: string;

  @Column()
  transaction_type_id: number;
  @Column()
  transaction_type_name: string;

  @Column({ nullable: true })
  account_to_deduct_id?: number;
  @Column({ nullable: true })
  account_to_deduct_name?: string;

  @ManyToOne(() => Accounts, (account) => account.expense_transactions, {
    nullable: true,
  })
  @JoinColumn({ name: 'account_to_deduct_id' })
  account_to_deduct?: Accounts;

  @Column({ nullable: true })
  budget_id?: number;
  @Column({ nullable: true })
  budget_name?: string;

  @Column({ nullable: true })
  account_to_add_id?: number;
  @Column({ nullable: true })
  account_to_add_name?: string;

  @ManyToOne(() => Accounts, (account) => account.income_transactions, {
    nullable: true,
  })
  @JoinColumn({ name: 'account_to_add_id' })
  account_to_add?: Accounts;

  @Column({ nullable: true })
  number_of_installment?: number;
  @Column({ nullable: true })
  total_installment_amount?: number;

  @Column({ nullable: true })
  fee?: number;

  @Column({ select: false })
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

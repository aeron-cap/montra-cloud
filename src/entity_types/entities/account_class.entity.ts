import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AccountClasses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname: string;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  accent_color: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

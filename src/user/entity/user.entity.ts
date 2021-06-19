import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  firstName: string;

  @Column({ length: 45 })
  lastName: string;

  @Column({ length: 13, unique: true })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 45 })
  password: string;

  @Column({ length: 45 })
  status: string;

  @Column({ length: 6, nullable: true })
  otp: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdOn: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  modifiedOn: Date;

  accessToken: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailTemplates {
  @PrimaryGeneratedColumn()
  id: number;

  email: string;

  @Column({ length: 4500 })
  emailContent: string;

  @Column({ length: 250 })
  emailSubject: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100, default: 'Knowtify' })
  senderName: string;

  @Column({ length: 45 })
  status: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdOn: Date;
}

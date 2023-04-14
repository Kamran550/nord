import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.entity';


@Entity('statuses_translations', { synchronize: false })
export class StatusTranslation {
  @PrimaryGeneratedColumn('uuid')
  status_uuid: string;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_uuid' })
  status: Status;

  @Column()
  name: string;

  @Column()
  locale: string;
}

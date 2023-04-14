import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusTranslation } from './status.translation.entity';


@Entity('statuses', { synchronize: false })
export class Status {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  modelClass: string;

  @Column({ type: 'json', nullable: true })
  meta: string;

  @OneToMany(() => StatusTranslation, (statusTranslation) => statusTranslation.status)
  translations: StatusTranslation[];
}

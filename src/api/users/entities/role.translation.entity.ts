import {
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Role } from './role.entity';


@Entity('roles_translations', { synchronize: false })
export class RoleTranslation {
  @PrimaryGeneratedColumn('uuid')
  role_uuid: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_uuid' })
  role: Role;

  @Column({ nullable: true })
  name: string;

  @Column()
  locale: string;
}

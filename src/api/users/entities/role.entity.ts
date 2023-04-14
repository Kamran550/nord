import {
  Column,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Permission } from './permission.entity';
import { RoleTranslation } from './role.translation.entity';


@Entity('roles', { synchronize: false })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_uuid' },
    inverseJoinColumn: { name: 'permission_uuid' },
    synchronize: false
  })
  permissions: Permission[];

  @OneToMany(() => RoleTranslation, (roleTranslation) => roleTranslation.role)
  translations: RoleTranslation[];
}

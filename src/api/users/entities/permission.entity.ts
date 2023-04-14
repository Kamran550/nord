import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PermissionGroup } from './permission-group.entity';
import { Role } from './role.entity';


@Entity('permissions', { synchronize: false })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'bool', width: 1, default: 0 })
  toggleable: boolean;

  @ManyToOne(() => PermissionGroup)
  @JoinColumn({ name: 'permission_group_uuid' })
  permissionGroup: PermissionGroup;

  @ManyToMany(() => Role)
  roles: Role[];
}

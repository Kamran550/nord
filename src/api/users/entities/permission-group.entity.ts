import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';


@Entity('permission_group', { synchronize: false })
export class PermissionGroup {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Permission, permission => permission.permissionGroup)
  permissions: Permission[];
}

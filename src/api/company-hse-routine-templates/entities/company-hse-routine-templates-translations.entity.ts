import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { CompanyHseRoutineTemplate } from './company-hse-routine-template.entity';


@Entity('company_hse_routine_templates_translations')
export class CompanyHseRoutineTemplateTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'blob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
  })
  content: string;

  @Column()
  locale: string;

  @ManyToOne(() => CompanyHseRoutineTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_hse_routine_template_uuid' })
  companyHseRoutineTemplate: CompanyHseRoutineTemplate;
}

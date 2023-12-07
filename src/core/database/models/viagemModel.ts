import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { ViagemEntradaModel } from './viagemEntradaModel';

@Entity('viagens')
export class ViagemModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  local: string;

  @Column({ type: 'date' })
  data: Date;

  @Column({ default: false })
  finalizado: boolean;

  @OneToMany(() => ViagemEntradaModel, (entrada) => entrada.viagem)
  entradas: ViagemEntradaModel[];
}

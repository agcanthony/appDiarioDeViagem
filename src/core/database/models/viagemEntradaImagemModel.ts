import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ViagemEntradaModel } from './viagemEntradaModel';

@Entity('viagem_entrada_imagens')
export class ViagemEntradaImagemModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 512 })
  caminho: string;

  @ManyToOne(() => ViagemEntradaModel, (entrada) => entrada.imagens, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'viagemEntradaId' })
  viagemEntrada: ViagemEntradaModel;
}

import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ViagemModel } from './viagemModel';
import { ViagemEntradaImagemModel } from './viagemEntradaImagemModel';

@Entity('viagem_entradas')
export class ViagemEntradaModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  local: string;

  @Column({ length: Number.MAX_VALUE })
  descricao: string;

  @Column({ type: 'date' })
  data: Date;

  @ManyToOne(() => ViagemModel, (viagem) => viagem.entradas, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'viagemId' })
  viagem: ViagemModel;

  @OneToMany(() => ViagemEntradaImagemModel, (imagem) => imagem.viagemEntrada)
  imagens: ViagemEntradaImagemModel[];
}

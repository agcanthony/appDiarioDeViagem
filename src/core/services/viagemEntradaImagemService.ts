import { IViagemEntradaImagemRepository } from 'core/database/interfaces';
import { ViagemEntradaImagemModel } from 'core/database/models';

export type CriarViagemEntradaImagemProps = Omit<ViagemEntradaImagemModel, 'id'>;

export class ViagemEntradaImagemService {
  constructor(private readonly viagemEntradaImagemRepository: IViagemEntradaImagemRepository) {}

  async criar(viagemEntradaImagem: CriarViagemEntradaImagemProps) {
    return await this.viagemEntradaImagemRepository.criar(viagemEntradaImagem);
  }

  async obterTodas(id?: number, local?: string) {
    return await this.viagemEntradaImagemRepository.obterTodas(id, local);
  }

  async excluir(id: number): Promise<boolean> {
    return await this.viagemEntradaImagemRepository.excluir(id);
  }
}

import { IViagemRepository } from 'core/database/interfaces';
import { ViagemModel } from 'core/database/models';

export type CriarViagemProps = Omit<ViagemModel, 'id'>;

export class ViagemService {
  constructor(private readonly viagemRepository: IViagemRepository) {}

  async criar(viagem: CriarViagemProps) {
    return await this.viagemRepository.criar(viagem);
  }

  async obterTodas() {
    return await this.viagemRepository.obterTodas();
  }

  async alterar(viagemAtualizada: Partial<ViagemModel>): Promise<ViagemModel | undefined> {
    return await this.viagemRepository.alterar(viagemAtualizada);
  }

  async excluirViagens(ids: number[]): Promise<boolean> {
    return await this.viagemRepository.excluirViagens(ids);
  }

  async obterTodasComEntradasEImagens(id?: number, local?: string) {
    return await this.viagemRepository.obterTodasComEntradasEImagens(id, local);
  }
}

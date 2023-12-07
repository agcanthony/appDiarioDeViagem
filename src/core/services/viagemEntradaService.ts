import { IViagemEntradaRepository } from 'core/database/interfaces';
import { ViagemEntradaModel } from 'core/database/models';
import { DIARIO_VIAGEM_DIR_COMPLETO } from 'utils/contants';
import { GerenciadorArquivoService } from './gerenciadorArquivoService';

export type CriarViagemEntradaProps = Omit<ViagemEntradaModel, 'id'>;

export class ViagemEntradaService {
  constructor(
    private readonly viagemEntradaRepository: IViagemEntradaRepository,
    private readonly gerenciadorArquivoService: GerenciadorArquivoService
  ) {}

  async criar(viagemEntrada: CriarViagemEntradaProps) {
    // atualizar o  campo finalizado da viagem se a entrada for cadastrada com sucesso;
    const entrada = await this.viagemEntradaRepository.criar(viagemEntrada);
    if (entrada.id) {
      const imagens = viagemEntrada.imagens?.map((item) => item.caminho);
      await this.gerenciadorArquivoService.copiarArquivosParaDiretorio(imagens, DIARIO_VIAGEM_DIR_COMPLETO);
    }
    return entrada;
  }

  async obterTodas(id?: number) {
    return await this.viagemEntradaRepository.obterTodas(id);
  }

  async alterar(viagemEntradaAtualizada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel | undefined> {
    try {
      const alterou = await this.viagemEntradaRepository.alterar(viagemEntradaAtualizada);
      if (alterou) {
        const imagens = viagemEntradaAtualizada.imagens?.map((item) => item.caminho);
        await this.gerenciadorArquivoService.copiarArquivosParaDiretorio(imagens, DIARIO_VIAGEM_DIR_COMPLETO);
      }
      return alterou;
    } catch (error) {
      console.error('Erro durante a chamada do serviço:', error);
    }
  }

  async excluir(id: number): Promise<boolean> {
    // atualizar o  campo finalizado da viagem  para falso caso tenha apagado todas as entradas;
    return await this.viagemEntradaRepository.excluir(id);
  }
}

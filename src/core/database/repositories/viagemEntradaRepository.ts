import { DataSource, type Repository } from 'typeorm';
import { type IViagemEntradaRepository } from '../interfaces';
import { ViagemEntradaImagemModel, ViagemEntradaModel } from '../models';

export class ViagemEntradaRepository implements IViagemEntradaRepository {
  private readonly repository: Repository<ViagemEntradaModel>;

  constructor(database: DataSource) {
    this.repository = database.getRepository(ViagemEntradaModel);
  }

  async criar(viagemEntrada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel> {
    const imagensRepository = this.repository.manager.getRepository(ViagemEntradaImagemModel);

    // Certifique-se de que a propriedade imagens é um array para evitar problemas
    const novasImagens = viagemEntrada.imagens || [];
    viagemEntrada.imagens = [];

    // Salva as imagens antes de associá-las à viagemEntrada
    const imagensSalvas = await Promise.all(novasImagens.map(async (imagem) => await imagensRepository.save(imagem)));

    // Cria uma nova instância de ViagemEntradaModel
    const novaViagemEntrada = this.repository.create({
      data: viagemEntrada.data,
      local: viagemEntrada.local,
      descricao: viagemEntrada.descricao,
      viagem: viagemEntrada.viagem,
      imagens: imagensSalvas, // Associa as imagens salvas à viagemEntrada
    });

    // Salva a viagemEntrada
    return await this.repository.save(novaViagemEntrada);
  }

  async obterTodas(idViagem?: number): Promise<ViagemEntradaModel[]> {
    if (idViagem) {
      return await this.repository
        .createQueryBuilder('viagemEntrada')
        .innerJoinAndSelect('viagemEntrada.viagem', 'viagem')
        .leftJoinAndSelect('viagemEntrada.imagens', 'imagem')
        .where('viagemEntrada.viagemId = :id', { id: idViagem })
        .getMany();
    } else {
      return await this.repository
        .createQueryBuilder('viagemEntrada')
        .innerJoinAndSelect('viagemEntrada.viagem', 'viagem')
        .getMany();
    }
  }

  async alterar(viagemEntradaAtualizada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel | undefined> {
    try {
      const viagemEntradaOriginal = await this.repository.findOneOrFail({ where: { id: viagemEntradaAtualizada.id } });

      // Certifique-se de que a propriedade imagens é um array para evitar problemas
      const novasImagens = viagemEntradaAtualizada.imagens || [];
      viagemEntradaAtualizada.imagens = [];

      const imagensRepository = this.repository.manager.getRepository(ViagemEntradaImagemModel);

      // Salva as novas imagens antes de associá-las à viagemEntradaOriginal
      const imagensSalvas = await Promise.all(novasImagens.map(async (imagem) => await imagensRepository.save(imagem)));

      // Atualiza os dados da viagemEntradaOriginal
      viagemEntradaOriginal.data = viagemEntradaAtualizada.data;
      viagemEntradaOriginal.local = viagemEntradaAtualizada.local;
      viagemEntradaOriginal.descricao = viagemEntradaAtualizada.descricao;
      viagemEntradaOriginal.imagens = imagensSalvas; // Associa as imagens salvas à viagemEntradaOriginal

      // Salva a viagemEntradaOriginal
      return await this.repository.save(viagemEntradaOriginal);
    } catch (error) {
      // Lide com o erro ou registre conforme necessário
      console.error('Erro ao alterar viagemEntrada:', error);
      return undefined;
    }
  }

  async excluir(id: number): Promise<boolean> {
    const viagemEntradaExistente = await this.repository.findOneOrFail({ where: { id } });

    await this.repository.remove(viagemEntradaExistente);
    return true;
  }
}

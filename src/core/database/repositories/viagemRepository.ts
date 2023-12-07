import { DataSource, type Repository } from 'typeorm';
import { type IViagemRepository } from '../interfaces';
import { ViagemModel } from '../models';

export class ViagemRepository implements IViagemRepository {
  private readonly repository: Repository<ViagemModel>;

  constructor(database: DataSource) {
    this.repository = database.getRepository(ViagemModel);
  }

  async criar(viagem: Partial<ViagemModel>): Promise<ViagemModel> {
    const novaViagem = this.repository.create({
      data: viagem.data,
      local: viagem.local,
      finalizado: viagem.finalizado,
    });
    return await this.repository.save(novaViagem);
  }

  async obterTodas(): Promise<ViagemModel[]> {
    return await this.repository.find();
  }

  async alterar(viagemAtualizada: Partial<ViagemModel>): Promise<ViagemModel | undefined> {
    const viagemOriginal = await this.repository.findOneOrFail({ where: { id: viagemAtualizada.id } });

    viagemOriginal.data = viagemAtualizada.data;
    viagemOriginal.local = viagemAtualizada.local;

    return await this.repository.save(viagemOriginal);
  }

  async obterTodasComEntradasEImagens(id?: number, local?: string): Promise<ViagemModel[]> {
    let query = this.repository
      .createQueryBuilder('viagem')
      .addSelect('CAST(viagem.data AS DATE) as dataFormatada')
      .leftJoinAndSelect('viagem.entradas', 'entrada')
      .leftJoinAndSelect('entrada.imagens', 'imagem')
      .groupBy('viagem.id, entrada.id') // Agrupa por IDs para evitar duplicatas
      .addSelect(['imagem.id', 'imagem.caminho']) // Seleciona os campos desejados da imagem
      .addSelect('COUNT(imagem.id) as totalImagens') // Conta o total de imagens por entrada
      .orderBy('viagem.data', 'DESC');
    if (id) {
      query = query.where('viagem.id = :id', { id });
    }
    if (local) {
      query = query.where('viagem.local LIKE :local', { local: `%${local}%` });
    }

    return await query.getMany();
  }

  async excluirViagens(ids: number[]): Promise<boolean> {
    try {
      await this.repository.delete(ids);
      return true;
    } catch (error) {
      console.log('excluir', error);
      return false;
    }
  }
}

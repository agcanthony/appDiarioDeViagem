import { DataSource, type Repository } from 'typeorm';
import { type IViagemEntradaImagemRepository } from '../interfaces';
import { ViagemEntradaImagemModel } from '../models';

export class ViagemEntradaImagemRepository implements IViagemEntradaImagemRepository {
  private readonly repository: Repository<ViagemEntradaImagemModel>;

  constructor(database: DataSource) {
    this.repository = database.getRepository(ViagemEntradaImagemModel);
  }

  async criar(viagemEntradaImagem: Partial<ViagemEntradaImagemModel>): Promise<ViagemEntradaImagemModel> {
    const novaViagemEntradaImagem = this.repository.create({
      caminho: viagemEntradaImagem.caminho,
      viagemEntrada: viagemEntradaImagem.viagemEntrada,
    });
    return await this.repository.save(novaViagemEntradaImagem);
  }

  async obterTodas(id?: number, local?: string): Promise<ViagemEntradaImagemModel[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('imagem') // Usando 'imagem' que é o nome da propriedade na entidade
      .innerJoinAndSelect('imagem.viagemEntrada', 'viagemEntrada') // Usando 'viagemEntrada' que é o nome da propriedade na entidade
      .where('viagemEntrada.id = :id', { id: 1 });

    return await queryBuilder.getMany();
  }

  async excluir(id: number): Promise<boolean> {
    const imagemExistente = await this.repository.findOneOrFail({ where: { id } });

    await this.repository.remove(imagemExistente);
    return true;
  }
}

import { connection } from 'core/database/config';
import { ViagemEntradaRepository } from 'core/database/repositories';
import { GerenciadorArquivoService, ViagemEntradaService } from 'core/services';

export function makeViagemEntradaService() {
  const viagemEntradaRepository = new ViagemEntradaRepository(connection);
  const gerenciadorArquivoService = new GerenciadorArquivoService();
  const viagemEntradaService = new ViagemEntradaService(viagemEntradaRepository, gerenciadorArquivoService);

  return viagemEntradaService;
}

import { connection } from 'core/database/config';
import { ViagemEntradaImagemRepository } from 'core/database/repositories';
import { ViagemEntradaImagemService } from 'core/services';

export function makeViagemEntradaImagemService() {
  const viagemEntradaImagemRepository = new ViagemEntradaImagemRepository(connection);
  const viagemEntradaImagemService = new ViagemEntradaImagemService(viagemEntradaImagemRepository);

  return viagemEntradaImagemService;
}

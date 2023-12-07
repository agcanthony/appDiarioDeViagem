import { connection } from 'core/database/config';
import { ViagemRepository } from 'core/database/repositories';
import { ViagemService } from 'core/services';

export function makeViagemService() {
  const viagemRepository = new ViagemRepository(connection);
  const viagemService = new ViagemService(viagemRepository);

  return viagemService;
}

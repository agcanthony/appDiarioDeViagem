import { GerenciadorArquivoService } from 'core/services';

export function makeGerenciadorArquivoService() {
  const gerenciadorArquivoService = new GerenciadorArquivoService();

  return gerenciadorArquivoService;
}

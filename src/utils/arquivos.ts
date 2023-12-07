import { DIARIO_VIAGEM_DIR_COMPLETO } from './contants';

export const criarArquivoUrl = (nomeArquivo: string) => `${DIARIO_VIAGEM_DIR_COMPLETO}${nomeArquivo}`;

export const getNomeArquivo = (caminhoArquivo: string) => {
  if (!caminhoArquivo) {
    return;
  }

  return caminhoArquivo.split('/').pop();
};

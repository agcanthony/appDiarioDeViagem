import * as FileSystem from 'expo-file-system';
import { getNomeArquivo } from 'utils/arquivos';

export class GerenciadorArquivoService {
  async criarDiretorioSeNaoExiste(nomeDiretorio: string) {
    const informacaoDiretorio = await FileSystem.getInfoAsync(nomeDiretorio);
    if (!informacaoDiretorio.exists) {
      await FileSystem.makeDirectoryAsync(nomeDiretorio, { intermediates: true });
    }
  }

  async obterCaminhoTodosArquivosDiretorio(caminhoDiretorio: string) {
    const arquivosDiretorio = await FileSystem.readDirectoryAsync(caminhoDiretorio);
    const arquivos = await Promise.all(
      arquivosDiretorio.map(async (nomeArquivo) => await FileSystem.getContentUriAsync(caminhoDiretorio + nomeArquivo))
    );

    return arquivos;
  }

  async copiarArquivosParaDiretorio(caminhoArquivos: string[], nomeDiretorio: string) {
    try {
      await Promise.all(
        caminhoArquivos.map(
          async (uri) => await FileSystem.copyAsync({ from: uri, to: nomeDiretorio + getNomeArquivo(uri) })
        )
      );

      return true;
    } catch (error) {
      console.error(error);
    }

    return false;
  }
}

import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

/** Altura padrão do header */
export const HEADER_HEIGHT = 56;

/** Opacidade da imagem quando o header estiver expandido */
export const HEADER_IMAGE_OPACITY = 0.9;

/** Altura do cabeçalho quando estiver expadido */
export const EXPANDED_HEADER_HEIGHT = 160;

/** Valor da margem inferior quando o header estiver expandido */
export const BOTTOM_MARGIN_VALUE_WHEN_HEADER_IS_EXPANDED = 16;

/** A altura minima do header é composta pela altura padrão do header + altura da barra de status do dispositivo */
export const MIN_HEADER_HEIGHT = HEADER_HEIGHT + Constants.statusBarHeight;

/** A altura máxima do header é composta pela altura do header expandido + altura da barra de status do dispositivo */
export const MAX_HEADER_HEIGHT = EXPANDED_HEADER_HEIGHT + Constants.statusBarHeight;

/** Diretório do aplicativo para salvar as imagens */
export const DIARIO_VIAGEM_DIR = 'diarioviagem';

/** Diretorio no sistema que será armanezado as imagens, os arquivos salvos não serão visiveis na galeria, apenas o app terá acesso */
export const DIARIO_VIAGEM_DIR_COMPLETO = FileSystem.documentDirectory + DIARIO_VIAGEM_DIR + '/';

/** Extensões permitidas para o cadastro de imagens */
export const EXTENSOES_IMAGENS_PERMITIDAS = [
  'jpg',
  'jpeg',
  'tiff',
  'tif',
  'raw',
  'dng',
  'png',
  'gif',
  'bmp',
  'heic',
  'webp',
];

import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

/**
 * Verifica se o dispositivo permiti autentiação por biometria ou facial
 */
export async function verificarAutenticacao() {
  const compativel = await LocalAuthentication.hasHardwareAsync();

  const tiposAutenticacao = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const tiposAutenticacaoString = tiposAutenticacao.map((type) => LocalAuthentication.AuthenticationType[type]);

  return compativel && tiposAutenticacaoString.length > 0;
}

/**
 * Efetua a autenticação do usuário se disponivel
 */
export async function autenticar() {
  const existeBiometriaCadastrada = await LocalAuthentication.isEnrolledAsync();

  if (!existeBiometriaCadastrada) {
    return Alert.alert('Permissão', 'Nenhuma biometria encontrada! Por favor, Cadastre no dispositivo!');
  }

  const autenticacao = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Antes de prosseguir confirme sua autenticação',
    fallbackLabel: 'Biometria não reconhecida!',
  });

  return autenticacao.success;
}

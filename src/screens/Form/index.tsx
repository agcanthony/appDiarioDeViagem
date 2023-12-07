import { Card } from 'components';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { theme } from 'utils/theme';
import { DatePicker } from '../../components/DatePickerApp';
import { FormHeader } from '../../components/FormHeader';
import { Input } from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import { makeViagemEntradaService, makeViagemService } from 'core';
import { ViagemModel } from 'core/database/models';
import { parseISO } from 'date-fns';

const viagemService = makeViagemService();
const viagemEntradaService = makeViagemEntradaService();

export function Form({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  const { apenasConsulta, title } = params;
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [entradas, setEntradas] = useState([]);
  const [viagem, setViagem] = useState<ViagemModel>(params);
  const [local, setLocal] = useState('');

  const handleDateChange = (date: Date) => {
    setDateValue(new Date(date));
  };

  useEffect(() => {
    if (params.local) {
      setLocal(params.local);
    }
    if (params.data) {
      setDateValue(parseISO(params.data));
    }

    void obterEntradas();
  }, [apenasConsulta]);

  useEffect(() => {
    if (!viagem.id) return;
    async function consultarViagens() {
      try {
        const retorno = await viagemService.obterTodasComEntradasEImagens(viagem.id, null);
        const viagemAlterada = retorno[0];
        // setEntradas(viagemAlterada.entradas);
        setLocal(viagemAlterada.local);
        setDateValue(parseISO(viagemAlterada.data.toString()));
        // setViagem(viagemAlterada);
      } catch (error) {
        console.error('Erro ao obter viagens:', error);
      }
    }
    void consultarViagens();

    const unsubscribeFocus = navigation.addListener('focus', () => {
      void consultarViagens();
      void obterEntradas();
    });
    return () => {
      unsubscribeFocus();
    };
  }, [viagem]);

  async function obterEntradas() {
    // Chama o serviço para obter as entradas
    if (!viagem.id) return;
    const entradasViagem = await viagemEntradaService.obterTodas(viagem.id);
    setEntradas(entradasViagem);
  }
  async function handleSalvarViagem() {
    if (!local) {
      alert('Por favor, informe o local da viagem.');
      return;
    }

    if (!dateValue) {
      alert('Por favor, selecione a data da viagem.');
      return;
    }

    if (!viagem.id) {
      const item = await viagemService.criar({
        local: local.toString(),
        data: dateValue,
        finalizado: viagem?.entradas?.length > 0,
        entradas: null,
      });
      setViagem(item);
    } else {
      await viagemService.alterar({
        id: viagem.id,
        local: local.toString(),
        data: dateValue,
        finalizado: viagem?.entradas?.length > 0,
        entradas: null,
      });
      navigation.goBack();
    }
  }

  async function handleCadastrarEntradas() {
    if (!viagem.id) {
      Alert.alert('Antes de continuar salve as alterações.');
      return;
    }
    navigation.navigate('CadastrarEntrada', {
      data: new Date().toISOString(),
      viagemId: viagem.id,
      apenasConsulta: false,
    });
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="h-full bg-azul-900">
      <FormHeader title={title} onSalvar={handleSalvarViagem} ocultarBotaoSalvar={apenasConsulta} viagem={viagem} />
      <ScrollView className="mt-3 bg-azul-900 px-4">
        <DatePicker onChange={handleDateChange} habilitarAlteracao={!apenasConsulta} dataPadrao={dateValue} />
        <Input
          label="Local"
          onChangeText={setLocal}
          editable={!apenasConsulta}
          value={local}
          placeholder="Informe o local da viagem"
        />

        <GestureHandlerRootView className="mb-3 flex-row items-center justify-between">
          <Text className="mb-2 text-base text-azul-600">Lembranças</Text>
          {!apenasConsulta && (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], false)}
              onPress={handleCadastrarEntradas}
              className="rounded border border-azul-700">
              <Text className="rounded px-2 py-[3px] text-base text-azul-100">CADASTRAR</Text>
            </TouchableNativeFeedback>
          )}
        </GestureHandlerRootView>

        {entradas.map((item, index) => {
          return (
            <Card
              key={item.id}
              posicao={index}
              viagem={item}
              onClique={() =>
                navigation.navigate(apenasConsulta ? 'ConsultarEntrada' : 'CadastrarEntrada', {
                  ...item,
                  viagemId: item.viagem.id,
                  apenasConsulta: false,
                })
              }
              exibirAnoViagem={false}
              habilitarSelecao={false}
              initialMode={true}
              desabilitarAnimacaoEntrada
            />
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, SafeAreaView } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';
import { FloatingButton, HomeHeader, Card, useHomeHeaderStyles } from '@components';

import Toast from 'react-native-root-toast';
import { autenticar, verificarAutenticacao } from 'utils/autenticacaoLocal';
import { makeViagemService } from 'core';

const viagemService = makeViagemService();
export const TEMPO_MILISEGUNDOS_ESPERA_ANIMACAO_FLAT_LIST = 120;

export function Home() {
  const navigation = useNavigation();
  const [viagens, setViagens] = useState([]);
  const [viagensSelecionadas, setViagensSelecionadas] = useState<Map<number, boolean>>(new Map<number, boolean>());
  const [abrirInputPesquisa, setAbrirInputPesquisa] = useState(false);

  const { scrollY, headerImageStyles, headerStyles, iconStyle, scrollHandler, voltarIconStyle } = useHomeHeaderStyles();

  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
    async function fetchData() {
      await consultarViagens(null);
    }

    void fetchData();

    const unsubscribeFocus = navigation.addListener('focus', () => {
      void fetchData();
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const existeItensSelecionados = viagensSelecionadas.size > 0;

  async function consultarViagens(local: string) {
    try {
      const retorno = await viagemService.obterTodasComEntradasEImagens(null, local);
      setViagens(retorno);
    } catch (error) {
      console.error('Erro ao obter viagens:', error);
    }
  }

  function handleFecharInputPesquisa() {
    setAbrirInputPesquisa(false);
  }

  function handleAbrirInputPesquisa() {
    setAbrirInputPesquisa(true);
  }

  function handleSelecionarViagem(viagem) {
    const itens = new Map<number, boolean>(viagensSelecionadas);

    viagensSelecionadas.has(viagem.id) ? itens.delete(viagem.id) : itens.set(viagem.id, !itens.get(viagem.id));
    setViagensSelecionadas(itens);

    if (itens && abrirInputPesquisa) {
      handleFecharInputPesquisa();
    }
  }

  async function removerTodasViagens() {
    const permitiAutenticar = await verificarAutenticacao();
    const autenticou = await autenticar();

    if (permitiAutenticar && autenticou) {
      const itens = Array.from(viagensSelecionadas, ([id]) => id);

      await viagemService.excluirViagens(itens);
      const novaListaViagens = viagens.filter((item) => !itens.includes(item.id));

      setViagensSelecionadas(new Map());
      setViagens(novaListaViagens);

      return;
    }

    Toast.show('Desculpe, é necessário autenticar antes de prosseguir com a exclusão!', {
      duration: Toast.durations.LONG,
      position: -50,
    });
  }

  async function handleRemoverTodasViagensSelecionadas() {
    Alert.alert('Deseja realmente excluir as viagens?', '', [
      {
        text: 'Sim',
        onPress: async () => await removerTodasViagens(),
      },
      { text: 'Não', style: 'cancel' },
    ]);
  }

  async function handlePesquisarViagens(texto: string) {
    Keyboard.dismiss();

    await consultarViagens(texto);
  }

  const renderListItem = ({ item, index }) => {
    return (
      <Card
        key={item.id}
        posicao={index}
        initialMode={initialMode.current}
        exibirAnoViagem={item.exibirAno}
        viagem={{ ...item, isViagem: true, descricao: item?.entradas[0]?.descricao }}
        selecionado={!!viagensSelecionadas.get(item.id)}
        habilitarSelecao={existeItensSelecionados}
        onSelecionarViagem={handleSelecionarViagem}
        onClique={() => navigation.navigate('ConsultarViagemForm', item)}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-azul-900">
      <HomeHeader.Root headerStyles={headerStyles} imageStyles={headerImageStyles}>
        {existeItensSelecionados && (
          <HomeHeader.DeleteContent
            iconStyle={iconStyle}
            voltarIconStyle={voltarIconStyle}
            onRemover={handleRemoverTodasViagensSelecionadas}
            onVoltar={() => setViagensSelecionadas(new Map<number, boolean>())}
          />
        )}
        {!existeItensSelecionados && (
          <HomeHeader.SearchInput
            voltarIconStyle={voltarIconStyle}
            exibirPesquisa={abrirInputPesquisa}
            iconStyle={iconStyle}
            scrollY={scrollY}
            onFecharInput={handleFecharInputPesquisa}
            onAbrirInput={handleAbrirInputPesquisa}
            onPesquisar={handlePesquisarViagens}
          />
        )}
      </HomeHeader.Root>
      <Animated.FlatList
        className="w-full"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        removeClippedSubviews={false}
        itemLayoutAnimation={Layout.delay(TEMPO_MILISEGUNDOS_ESPERA_ANIMACAO_FLAT_LIST)}
        data={viagens}
        extraData={viagensSelecionadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderListItem}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
      />
      <FloatingButton onPress={() => navigation.navigate('CadastrarViagemForm', { apenasConsulta: false } as any)} />
    </SafeAreaView>
  );
}

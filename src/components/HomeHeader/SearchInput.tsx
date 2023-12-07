import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { TextInput, View, Dimensions } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { theme } from 'utils/theme';
import { MAX_HEADER_HEIGHT } from 'utils/contants';

const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export type SearchInputProps = {
  onFecharInput?: () => void;
  onAbrirInput?: () => void;
  onPesquisar?: (pesquisa: string) => void;
  exibirPesquisa: boolean;
  scrollY: SharedValue<number>;
  iconStyle: any;
  voltarIconStyle: any;
};

const HORIZONTAL_PADDING = 12;

/** Esse tamanho é calculado a partir do tamanho do botão voltar 32px + padding e margens utilizados */
const TAMANHO_A_SER_REMOVIDO_DO_INPUT = 64;
const TAMANHO_MAXIMO_INPUT_PESQUISA = Dimensions.get('window').width - TAMANHO_A_SER_REMOVIDO_DO_INPUT;

export function SearchInput({
  exibirPesquisa,
  scrollY,
  iconStyle,
  voltarIconStyle,
  onFecharInput,
  onAbrirInput,
  onPesquisar,
}: SearchInputProps) {
  const [inputText, setInputText] = useState('');
  const searchAnimation = useSharedValue(0);

  useEffect(() => {
    searchAnimation.value = exibirPesquisa ? TAMANHO_MAXIMO_INPUT_PESQUISA : 0;
  }, [exibirPesquisa]);

  const searchContainerInput = useAnimatedStyle(() => {
    return {
      width: withTiming(searchAnimation.value, { duration: 200, easing: Easing.ease }),
    };
  });

  const searchInput = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(scrollY.value, [0, MAX_HEADER_HEIGHT], ['#FFFFFFd0', '#49577745']),
      color: interpolateColor(scrollY.value, [0, MAX_HEADER_HEIGHT], [theme.colors.azul[900], theme.colors.azul[50]]),
      placeholderTextColor: interpolateColor(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [theme.colors.azul[900], theme.colors.azul[600]]
      ),
      paddingHorizontal: interpolate(
        searchAnimation.value,
        [TAMANHO_MAXIMO_INPUT_PESQUISA, 0],
        [HORIZONTAL_PADDING, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <GestureHandlerRootView className="w-full flex-row justify-between">
      {exibirPesquisa && (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], true)}
          onPress={onFecharInput}
          className="my-auto h-8 w-8 items-center justify-center rounded">
          <AnimatedMaterialIcon style={voltarIconStyle} name="arrow-back" size={24} />
        </TouchableNativeFeedback>
      )}

      <View className="relative ml-2 flex-1 flex-row justify-end">
        <Animated.View style={searchContainerInput}>
          <AnimatedTextInput
            onChangeText={setInputText}
            placeholder="Pesquisar viagens..."
            style={searchInput}
            value={inputText}
            className="h-10 w-full rounded-full text-base"
          />

          <View className="absolute right-1 top-1">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], true)}
              className="my-auto h-8 w-8 items-center justify-center rounded"
              onPress={() => (exibirPesquisa ? onPesquisar(inputText) : onAbrirInput())}>
              <AnimatedMaterialIcon name="search" style={iconStyle} size={28} />
            </TouchableNativeFeedback>
          </View>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}

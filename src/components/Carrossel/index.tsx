import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, { FadeOut } from 'react-native-reanimated';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { theme } from 'utils/theme';
const width = Dimensions.get('window').width;

const PAGE_WIDTH = width;
const UNICA_IMAGEM_OFFSET = 28;
const IMAGEM_PADDING = 0.86;
const DOIS = 2;

type CarrosselProps = {
  imagens: string[];
  ocultarBotaoRemover?: boolean;
  onRemoverImagem?: (imagem: string) => void;
  onImagemClique?: (imagem: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const activeOffsetX = [-10, 10];

export function Carrossel({ imagens, onRemoverImagem, onImagemClique, ocultarBotaoRemover = false }: CarrosselProps) {
  const ref = useRef<ICarouselInstance>(null);
  const quantidadeImagemRef = useRef(imagens.length);

  const baseOptions = {
    vertical: false,
    width: imagens.length === 1 ? PAGE_WIDTH - UNICA_IMAGEM_OFFSET : PAGE_WIDTH * IMAGEM_PADDING,
    height: PAGE_WIDTH / DOIS,
  } as const;

  useEffect(() => {
    if (ref.current && imagens.length > quantidadeImagemRef.current) {
      ref.current.scrollTo({ index: 0, animated: true });
    }

    quantidadeImagemRef.current = imagens.length;
  }, [imagens]);

  function handleRemoverImagem(imagemUrl: string) {
    onRemoverImagem && onRemoverImagem(imagemUrl);
    ref.current.prev();
  }

  return (
    <Carousel
      {...baseOptions}
      defaultIndex={0}
      loop={false}
      ref={ref}
      style={{
        width: PAGE_WIDTH,
      }}
      autoPlay={false}
      data={imagens}
      pagingEnabled={true}
      scrollAnimationDuration={1000}
      panGestureHandlerProps={{ activeOffsetX }}
      renderItem={({ item }) => (
        <Animated.View className="mb-3 h-full w-full" key={item} exiting={FadeOut}>
          <GestureHandlerRootView className="relative mr-1 flex-1 rounded-lg border-2 border-azul-900">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.azul[900], false)}
              onPress={() => onImagemClique(item)}
              className="h-full w-full">
              <Image source={{ uri: item }} resizeMode="cover" className="h-full w-full rounded-lg" />
            </TouchableNativeFeedback>
            {!ocultarBotaoRemover && (
              <View className="absolute right-1 top-1 shadow-md">
                <TouchableNativeFeedback
                  onPress={() => handleRemoverImagem(item)}
                  background={TouchableNativeFeedback.Ripple(theme.colors.azul[500], true)}
                  className="my-auto h-8 w-8 items-center justify-center rounded">
                  <MaterialIcon
                    name="delete"
                    size={28}
                    color={theme.colors.azul[100]}
                    style={{
                      textShadowColor: '#000000a4',
                      textShadowOffset: {
                        height: 0,
                        width: 0,
                      },
                      textShadowRadius: 3,
                    }}
                  />
                </TouchableNativeFeedback>
              </View>
            )}
          </GestureHandlerRootView>
        </Animated.View>
      )}
    />
  );
}

import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDatabaseInitialize } from 'hooks/useDatabaseInitialize';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomIn,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { theme } from 'utils/theme';

type SplashProps = {
  children: ReactNode;
};

const DURACAO_ANIMACAO_EM_MILISEGUNDOS = 1_000;
const TEMPO_ESPERA_EM_MILESEGUNDOS_CARREGAR_HOME = 2_300;

export function Splash({ children }: SplashProps) {
  const { ready: isDatabaseReady } = useDatabaseInitialize();
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(MaterialIcon.font);
        await new Promise((resolve) => setTimeout(resolve, TEMPO_ESPERA_EM_MILESEGUNDOS_CARREGAR_HOME));
      } catch (erro) {
        console.warn(erro);
      } finally {
        // Tell the application to render
        setAppReady(true);
      }
    }

    void prepare();
  }, []);

  const carregarApp = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  const animation = useSharedValue(0);
  const animation2 = useSharedValue(0);
  const textAnimation = useSharedValue(0);

  const estiloAnimacaoCirculoClaro = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            DURACAO_ANIMACAO_EM_MILISEGUNDOS,
            withTiming(
              animation.value,
              {
                duration: 200,
              },
              () => {
                textAnimation.value = 1;
                animation2.value = 500;
              }
            )
          ),
        },
      ],
    };
  });

  const estiloAnimacaoCirculoEscuro = useAnimatedStyle(() => {
    const delay = 800;
    return {
      transform: [
        {
          scale: withDelay(
            delay,
            withTiming(animation2.value, {
              duration: 200,
            })
          ),
        },
      ],
    };
  });

  const estiloTextoViagem = useAnimatedStyle(() => {
    return {
      color: interpolateColor(textAnimation.value, [0, 1], [theme.colors.azul[50], theme.colors.azul[600]]),
    };
  });

  useEffect(() => {
    if (isSplashAnimationComplete) {
      animation.value = 400;
    }
  }, [isSplashAnimationComplete]);

  if (isAppReady && isDatabaseReady) {
    return children;
  }

  return (
    <View className="flex-1 bg-azul-900" onLayout={carregarApp}>
      <Animated.Image
        source={require('../../assets/splash-background.png')}
        className="absolute h-full w-full flex-1"
      />
      <View className="bg-azul z-[10] w-full flex-1 justify-center">
        <View className="relative mt-8 items-center">
          <Animated.Image
            source={require('../../assets/adaptive-icon.png')}
            resizeMode="cover"
            className="mb-4 h-28 w-28"
            entering={ZoomIn.springify()
              .duration(DURACAO_ANIMACAO_EM_MILISEGUNDOS)
              .withCallback(() => {
                'worklet';
                runOnJS(setAnimationComplete)(true);
              })}
          />
          <View className="flex-row bg-transparent">
            <Animated.Text
              entering={SlideInLeft.duration(DURACAO_ANIMACAO_EM_MILISEGUNDOS)}
              className="mr-2 text-5xl font-semibold text-azul-900">
              Diario
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.duration(DURACAO_ANIMACAO_EM_MILISEGUNDOS)}
              style={estiloTextoViagem}
              className="text-5xl font-semibold text-azul-50">
              Viagem
            </Animated.Text>
          </View>
        </View>
        <Animated.View
          className="absolute top-1/2 z-[-1] h-1 w-1 self-center rounded-full bg-white"
          style={estiloAnimacaoCirculoClaro}
        />
        <Animated.View
          className="absolute bottom-0 right-0 z-10 h-1 w-1 self-center rounded-full bg-azul-900"
          style={estiloAnimacaoCirculoEscuro}
        />
      </View>
    </View>
  );
}

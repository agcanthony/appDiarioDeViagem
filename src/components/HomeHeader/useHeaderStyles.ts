import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {
  BOTTOM_MARGIN_VALUE_WHEN_HEADER_IS_EXPANDED,
  HEADER_IMAGE_OPACITY,
  MAX_HEADER_HEIGHT,
  MIN_HEADER_HEIGHT,
} from 'utils/contants';
import { theme } from 'utils/theme';

export function useHomeHeaderStyles() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const iconStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, MAX_HEADER_HEIGHT],
      [theme.colors.azul[500], theme.colors.azul[600]]
    );

    return {
      color,
    };
  });

  const voltarIconStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, MAX_HEADER_HEIGHT],
      [theme.colors.azul[50], theme.colors.azul[600]]
    );

    return {
      color,
    };
  });

  const headerStyles = useAnimatedStyle(() => {
    let boxShadowStyle = {};

    if (scrollY.value > MIN_HEADER_HEIGHT) {
      boxShadowStyle = {
        shadowColor: '#E3DDEE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 14,
      };
    } else {
      boxShadowStyle = {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      };
    }
    return {
      height: interpolate(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
        Extrapolation.CLAMP
      ),
      marginBottom: interpolate(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [BOTTOM_MARGIN_VALUE_WHEN_HEADER_IS_EXPANDED, 0],
        Extrapolation.CLAMP
      ),
      ...boxShadowStyle,
    };
  });

  const headerImageStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(scrollY.value, [0, MAX_HEADER_HEIGHT], [HEADER_IMAGE_OPACITY, 0], Extrapolation.CLAMP),
    };
  });

  return {
    scrollY,
    voltarIconStyle,
    iconStyle,
    headerStyles,
    headerImageStyles,
    scrollHandler,
  };
}

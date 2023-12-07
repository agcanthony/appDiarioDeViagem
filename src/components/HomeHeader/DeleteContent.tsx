import { TouchableNativeFeedback, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import { theme } from 'utils/theme';

const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);

type DeleteContentProps = {
  voltarIconStyle: any;
  iconStyle: any;
  onRemover: () => void;
  onVoltar: () => void;
};

export function DeleteContent({ voltarIconStyle, iconStyle, onRemover, onVoltar }: DeleteContentProps) {
  return (
    <View className="w-full flex-row justify-between">
      <GestureHandlerRootView>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], true)}
          className="h-8 w-8 items-center justify-center"
          onPress={onVoltar}>
          <AnimatedMaterialIcon name="arrow-back" style={voltarIconStyle} size={24} />
        </TouchableNativeFeedback>
      </GestureHandlerRootView>
      <GestureHandlerRootView>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], true)}
          onPress={onRemover}
          className="h-8 w-8 items-center justify-center">
          <AnimatedMaterialIcon name="delete" style={iconStyle} size={28} />
        </TouchableNativeFeedback>
      </GestureHandlerRootView>
    </View>
  );
}

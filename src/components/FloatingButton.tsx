import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styled } from 'nativewind';
import { GestureHandlerRootView, type BorderlessButtonProps, BorderlessButton } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { theme } from 'utils/theme';

function FloatingButtonComponent({ onPress }: BorderlessButtonProps) {
  return (
    <View className="absolute bottom-6 right-6 rounded-full border border-transparent bg-azul-600 shadow-md">
      <GestureHandlerRootView>
        <BorderlessButton onPress={onPress} rippleColor={theme.colors.azul[700]}>
          <View className="h-14 w-14 items-center justify-center">
            <MaterialIcons name="add" size={28} color={String(theme.colors.azul[50])} />
          </View>
        </BorderlessButton>
      </GestureHandlerRootView>
    </View>
  );
}

export const FloatingButton = styled(FloatingButtonComponent);

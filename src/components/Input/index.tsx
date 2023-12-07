import { Text, TextInput, type TextInputProps, View } from 'react-native';
import { theme } from 'utils/theme';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, className, ...rest }: Props) {
  return (
    <View className="mb-5 w-full">
      <Text className="mb-2 text-base text-azul-600">{label}</Text>
      <TextInput
        placeholderTextColor={theme.colors.azul[700]}
        className={`w-full rounded border border-azul-700 bg-azul-900 p-3 text-lg text-azul-100 focus:border-azul-600 ${className}`}
        {...rest}
      />
    </View>
  );
}

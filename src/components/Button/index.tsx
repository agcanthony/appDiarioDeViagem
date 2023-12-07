import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity className="h-14 w-full items-center justify-center rounded bg-verde" {...rest}>
      <Text className="text-base font-bold text-zinc-100">{title}</Text>
    </TouchableOpacity>
  );
}

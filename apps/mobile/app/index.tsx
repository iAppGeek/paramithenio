import { Text, View } from 'react-native';

export default function HomeScreen(): React.ReactElement {
  return (
    <View className="flex-1 items-center justify-center bg-parchment-100">
      <Text className="text-4xl font-bold text-stone-900">Paramithenio</Text>
      <Text className="mt-2 text-stone-600">Greek fables for children</Text>
    </View>
  );
}

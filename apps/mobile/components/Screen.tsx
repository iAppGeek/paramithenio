import { View } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

export function Screen({ children, className }: ScreenProps): React.ReactElement {
  return (
    <View className={['flex-1 bg-parchment-50', className].filter(Boolean).join(' ')}>
      {children}
    </View>
  );
}

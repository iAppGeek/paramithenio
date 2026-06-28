import { Pressable, Text } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const CONTAINER_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-amber-500 rounded-lg px-4 py-2',
  secondary: 'bg-clay-100 rounded-lg px-4 py-2',
  ghost: 'rounded-lg px-4 py-2',
};

const TEXT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'font-sans-semibold text-sm text-stone-900 text-center',
  secondary: 'font-sans-semibold text-sm text-clay-800 text-center',
  ghost: 'font-sans-semibold text-sm text-stone-700 text-center',
};

type ButtonProps = {
  variant?: ButtonVariant;
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export function Button({
  variant = 'primary',
  onPress,
  children,
  disabled = false,
}: ButtonProps): React.ReactElement {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className={[CONTAINER_CLASSES[variant], disabled ? 'opacity-50' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <Text className={TEXT_CLASSES[variant]}>{children}</Text>
    </Pressable>
  );
}

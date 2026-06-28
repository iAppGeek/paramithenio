import { Text as RNText } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

const VARIANT_CLASSES: Record<TextVariant, string> = {
  h1: 'font-sans-bold text-4xl text-stone-900',
  h2: 'font-sans-semibold text-2xl text-stone-900',
  h3: 'font-sans-semibold text-xl text-stone-800',
  body: 'font-sans text-base text-stone-700',
  caption: 'font-sans text-sm text-stone-500',
};

type TextProps = {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
};

export function Text({ variant = 'body', children, className }: TextProps): React.ReactElement {
  return (
    <RNText className={[VARIANT_CLASSES[variant], className].filter(Boolean).join(' ')}>
      {children}
    </RNText>
  );
}

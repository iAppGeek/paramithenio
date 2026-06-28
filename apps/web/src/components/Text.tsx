export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

const TAG_MAP: Record<TextVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  caption: 'span',
};

const VARIANT_CLASSES: Record<TextVariant, string> = {
  h1: 'font-sans text-4xl font-bold text-stone-900',
  h2: 'font-sans text-2xl font-semibold text-stone-900',
  h3: 'font-sans text-xl font-semibold text-stone-800',
  body: 'font-sans text-base text-stone-700',
  caption: 'font-sans text-sm text-stone-500',
};

type TextProps = {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
};

export function Text({ variant = 'body', children, className }: TextProps): React.ReactElement {
  const Tag = TAG_MAP[variant];
  return (
    <Tag className={[VARIANT_CLASSES[variant], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}

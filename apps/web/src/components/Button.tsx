export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-amber-500 text-stone-900 hover:bg-amber-600 active:bg-amber-700',
  secondary: 'bg-clay-100 text-clay-800 hover:bg-clay-200 active:bg-clay-300',
  ghost: 'bg-transparent text-stone-700 hover:bg-stone-100 active:bg-stone-200',
};

type ButtonProps = {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function Button({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  className,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-lg px-4 py-2 font-sans text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}

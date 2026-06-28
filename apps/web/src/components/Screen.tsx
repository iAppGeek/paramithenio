type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

export function Screen({ children, className }: ScreenProps): React.ReactElement {
  return (
    <div className={['min-h-screen bg-parchment-50', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

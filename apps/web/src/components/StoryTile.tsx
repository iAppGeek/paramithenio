type StoryTileProps = {
  titleEn: string;
  titleEl: string;
  artworkUrl: string | null;
  locale?: 'en' | 'el';
  onPress?: () => void;
};

export function StoryTile({
  titleEn,
  titleEl,
  artworkUrl,
  locale = 'en',
  onPress,
}: StoryTileProps): React.ReactElement {
  const title = locale === 'el' ? titleEl : titleEn;
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex w-full items-center gap-4 rounded-2xl bg-parchment-100 p-4 text-left transition-colors hover:bg-parchment-200 active:bg-parchment-300"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-amber-100">
        {artworkUrl !== null ? (
          <img src={artworkUrl} alt={title} className="h-full w-full rounded-xl object-cover" />
        ) : (
          <span aria-hidden="true" className="text-2xl">
            📖
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-base font-semibold text-stone-900">{title}</p>
      </div>
    </button>
  );
}

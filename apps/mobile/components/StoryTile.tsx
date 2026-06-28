import { Pressable, Text, View } from 'react-native';

type StoryTileProps = {
  titleEn: string;
  titleEl: string;
  durationSeconds: number | null;
  artworkUrl: string | null;
  locale?: 'en' | 'el';
  onPress?: () => void;
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString()}:${s.toString().padStart(2, '0')}`;
}

export function StoryTile({
  titleEn,
  titleEl,
  durationSeconds,
  artworkUrl: _artworkUrl,
  locale = 'en',
  onPress,
}: StoryTileProps): React.ReactElement {
  const title = locale === 'el' ? titleEl : titleEn;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-4 rounded-2xl bg-parchment-100 p-4"
    >
      <View className="h-16 w-16 items-center justify-center rounded-xl bg-amber-100">
        <Text className="text-2xl" aria-hidden>
          📖
        </Text>
      </View>
      <View className="flex-1">
        <Text numberOfLines={1} className="font-sans-semibold text-base text-stone-900">
          {title}
        </Text>
        {durationSeconds !== null && (
          <Text className="font-sans mt-0.5 text-sm text-stone-500">
            {formatDuration(durationSeconds)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

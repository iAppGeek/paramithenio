import { Pressable, Text, View } from 'react-native';

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
      </View>
    </Pressable>
  );
}

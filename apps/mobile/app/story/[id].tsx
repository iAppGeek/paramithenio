import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { SAMPLE_STORIES } from '../../data/stories';

export default function StoryScreen(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const locale = i18n.language === 'el' ? 'el' : 'en';

  const story = SAMPLE_STORIES.find((s) => s.id === id);

  return (
    <Screen>
      <View className="flex-1 px-4 py-10">
        <Pressable
          onPress={() => {
            router.back();
          }}
          accessibilityRole="button"
          className="self-start"
        >
          <Text variant="body" className="text-amber-600">
            {t('story.back')}
          </Text>
        </Pressable>
        {story !== undefined ? (
          <View className="mt-6">
            <Text variant="h1">{locale === 'el' ? story.titleEl : story.titleEn}</Text>
            <Text variant="caption" className="mt-4">
              {t('story.content_placeholder')}
            </Text>
          </View>
        ) : (
          <Text variant="body" className="mt-6">
            {t('story.not_found')}
          </Text>
        )}
      </View>
    </Screen>
  );
}

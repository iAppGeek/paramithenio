import { useStory } from '@acme/core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';

export default function StoryScreen(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const { id = '' } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: story, isLoading, isError } = useStory(id);
  const locale = i18n.language === 'el' ? 'el' : 'en';

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
        {isLoading && (
          <Text variant="body" className="mt-6">
            {t('library.loading')}
          </Text>
        )}
        {isError && (
          <Text variant="body" className="mt-6">
            {t('library.error')}
          </Text>
        )}
        {!isLoading && !isError && story === null && (
          <Text variant="body" className="mt-6">
            {t('story.not_found')}
          </Text>
        )}
        {story !== undefined && story !== null && (
          <View className="mt-6">
            <Text variant="h1">{locale === 'el' ? story.titleEl : story.titleEn}</Text>
            {(locale === 'el' ? story.descriptionEl : story.descriptionEn) !== null && (
              <Text variant="body" className="mt-3">
                {locale === 'el' ? story.descriptionEl : story.descriptionEn}
              </Text>
            )}
            <Text variant="caption" className="mt-4">
              {t('story.content_placeholder')}
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
}

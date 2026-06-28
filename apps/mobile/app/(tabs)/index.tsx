import { useStories } from '@acme/core';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { StoryTile } from '../../components/StoryTile';
import { Text } from '../../components/Text';

export default function HomeScreen(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { data: stories, isLoading, isError } = useStories();
  const locale = i18n.language === 'el' ? 'el' : 'en';

  return (
    <Screen>
      <ScrollView className="flex-1 px-4 py-10">
        <Text variant="h1">{t('home.title')}</Text>
        <Text variant="caption" className="mt-1">
          {t('home.subtitle')}
        </Text>
        <View className="mt-8 gap-3">
          {isLoading && <Text variant="body">{t('library.loading')}</Text>}
          {isError && <Text variant="body">{t('library.error')}</Text>}
          {!isLoading && !isError && stories !== undefined && stories.length === 0 && (
            <Text variant="body">{t('library.empty')}</Text>
          )}
          {stories?.map((story) => (
            <StoryTile
              key={story.id}
              titleEn={story.titleEn}
              titleEl={story.titleEl}
              artworkUrl={story.artworkUrl}
              locale={locale}
              onPress={() => {
                router.push(`/story/${story.id}`);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { StoryTile } from '../../components/StoryTile';
import { Text } from '../../components/Text';
import { SAMPLE_STORIES } from '../../data/stories';

export default function HomeScreen(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const locale = i18n.language === 'el' ? 'el' : 'en';

  return (
    <Screen>
      <ScrollView className="flex-1 px-4 py-10">
        <Text variant="h1">{t('home.title')}</Text>
        <Text variant="caption" className="mt-1">
          {t('home.subtitle')}
        </Text>
        <View className="mt-8 gap-3">
          {SAMPLE_STORIES.map((story) => (
            <StoryTile
              key={story.id}
              {...story}
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

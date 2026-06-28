import { useStories } from '@acme/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { StoryTile } from '../components/StoryTile';
import { Text } from '../components/Text';

export function HomePage(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: stories, isLoading, isError } = useStories();
  const locale = i18n.language === 'el' ? 'el' : 'en';

  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-8">
        <Text variant="h1">{t('home.title')}</Text>
        <Text variant="caption" className="mt-1">
          {t('home.subtitle')}
        </Text>
        <div className="mt-8 flex flex-col gap-3">
          {isLoading && (
            <Text variant="body" className="text-stone-500">
              {t('library.loading')}
            </Text>
          )}
          {isError && (
            <Text variant="body" className="text-clay-600">
              {t('library.error')}
            </Text>
          )}
          {!isLoading && !isError && stories !== undefined && stories.length === 0 && (
            <Text variant="body" className="text-stone-500">
              {t('library.empty')}
            </Text>
          )}
          {stories?.map((story) => (
            <StoryTile
              key={story.id}
              titleEn={story.titleEn}
              titleEl={story.titleEl}
              artworkUrl={story.artworkUrl}
              locale={locale}
              onPress={() => {
                void navigate(`/story/${story.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}

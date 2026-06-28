import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { StoryTile } from '../components/StoryTile';
import { Text } from '../components/Text';
import { SAMPLE_STORIES } from '../data/stories';

export function HomePage(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const locale = i18n.language === 'el' ? 'el' : 'en';

  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-8">
        <Text variant="h1">{t('home.title')}</Text>
        <Text variant="caption" className="mt-1">
          {t('home.subtitle')}
        </Text>
        <div className="mt-8 flex flex-col gap-3">
          {SAMPLE_STORIES.map((story) => (
            <StoryTile
              key={story.id}
              {...story}
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

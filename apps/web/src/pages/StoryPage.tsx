import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';
import { SAMPLE_STORIES } from '../data/stories';

export function StoryPage(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const locale = i18n.language === 'el' ? 'el' : 'en';

  const story = SAMPLE_STORIES.find((s) => s.id === id);

  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-8">
        <Link to="/" className="font-sans text-sm font-medium text-amber-600 hover:text-amber-700">
          {t('story.back')}
        </Link>
        {story !== undefined ? (
          <div className="mt-6">
            <Text variant="h1">{locale === 'el' ? story.titleEl : story.titleEn}</Text>
            <Text variant="caption" className="mt-4">
              {t('story.content_placeholder')}
            </Text>
          </div>
        ) : (
          <Text variant="body" className="mt-6">
            {t('story.not_found')}
          </Text>
        )}
      </div>
    </Screen>
  );
}

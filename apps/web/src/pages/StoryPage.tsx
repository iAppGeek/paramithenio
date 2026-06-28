import { useStory } from '@acme/core';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';

export function StoryPage(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const { data: story, isLoading, isError } = useStory(id);
  const locale = i18n.language === 'el' ? 'el' : 'en';

  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-8">
        <Link to="/" className="font-sans text-sm font-medium text-amber-600 hover:text-amber-700">
          {t('story.back')}
        </Link>
        {isLoading && (
          <Text variant="body" className="mt-6 text-stone-500">
            {t('library.loading')}
          </Text>
        )}
        {isError && (
          <Text variant="body" className="mt-6 text-clay-600">
            {t('library.error')}
          </Text>
        )}
        {!isLoading && !isError && story === null && (
          <Text variant="body" className="mt-6">
            {t('story.not_found')}
          </Text>
        )}
        {story !== undefined && story !== null && (
          <div className="mt-6">
            <Text variant="h1">{locale === 'el' ? story.titleEl : story.titleEn}</Text>
            {(locale === 'el' ? story.descriptionEl : story.descriptionEn) !== null && (
              <Text variant="body" className="mt-3">
                {locale === 'el' ? story.descriptionEl : story.descriptionEn}
              </Text>
            )}
            <Text variant="caption" className="mt-4">
              {t('story.content_placeholder')}
            </Text>
          </div>
        )}
      </div>
    </Screen>
  );
}

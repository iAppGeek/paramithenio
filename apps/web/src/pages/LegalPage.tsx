import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';

function LegalIndex(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Link
        to="privacy"
        className="font-sans text-base font-medium text-amber-600 hover:text-amber-700"
      >
        {t('legal.privacy_title')}
      </Link>
      <Link
        to="terms"
        className="font-sans text-base font-medium text-amber-600 hover:text-amber-700"
      >
        {t('legal.terms_title')}
      </Link>
    </div>
  );
}

function LegalPrivacy(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <Text variant="h2">{t('legal.privacy_title')}</Text>
      <Text variant="body" className="mt-4">
        {t('legal.placeholder')}
      </Text>
    </div>
  );
}

function LegalTerms(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <Text variant="h2">{t('legal.terms_title')}</Text>
      <Text variant="body" className="mt-4">
        {t('legal.placeholder')}
      </Text>
    </div>
  );
}

export function LegalPage(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-8">
        <Text variant="h1">{t('legal.title')}</Text>
        <Routes>
          <Route index element={<LegalIndex />} />
          <Route path="privacy" element={<LegalPrivacy />} />
          <Route path="terms" element={<LegalTerms />} />
        </Routes>
      </div>
    </Screen>
  );
}

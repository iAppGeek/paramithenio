import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';

export function SettingsPage(): React.ReactElement {
  const { t, i18n } = useTranslation();

  function handleChangeLanguage(lang: 'en' | 'el'): void {
    void i18n.changeLanguage(lang);
  }

  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-8">
        <Text variant="h1">{t('settings.title')}</Text>
        <div className="mt-8">
          <Text variant="h3" className="mb-3">
            {t('settings.language_label')}
          </Text>
          <div className="flex gap-3">
            <Button
              variant={i18n.language === 'en' ? 'primary' : 'ghost'}
              onClick={() => {
                handleChangeLanguage('en');
              }}
            >
              {t('settings.language_en')}
            </Button>
            <Button
              variant={i18n.language === 'el' ? 'primary' : 'ghost'}
              onClick={() => {
                handleChangeLanguage('el');
              }}
            >
              {t('settings.language_el')}
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  );
}

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';

export default function SettingsScreen(): React.ReactElement {
  const { t, i18n } = useTranslation();

  function handleChangeLanguage(lang: 'en' | 'el'): void {
    void i18n.changeLanguage(lang);
  }

  return (
    <Screen>
      <View className="flex-1 px-4 py-10">
        <Text variant="h1">{t('settings.title')}</Text>
        <View className="mt-8">
          <Text variant="h3" className="mb-4">
            {t('settings.language_label')}
          </Text>
          <View className="flex-row gap-3">
            <Button
              variant={i18n.language === 'en' ? 'primary' : 'ghost'}
              onPress={() => {
                handleChangeLanguage('en');
              }}
            >
              {t('settings.language_en')}
            </Button>
            <Button
              variant={i18n.language === 'el' ? 'primary' : 'ghost'}
              onPress={() => {
                handleChangeLanguage('el');
              }}
            >
              {t('settings.language_el')}
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
}

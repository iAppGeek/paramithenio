import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function TabsLayout(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f59e0b',
        tabBarInactiveTintColor: '#78716c',
        tabBarStyle: { backgroundColor: '#fefdf7' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('nav.home') }} />
      <Tabs.Screen name="settings" options={{ title: t('nav.settings') }} />
    </Tabs>
  );
}

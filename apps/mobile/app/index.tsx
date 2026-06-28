import { ScrollView, View } from 'react-native';
import { Screen } from '../components/Screen';
import { StoryTile } from '../components/StoryTile';
import { Text } from '../components/Text';

const SAMPLE_STORIES = [
  {
    id: '1',
    titleEn: 'The Tortoise and the Hare',
    titleEl: 'Ο Λαγός και η Χελώνα',
    durationSeconds: 420,
    artworkUrl: null,
  },
  {
    id: '2',
    titleEn: 'The Fox and the Grapes',
    titleEl: 'Η Αλεπού και τα Σταφύλια',
    durationSeconds: 310,
    artworkUrl: null,
  },
  {
    id: '3',
    titleEn: 'The Ant and the Grasshopper',
    titleEl: 'Το Μυρμήγκι και ο Τζίτζικας',
    durationSeconds: 380,
    artworkUrl: null,
  },
] as const;

export default function HomeScreen(): React.ReactElement {
  return (
    <Screen>
      <ScrollView className="flex-1 px-4 py-10">
        <Text variant="h1">Παραμυθένιο</Text>
        <Text variant="caption" className="mt-1">
          Greek fables for children
        </Text>
        <View className="mt-8 gap-3">
          {SAMPLE_STORIES.map((story) => (
            <StoryTile key={story.id} {...story} />
          ))}
        </View>
        <View className="mt-8 gap-3">
          <Text variant="h3">Ελληνικά</Text>
          {SAMPLE_STORIES.map((story) => (
            <StoryTile key={story.id} {...story} locale="el" />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

import { Route, Routes } from 'react-router-dom';
import { Screen } from './components/Screen';
import { StoryTile } from './components/StoryTile';
import { Text } from './components/Text';

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

function HomePage(): React.ReactElement {
  return (
    <Screen>
      <div className="mx-auto max-w-lg px-4 py-12">
        <Text variant="h1">Παραμυθένιο</Text>
        <Text variant="caption" className="mt-1">
          Greek fables for children
        </Text>
        <div className="mt-8 flex flex-col gap-3">
          {SAMPLE_STORIES.map((story) => (
            <StoryTile key={story.id} {...story} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Text variant="h3">Ελληνικά</Text>
          {SAMPLE_STORIES.map((story) => (
            <StoryTile key={story.id} {...story} locale="el" />
          ))}
        </div>
      </div>
    </Screen>
  );
}

export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

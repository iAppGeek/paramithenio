export type Story = {
  id: string;
  titleEn: string;
  titleEl: string;
  durationSeconds: number | null;
  artworkUrl: string | null;
};

export const SAMPLE_STORIES: readonly Story[] = [
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
];

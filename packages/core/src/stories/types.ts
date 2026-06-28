export type StorySummary = {
  id: string;
  slug: string;
  titleEn: string;
  titleEl: string;
  durationSeconds: number | null;
  artworkUrl: string | null;
  category: string | null;
  tags: string[];
};

export type StoryDetail = StorySummary & {
  descriptionEn: string | null;
  descriptionEl: string | null;
  audioPath: string;
};

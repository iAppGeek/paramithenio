/**
 * Hand-written mirror of supabase/migrations/0002_stories.sql + 0003_narrations.sql.
 * Regenerate with: supabase gen types typescript --local > packages/core/src/db/types.ts
 */
export type NarratorVoice = 'male_adult' | 'female_adult' | 'male_child' | 'female_child';

export type Database = {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_el: string;
          description_en: string | null;
          description_el: string | null;
          artwork_path: string | null;
          tags: string[];
          category: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_el: string;
          description_en?: string | null;
          description_el?: string | null;
          artwork_path?: string | null;
          tags?: string[];
          category?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['stories']['Insert']>;
      };
      narrations: {
        Row: {
          id: string;
          story_id: string;
          narrator_voice: NarratorVoice;
          audio_path: string;
          duration_seconds: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          story_id: string;
          narrator_voice: NarratorVoice;
          audio_path: string;
          duration_seconds?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['narrations']['Insert']>;
      };
      _ping: {
        Row: { id: number; ts: string };
        Insert: { id?: number; ts?: string };
        Update: { id?: number; ts?: string };
      };
    };
  };
};

/**
 * Hand-written mirror of supabase/migrations/0002_stories.sql.
 * Regenerate with: supabase gen types typescript --local > packages/core/src/db/types.ts
 */
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
          duration_seconds: number | null;
          audio_path: string;
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
          duration_seconds?: number | null;
          audio_path: string;
          artwork_path?: string | null;
          tags?: string[];
          category?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['stories']['Insert']>;
      };
      _ping: {
        Row: { id: number; ts: string };
        Insert: { id?: number; ts?: string };
        Update: { id?: number; ts?: string };
      };
    };
  };
};

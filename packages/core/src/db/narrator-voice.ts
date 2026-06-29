// narrator_voice is a text column with a CHECK constraint in the DB, not a PG enum.
// This TypeScript union narrows it to the four allowed values for type safety in application code.
export type NarratorVoice = 'male_adult' | 'female_adult' | 'male_child' | 'female_child';

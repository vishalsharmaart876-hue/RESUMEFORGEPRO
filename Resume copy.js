// Supabase Resume table helper
// Table structure in Supabase:
// - id (UUID, primary key)
// - user_id (UUID, foreign key)
// - resume_data (JSONB)
// - updated_at (timestamp)

module.exports = {
  TABLE_NAME: 'resumes',
  TABLE_SCHEMA: `
    CREATE TABLE IF NOT EXISTS resumes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      resume_data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `
};

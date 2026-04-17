// Supabase User table helper
// Table structure in Supabase:
// - id (UUID, primary key)
// - email (text, unique)
// - password (text)
// - created_at (timestamp)

module.exports = {
  TABLE_NAME: 'users',
  TABLE_SCHEMA: `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
};

/*
  # Add city column to users table

  1. Changes
    - Add `city` column to `users` table
      - Type: text
      - Nullable: true
      - No default value

  2. Security
    - No changes to RLS policies needed
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'city'
  ) THEN
    ALTER TABLE users ADD COLUMN city text;
  END IF;
END $$;
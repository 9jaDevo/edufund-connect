-- Add ratings and badges tables
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_rating UNIQUE (rater_id, rated_id)
);

CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  type TEXT NOT NULL, -- 'donor', 'ma', 'ngo'
  level TEXT NOT NULL, -- 'bronze', 'silver', 'gold'
  criteria JSONB NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Add reputation score and language preference to users
ALTER TABLE users
ADD COLUMN reputation_score INTEGER DEFAULT 0,
ADD COLUMN preferred_language TEXT DEFAULT 'en',
ADD COLUMN country TEXT;

-- Add geo coordinates to projects for map view
ALTER TABLE projects
ADD COLUMN location_lat DECIMAL,
ADD COLUMN location_long DECIMAL;

-- Create triggers for updated_at
CREATE TRIGGER update_ratings_updated_at
  BEFORE UPDATE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_ratings_rater_id ON ratings(rater_id);
CREATE INDEX idx_ratings_rated_id ON ratings(rated_id);
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_projects_location ON projects(location_lat, location_long);

-- Insert default badges
INSERT INTO badges (name, description, type, level, criteria, icon) VALUES
-- Monitoring Agent Badges
('Vigilant Observer', 'Complete 10 monitoring reports', 'ma', 'bronze', 
  '{"reports_count": 10}', 'shield'),
('Trusted Monitor', 'Complete 50 monitoring reports with 4.5+ rating', 'ma', 'silver',
  '{"reports_count": 50, "min_rating": 4.5}', 'shield-check'),
('Master Guardian', 'Complete 100 monitoring reports with 4.8+ rating', 'ma', 'gold',
  '{"reports_count": 100, "min_rating": 4.8}', 'shield-plus'),

-- Donor Badges
('Hope Giver', 'Support first student', 'donor', 'bronze',
  '{"students_supported": 1}', 'heart'),
('Dream Builder', 'Support 5 students to completion', 'donor', 'silver',
  '{"completed_sponsorships": 5}', 'heart-handshake'),
('Change Maker', 'Support 10 students to completion with perfect monitoring', 'donor', 'gold',
  '{"completed_sponsorships": 10, "perfect_monitoring": true}', 'heart-plus'),

-- NGO Badges
('Community Partner', 'Complete first project', 'ngo', 'bronze',
  '{"projects_completed": 1}', 'users'),
('Impact Creator', 'Complete 5 projects with 4.5+ rating', 'ngo', 'silver',
  '{"projects_completed": 5, "min_rating": 4.5}', 'users-plus'),
('Transformation Leader', 'Complete 10 projects with 4.8+ rating', 'ngo', 'gold',
  '{"projects_completed": 10, "min_rating": 4.8}', 'users-check');

-- Create function to update user reputation
CREATE OR REPLACE FUNCTION update_user_reputation()
RETURNS TRIGGER AS $$
BEGIN
  -- Update rated user's reputation score
  UPDATE users
  SET reputation_score = (
    SELECT ROUND(AVG(score) * 20) -- Convert 1-5 scale to 0-100
    FROM ratings
    WHERE rated_id = NEW.rated_id
  )
  WHERE id = NEW.rated_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reputation updates
CREATE TRIGGER update_reputation_on_rating
  AFTER INSERT OR UPDATE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_user_reputation();

-- Create function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
BEGIN
  -- This is a placeholder for the badge awarding logic
  -- In a real implementation, this would check various criteria
  -- and award badges accordingly
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for badge checks
CREATE TRIGGER check_badges_on_report
  AFTER INSERT ON project_reports
  FOR EACH ROW
  EXECUTE FUNCTION check_and_award_badges();

CREATE TRIGGER check_badges_on_donation
  AFTER INSERT ON project_donations
  FOR EACH ROW
  EXECUTE FUNCTION check_and_award_badges();

CREATE TRIGGER check_badges_on_project_completion
  AFTER UPDATE OF status ON projects
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION check_and_award_badges();
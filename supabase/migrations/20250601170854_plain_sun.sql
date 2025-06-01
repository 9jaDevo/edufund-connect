-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ngo_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  budget DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  beneficiaries_count INTEGER NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project categories for filtering
CREATE TABLE project_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project-category relationship
CREATE TABLE project_categories_map (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category_id UUID REFERENCES project_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

-- Project donations
CREATE TABLE project_donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  donor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  escrow_status TEXT DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project reports for monitoring agents
CREATE TABLE project_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  monitoring_agent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  photos TEXT[],
  location_lat DECIMAL,
  location_long DECIMAL,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NGO-Student relationship
CREATE TABLE ngo_students (
  ngo_id UUID REFERENCES users(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (ngo_id, student_id)
);

-- Audit log for tracking all important actions
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_donations_updated_at
  BEFORE UPDATE ON project_donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_reports_updated_at
  BEFORE UPDATE ON project_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_projects_ngo_id ON projects(ngo_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_donations_project_id ON project_donations(project_id);
CREATE INDEX idx_project_donations_donor_id ON project_donations(donor_id);
CREATE INDEX idx_project_reports_project_id ON project_reports(project_id);
CREATE INDEX idx_project_reports_monitoring_agent_id ON project_reports(monitoring_agent_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type_id ON audit_logs(entity_type, entity_id);

-- Insert default project categories
INSERT INTO project_categories (name, description) VALUES
  ('Education Infrastructure', 'School buildings, classrooms, and facilities'),
  ('Water & Sanitation', 'Clean water access and sanitation facilities'),
  ('Technology', 'Computer labs and digital learning resources'),
  ('Sports & Recreation', 'Playgrounds and sports facilities'),
  ('Special Education', 'Facilities and resources for special needs students'),
  ('Library & Resources', 'Books, learning materials, and library facilities'),
  ('Transportation', 'School buses and transportation infrastructure'),
  ('Health & Nutrition', 'Health facilities and meal programs');

-- Add monitoring_area to users table for geolocation-based assignment
ALTER TABLE users
ADD COLUMN monitoring_area JSONB;

-- Add project_type to projects table
ALTER TABLE projects
ADD COLUMN project_type TEXT NOT NULL;
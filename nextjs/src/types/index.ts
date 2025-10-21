export enum UserRole {
  DONOR = 'donor',
  STUDENT = 'student',
  NGO = 'ngo',
  SCHOOL = 'school',
  MONITORING_AGENT = 'monitoring_agent',
  ADMIN = 'admin',
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  profile_picture?: string
  is_verified: boolean
  created_at: string
  updated_at: string
  reputation_score?: number
  preferred_language?: string
  country?: string
  city?: string
  phone?: string
  bio?: string
}

export interface Project {
  id: string
  ngo_id: string
  title: string
  description: string
  location: string
  budget: number
  amount_raised: number
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled'
  project_type: string
  beneficiaries_count: number
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
  location_lat?: number
  location_long?: number
  image_url?: string
}

export interface Donation {
  id: string
  project_id: string
  donor_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  escrow_status: 'held' | 'released' | 'pending'
  message?: string
  payment_method?: string
  stripe_payment_intent_id?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  user_id: string
  school_id?: string
  education_level: string
  field_of_study?: string
  enrollment_date?: string
  graduation_date?: string
  gpa?: number
  financial_need_description?: string
  created_at: string
  updated_at: string
}

export interface NGO {
  id: string
  user_id: string
  organization_name: string
  registration_number?: string
  mission_statement?: string
  website?: string
  established_year?: number
  total_projects?: number
  total_funds_raised?: number
  rating_avg?: number
  created_at: string
  updated_at: string
}

export interface MonitoringAgent {
  id: string
  user_id: string
  specializations?: string[]
  service_area?: string
  proximity_km?: number
  total_reports?: number
  rating_avg?: number
  badge_level?: 'bronze' | 'silver' | 'gold'
  created_at: string
  updated_at: string
}

export interface MonitoringReport {
  id: string
  project_id: string
  monitoring_agent_id: string
  report_type: 'pre' | 'mid' | 'final'
  content: string
  photos?: string[]
  location_lat?: number
  location_long?: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Milestone {
  id: string
  project_id: string
  title: string
  description?: string
  amount: number
  order: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  target_date?: string
  completed_date?: string
  created_at: string
  updated_at: string
}

export interface Escrow {
  id: string
  project_id: string
  total_held: number
  total_released: number
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Rating {
  id: string
  rater_id: string
  target_id: string
  target_type: 'ngo' | 'monitoring_agent' | 'project'
  score: number
  comment?: string
  created_at: string
  updated_at: string
}

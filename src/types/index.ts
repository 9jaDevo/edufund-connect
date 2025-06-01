// User types
export enum UserRole {
  DONOR = 'donor',
  STUDENT = 'student',
  NGO = 'ngo',
  MONITORING_AGENT = 'monitoring_agent',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profilePicture?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Donor extends User {
  role: UserRole.DONOR;
  totalDonated?: number;
  activeSponsorships?: number;
  country?: string;
}

export interface Student extends User {
  role: UserRole.STUDENT;
  schoolId?: string;
  grade?: string;
  birthDate?: string;
  story?: string;
  goals?: string;
  fundingNeeded?: number;
  fundingReceived?: number;
  gender?: 'male' | 'female' | 'other';
  location?: string;
}

export interface NGO extends User {
  role: UserRole.NGO;
  mission?: string;
  foundedYear?: number;
  location?: string;
  focusAreas?: string[];
  verified?: boolean;
}

export interface MonitoringAgent extends User {
  role: UserRole.MONITORING_AGENT;
  assignedProjects?: number;
  completedReports?: number;
  rating?: number;
  specialization?: string[];
  location?: string;
  verified?: boolean;
}

// Funding types
export enum FundStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum DisbursementStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  RELEASED = 'released',
  REJECTED = 'rejected',
}

export interface Fund {
  id: string;
  donorId: string;
  studentId: string;
  schoolId: string;
  amount: number;
  status: FundStatus;
  createdAt: string;
  updatedAt: string;
  monitoringAgentId?: string;
  notes?: string;
  purpose?: string;
}

export interface Disbursement {
  id: string;
  fundId: string;
  amount: number;
  status: DisbursementStatus;
  releaseDate?: string;
  batch: number;
  monitoringReport?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonitoringReport {
  id: string;
  fundId: string;
  disbursementId: string;
  monitoringAgentId: string;
  content: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData, role: UserRole) => Promise<void>;
  logout: () => void;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  // Additional fields based on role
  [key: string]: any;
}
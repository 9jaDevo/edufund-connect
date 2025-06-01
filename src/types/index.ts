import { z } from 'zod';

// User types
export enum UserRole {
  DONOR = 'donor',
  STUDENT = 'student',
  NGO = 'ngo',
  MONITORING_AGENT = 'monitoring_agent',
  ADMIN = 'admin',
}

export interface Rating {
  id: string;
  raterId: string;
  ratedId: string;
  score: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: 'donor' | 'ma' | 'ngo';
  level: 'bronze' | 'silver' | 'gold';
  criteria: Record<string, any>;
  icon: string;
  createdAt: string;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  badge: Badge;
  awardedAt: string;
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
  reputationScore?: number;
  preferredLanguage?: string;
  country?: string;
  city?: string;
  phone?: string;
  bio?: string;
  badges?: UserBadge[];
  ratings?: Rating[];
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

// Form validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.nativeEnum(UserRole),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData, role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
}

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
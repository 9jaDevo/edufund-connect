import { create } from 'zustand';
import { 
  AuthState, 
  LoginData, 
  RegisterData, 
  User, 
  UserRole 
} from '../types';

// Mock user data (to be replaced with API calls)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'donor@example.com',
    name: 'John Donor',
    role: UserRole.DONOR,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'student@example.com',
    name: 'Jane Student',
    role: UserRole.STUDENT,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'school@example.com',
    name: 'Horizon Academy',
    role: UserRole.SCHOOL,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'agent@example.com',
    name: 'Mary Monitor',
    role: UserRole.MONITORING_AGENT,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    email: 'admin@example.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock implementation (to be replaced with actual API calls)
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') { // Just for demo purposes
        set({ 
          isAuthenticated: true, 
          user, 
          loading: false,
          error: null
        });
        // Store in localStorage for persistence (simplified)
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        set({ 
          isAuthenticated: false, 
          user: null, 
          loading: false,
          error: 'Invalid email or password'
        });
      }
    } catch (error) {
      set({ 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: 'An error occurred during login'
      });
    }
  },
  
  register: async (data: RegisterData, role: UserRole) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      
      if (existingUser) {
        set({ 
          loading: false,
          error: 'Email already exists'
        });
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email: data.email,
        name: data.name,
        role,
        isVerified: false, // New users need verification
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, this would be an API call to create the user
      mockUsers.push(newUser);
      
      set({ 
        isAuthenticated: true, 
        user: newUser, 
        loading: false,
        error: null
      });
      
      // Store in localStorage for persistence (simplified)
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      set({ 
        loading: false,
        error: 'An error occurred during registration'
      });
    }
  },
  
  logout: () => {
    // Remove from localStorage
    localStorage.removeItem('user');
    
    set({ 
      isAuthenticated: false, 
      user: null
    });
  }
}));

// Check for existing login on init
const initAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.setState({ 
        isAuthenticated: true, 
        user
      });
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
};

// Initialize auth state
initAuth();
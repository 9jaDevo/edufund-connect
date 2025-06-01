import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AuthState, LoginData, RegisterData, User, UserRole } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1);
      
      if (error) throw error;
      
      // Check if we found a user and validate password
      if (data && data.length > 0 && password === 'password') { // Demo purposes only - replace with real auth
        const user = data[0];
        set({ 
          isAuthenticated: true, 
          user: user as User, 
          loading: false,
          error: null
        });
        localStorage.setItem('user', JSON.stringify(user));
        return true; // Return true for successful login
      } else {
        set({ 
          isAuthenticated: false, 
          user: null, 
          loading: false,
          error: 'Invalid email or password'
        });
        return false; // Return false for failed login
      }
    } catch (error) {
      set({ 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: 'An error occurred during login'
      });
      return false; // Return false for failed login
    }
  },
  
  register: async (data: RegisterData, role: UserRole) => {
    set({ loading: true, error: null });
    
    try {
      // Check if email exists - removed .single() to handle no results properly
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', data.email);
      
      if (checkError) throw checkError;
      
      // Check if any users were found with this email
      if (existingUsers && existingUsers.length > 0) {
        set({ loading: false, error: 'Email already exists' });
        return;
      }
      
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: data.email,
          name: data.name,
          role: role,
          is_verified: false,
        })
        .select()
        .single();
      
      if (createError) throw createError;
      
      set({ 
        isAuthenticated: true, 
        user: newUser as User, 
        loading: false,
        error: null
      });
      
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      set({ 
        loading: false,
        error: 'An error occurred during registration'
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
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

initAuth();
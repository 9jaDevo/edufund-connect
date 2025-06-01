import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AuthState, LoginData, RegisterData, User, UserRole } from '../types';
import { showToast } from '../components/ui/Toast';

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
      
      if (error) {
        showToast.error('Failed to authenticate');
        throw error;
      }
      
      // Check if we found a user and validate password
      if (data && data.length > 0 && password === 'password') { // Demo purposes only
        const user = data[0];
        set({ 
          isAuthenticated: true, 
          user: user as User, 
          loading: false,
          error: null
        });
        localStorage.setItem('user', JSON.stringify(user));
        showToast.success('Welcome back!');
        return true;
      } else {
        set({ 
          isAuthenticated: false, 
          user: null, 
          loading: false,
          error: 'Invalid email or password'
        });
        showToast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      set({ 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: 'An error occurred during login'
      });
      return false;
    }
  },
  
  register: async (data: RegisterData, role: UserRole) => {
    set({ loading: true, error: null });
    
    try {
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', data.email);
      
      if (checkError) throw checkError;
      
      if (existingUsers && existingUsers.length > 0) {
        set({ loading: false, error: 'Email already exists' });
        showToast.error('Email already exists');
        return;
      }
      
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
      showToast.success('Account created successfully!');
    } catch (error) {
      set({ 
        loading: false,
        error: 'An error occurred during registration'
      });
      showToast.error('Failed to create account');
    }
  },
  
  updateProfile: async (data: Partial<User>) => {
    set({ loading: true, error: null });
    
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('No user logged in');
      
      const { data: updatedUser, error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      set({
        user: { ...user, ...updatedUser } as User,
        loading: false,
        error: null
      });
      
      localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
    } catch (error) {
      set({ loading: false, error: 'Failed to update profile' });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
    showToast.info('You have been logged out');
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
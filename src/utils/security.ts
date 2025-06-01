import { supabase } from '../lib/supabase';

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim();
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

export const checkPermissions = async (userId: string, requiredRole: string): Promise<boolean> => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return user.role === requiredRole;
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
};

export const validateToken = (token: string): boolean => {
  // Implement JWT validation logic here
  try {
    // Example validation (replace with actual JWT validation)
    return token.split('.').length === 3;
  } catch (error) {
    return false;
  }
};

export const rateLimit = (() => {
  const requests = new Map<string, number[]>();
  const limit = 100; // requests
  const timeWindow = 60 * 1000; // 1 minute

  return (userId: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(userId) || [];
    
    // Remove old requests
    const recentRequests = userRequests.filter(time => now - time < timeWindow);
    
    if (recentRequests.length >= limit) {
      return false; // Rate limit exceeded
    }
    
    recentRequests.push(now);
    requests.set(userId, recentRequests);
    return true;
  };
})();
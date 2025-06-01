import { useEffect, useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const RECAPTCHA_V2_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY;

export const ReCaptchaProvider = ({ children }: { children: React.ReactNode }) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={RECAPTCHA_SITE_KEY}
    scriptProps={{
      async: true,
      defer: true,
      appendTo: 'head',
    }}
  >
    {children}
  </GoogleReCaptchaProvider>
);

export const useReCaptcha = (action: string) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showV2Fallback, setShowV2Fallback] = useState(false);

  useEffect(() => {
    const executeReCaptcha = async () => {
      if (!executeRecaptcha) return;

      try {
        setLoading(true);
        const result = await executeRecaptcha(action);
        const score = await verifyToken(result);
        
        if (score < 0.5) {
          setShowV2Fallback(true);
        } else {
          setToken(result);
        }
      } catch (err) {
        console.error('reCAPTCHA error:', err);
        setError('Security verification failed');
        setShowV2Fallback(true);
      } finally {
        setLoading(false);
      }
    };

    executeReCaptcha();
  }, [executeRecaptcha, action]);

  const handleV2Response = async (v2Token: string) => {
    try {
      const isValid = await verifyV2Token(v2Token);
      if (isValid) {
        setToken(v2Token);
        setShowV2Fallback(false);
      } else {
        setError('Security verification failed');
      }
    } catch (err) {
      console.error('reCAPTCHA v2 error:', err);
      setError('Security verification failed');
    }
  };

  return { token, loading, error, showV2Fallback, handleV2Response };
};

const verifyToken = async (token: string): Promise<number> => {
  try {
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) throw new Error('Verification failed');
    
    const data = await response.json();
    return data.score;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

const verifyV2Token = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/verify-recaptcha-v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) throw new Error('Verification failed');
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('V2 token verification error:', error);
    throw error;
  }
};

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
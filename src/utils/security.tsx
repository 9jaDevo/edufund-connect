import { useEffect, useState, createContext, useContext } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCAPTCHA from 'react-google-recaptcha';
import { supabase } from '../lib/supabase';

const RECAPTCHA_V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;
const RECAPTCHA_V2_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY;

type ReCaptchaContextType = {
  showV2Challenge: boolean;
  setShowV2Challenge: (show: boolean) => void;
};

const ReCaptchaContext = createContext<ReCaptchaContextType>({
  showV2Challenge: false,
  setShowV2Challenge: () => {},
});

export const ReCaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  const [showV2Challenge, setShowV2Challenge] = useState(false);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_V3_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <ReCaptchaContext.Provider value={{ showV2Challenge, setShowV2Challenge }}>
        {children}
      </ReCaptchaContext.Provider>
    </GoogleReCaptchaProvider>
  );
};

export const useReCaptcha = (action: string) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { showV2Challenge, setShowV2Challenge } = useContext(ReCaptchaContext);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const executeV3 = async () => {
      if (!executeRecaptcha) return;

      try {
        setLoading(true);
        const result = await executeRecaptcha(action);
        const response = await verifyV3Token(result);
        
        if (response.score < 0.5) {
          setShowV2Challenge(true);
        } else {
          setToken(result);
          setShowV2Challenge(false);
        }
      } catch (err) {
        console.error('reCAPTCHA v3 error:', err);
        setShowV2Challenge(true);
      } finally {
        setLoading(false);
      }
    };

    if (!showV2Challenge) {
      executeV3();
    }
  }, [executeRecaptcha, action, showV2Challenge]);

  const handleV2Response = async (v2Token: string | null) => {
    if (!v2Token) {
      setError('V2 verification failed');
      return;
    }

    try {
      const response = await verifyV2Token(v2Token);
      if (response.success) {
        setToken(v2Token);
        setShowV2Challenge(false);
        setError(null);
      } else {
        setError('Security verification failed');
      }
    } catch (err) {
      console.error('reCAPTCHA v2 error:', err);
      setError('Security verification failed');
    }
  };

  return {
    token,
    loading,
    error,
    showV2Challenge,
    handleV2Response,
    ReCaptchaV2: () => (
      showV2Challenge ? (
        <ReCAPTCHA
          sitekey={RECAPTCHA_V2_SITE_KEY}
          onChange={handleV2Response}
          onExpired={() => setError('Verification expired')}
          onError={() => setError('Verification failed')}
        />
      ) : null
    ),
  };
};

const verifyV3Token = async (token: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-recaptcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        token,
        version: 'v3'
      }),
    });

    if (!response.ok) throw new Error('Verification failed');
    return await response.json();
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

const verifyV2Token = async (token: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-recaptcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        token,
        version: 'v2'
      }),
    });

    if (!response.ok) throw new Error('Verification failed');
    return await response.json();
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
  try {
    return token.split('.').length === 3;
  } catch (error) {
    return false;
  }
};

export const rateLimit = (() => {
  const requests = new Map<string, number[]>();
  const limit = 100;
  const timeWindow = 60 * 1000;

  return (userId: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(userId) || [];
    const recentRequests = userRequests.filter(time => now - time < timeWindow);
    
    if (recentRequests.length >= limit) {
      return false;
    }
    
    recentRequests.push(now);
    requests.set(userId, recentRequests);
    return true;
  };
})();
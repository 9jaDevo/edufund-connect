import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const MADashboardPage = () => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } });
      return;
    }
    
    if (!loading && isAuthenticated && user) {
      // Redirect to role-specific dashboard
      switch (user.role) {
        case UserRole.DONOR:
          navigate('/donor/dashboard');
          break;
        case UserRole.STUDENT:
          navigate('/student/dashboard');
          break;
        case UserRole.NGO:
          navigate('/ngo/dashboard');
          break;
        case UserRole.MONITORING_AGENT:
          navigate('/monitor/dashboard');
          break;
        case UserRole.ADMIN:
          navigate('/admin');
          break;
        default:
          // Keep on general dashboard
          break;
      }
    }
  }, [isAuthenticated, user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
};

export default MADashboardPage;
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { LoginData } from '../../types';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the 'from' path from location state or default to '/'
  const from = (location.state as any)?.from?.pathname || '/';
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginData>();
  
  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoAccounts = [
    { role: 'Donor', email: 'donor@example.com' },
    { role: 'Student', email: 'student@example.com' },
    { role: 'NGO', email: 'ngo@example.com' },
    { role: 'Monitoring Agent', email: 'agent@example.com' },
    { role: 'Admin', email: 'admin@example.com' },
  ];

  const loginWithDemo = (email: string) => {
    setValue('email', email);
    setValue('password', 'password');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-500 hover:text-primary-600">
              create an account
            </Link>
          </p>
        </div>

        <Card className="mt-8">
          <CardContent className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md flex items-start gap-2 text-error-700">
                <AlertCircle className="h-5 w-5 text-error-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`form-input ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={`form-input ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errors.password && <p className="form-error">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-primary-500 hover:text-primary-600">
                  Forgot your password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                leftIcon={<LogIn className="h-4 w-4" />}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {demoAccounts.map((account) => (
                  <div key={account.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{account.role}</p>
                      <p className="text-sm text-gray-500">{account.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loginWithDemo(account.email)}
                    >
                      Use Account
                    </Button>
                  </div>
                ))}
                <p className="text-center text-sm text-gray-500 mt-4">
                  All demo accounts use password: <code className="bg-gray-100 px-2 py-0.5 rounded">password</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
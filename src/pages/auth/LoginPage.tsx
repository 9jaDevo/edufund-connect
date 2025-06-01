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
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  
  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
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

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Demo accounts: Use <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">donor@example.com</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">student@example.com</code>, etc.
                  <br />with password <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">password</code>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
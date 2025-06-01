import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, GraduationCap, Users, UserCheck, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { RegisterData, UserRole } from '../../types';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser, error } = useAuthStore();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<RegisterData>();
  
  const password = watch('password');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    reset({ role }); // Set the role field
  };

  const roleOptions = [
    { role: UserRole.DONOR, label: 'Donor', icon: <UserPlus />, description: 'Support students and educational projects' },
    { role: UserRole.STUDENT, label: 'Student', icon: <GraduationCap />, description: 'Apply for educational funding' },
    { role: UserRole.NGO, label: 'NGO', icon: <Users />, description: 'Create and manage educational projects' },
    { role: UserRole.MONITORING_AGENT, label: 'Monitoring Agent', icon: <UserCheck />, description: 'Monitor and verify fund usage' },
  ];

  const onSubmit = async (data: RegisterData) => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    
    try {
      await registerUser(data, selectedRole);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create your EduFund Connect account</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
              Sign in
            </Link>
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            {error && (
              <div className="mb-6 p-3 bg-error-50 border border-error-200 rounded-md flex items-start gap-2 text-error-700">
                <AlertCircle className="h-5 w-5 text-error-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!selectedRole ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Select your account type</h3>
                  <p className="text-gray-600 mt-2">Choose the role that best describes you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roleOptions.map((option) => (
                    <button
                      key={option.role}
                      type="button"
                      onClick={() => handleRoleSelect(option.role)}
                      className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-500 mb-4">
                        {option.icon}
                      </div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{option.label}</h4>
                      <p className="text-sm text-center text-gray-600">{option.description}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="flex items-center justify-center text-sm text-gray-500">
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    All accounts require verification before full access
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-6">
                  <button 
                    type="button" 
                    className="text-sm text-primary-500 hover:text-primary-600 mr-2"
                    onClick={() => setSelectedRole(null)}
                  >
                    &larr; Back
                  </button>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Register as a {roleOptions.find(r => r.role === selectedRole)?.label}
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Hidden role field */}
                  <input 
                    type="hidden" 
                    {...register('role')}
                    value={selectedRole}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className={`form-input ${errors.name ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                        {...register('name', {
                          required: 'Name is required',
                        })}
                      />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>

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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className={`form-input ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                          },
                        })}
                      />
                      {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className={`form-input ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match',
                        })}
                      />
                      {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {selectedRole === UserRole.DONOR && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <input
                          id="country"
                          type="text"
                          className="form-input"
                          {...register('country')}
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === UserRole.STUDENT && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="birthDate" className="form-label">
                          Date of Birth
                        </label>
                        <input
                          id="birthDate"
                          type="date"
                          className="form-input"
                          {...register('birthDate')}
                        />
                      </div>
                      <div>
                        <label htmlFor="grade" className="form-label">
                          Current Grade/Year
                        </label>
                        <input
                          id="grade"
                          type="text"
                          className="form-input"
                          {...register('grade')}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="story" className="form-label">
                          Your Story (optional)
                        </label>
                        <textarea
                          id="story"
                          rows={3}
                          className="form-input"
                          placeholder="Tell us about yourself and your educational goals..."
                          {...register('story')}
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {selectedRole === UserRole.NGO && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="mission" className="form-label">
                          Organization Mission
                        </label>
                        <textarea
                          id="mission"
                          rows={3}
                          className="form-input"
                          {...register('mission')}
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="foundedYear" className="form-label">
                          Year Founded
                        </label>
                        <input
                          id="foundedYear"
                          type="number"
                          className="form-input"
                          {...register('foundedYear', {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === UserRole.MONITORING_AGENT && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="location" className="form-label">
                          Location/Area of Operation
                        </label>
                        <input
                          id="location"
                          type="text"
                          className="form-input"
                          {...register('location')}
                        />
                      </div>
                      <div>
                        <label htmlFor="specialization" className="form-label">
                          Areas of Specialization
                        </label>
                        <input
                          id="specialization"
                          type="text"
                          className="form-input"
                          placeholder="e.g. primary education, vocational training"
                          {...register('specialization')}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded mt-1"
                      {...register('terms', {
                        required: 'You must agree to the terms and conditions',
                      })}
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/terms" className="text-primary-500 hover:text-primary-600">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-primary-500 hover:text-primary-600">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.terms && <p className="form-error">{errors.terms.message}</p>}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    leftIcon={<UserPlus className="h-4 w-4" />}
                  >
                    Create Account
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
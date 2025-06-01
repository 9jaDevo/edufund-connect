import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Camera, MapPin, Globe, Mail, Phone } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import FormError from '../../components/ui/FormError';
import { showToast } from '../../components/ui/Toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  language: z.string(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      language: user?.preferredLanguage || 'en',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      showToast.success('Profile updated successfully');
    } catch (error) {
      showToast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border border-gray-200">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG or PNG. Max size of 1MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      {...register('name')}
                    />
                    {errors.name && <FormError message={errors.name.message} />}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        className="form-input pl-10"
                        {...register('email')}
                      />
                    </div>
                    {errors.email && <FormError message={errors.email.message} />}
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        className="form-input pl-10"
                        {...register('phone')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="form-label">Country</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="country"
                        type="text"
                        className="form-input pl-10"
                        {...register('country')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="form-label">City</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="city"
                        type="text"
                        className="form-input pl-10"
                        {...register('city')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="language" className="form-label">Preferred Language</label>
                    <select
                      id="language"
                      className="form-input"
                      {...register('language')}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="ar">Arabic</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="form-input"
                    placeholder="Tell us about yourself..."
                    {...register('bio')}
                  ></textarea>
                  {errors.bio && <FormError message={errors.bio.message} />}
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
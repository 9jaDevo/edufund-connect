import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Bell, 
  Globe, 
  Lock, 
  Mail, 
  Shield, 
  Smartphone,
  User,
  Wallet,
  MapPin,
  Building,
  GraduationCap,
  FileCheck
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import FormError from '../../components/ui/FormError';
import CountrySelect from '../../components/ui/CountrySelect';
import { showToast } from '../../components/ui/Toast';
import { UserRole } from '../../types';

const settingsSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  language: z.string(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  twoFactorEnabled: z.boolean(),
  country: z.string().optional(),
  city: z.string().optional(),
  timezone: z.string(),
  currency: z.string(),
  // NGO specific
  organizationName: z.string().optional(),
  taxId: z.string().optional(),
  // Student specific
  school: z.string().optional(),
  grade: z.string().optional(),
  // Monitoring Agent specific
  monitoringArea: z.object({
    radius: z.number(),
    center: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }).optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const SettingsPage = () => {
  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: user?.email || '',
      name: user?.name || '',
      phone: user?.phone || '',
      language: user?.preferredLanguage || 'en',
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      twoFactorEnabled: false,
      country: user?.country || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      currency: 'USD',
      // Role-specific defaults
      ...(user?.role === UserRole.NGO && {
        organizationName: user?.name,
        taxId: '',
      }),
      ...(user?.role === UserRole.STUDENT && {
        school: '',
        grade: '',
      }),
      ...(user?.role === UserRole.MONITORING_AGENT && {
        monitoringArea: {
          radius: 50,
          center: { lat: 0, lng: 0 },
        },
      }),
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      showToast.success('Settings updated successfully');
    } catch (error) {
      showToast.error('Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    ...(user?.role === UserRole.NGO ? [{ id: 'organization', label: 'Organization', icon: Building }] : []),
    ...(user?.role === UserRole.STUDENT ? [{ id: 'education', label: 'Education', icon: GraduationCap }] : []),
    ...(user?.role === UserRole.MONITORING_AGENT ? [{ id: 'monitoring', label: 'Monitoring', icon: FileCheck }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          {...register('email')}
                        />
                        {errors.email && <FormError message={errors.email.message} />}
                      </div>

                      <div>
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          className="form-input"
                          {...register('phone')}
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="form-label">Country</label>
                        <CountrySelect
                          value={watch('country')}
                          onChange={(value) => setValue('country', value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                          id="city"
                          type="text"
                          className="form-input"
                          {...register('city')}
                        />
                      </div>

                      <div>
                        <label htmlFor="timezone" className="form-label">Timezone</label>
                        <select
                          id="timezone"
                          className="form-input"
                          {...register('timezone')}
                        >
                          {Intl.supportedValuesOf('timeZone').map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register('emailNotifications')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates via SMS</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register('smsNotifications')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive in-app notifications</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register('pushNotifications')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register('twoFactorEnabled')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div>
                        <Button variant="outline" className="w-full">
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Login History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { device: 'Chrome on Windows', location: 'New York, US', time: '2 hours ago' },
                        { device: 'Safari on iPhone', location: 'London, UK', time: '1 day ago' },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{session.device}</p>
                            <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Logout
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="language" className="form-label">Language</label>
                        <select
                          id="language"
                          className="form-input"
                          {...register('language')}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="currency" className="form-label">Currency</label>
                        <select
                          id="currency"
                          className="form-input"
                          {...register('currency')}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'organization' && user?.role === UserRole.NGO && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="organizationName" className="form-label">Organization Name</label>
                        <input
                          id="organizationName"
                          type="text"
                          className="form-input"
                          {...register('organizationName')}
                        />
                      </div>

                      <div>
                        <label htmlFor="taxId" className="form-label">Tax ID / Registration Number</label>
                        <input
                          id="taxId"
                          type="text"
                          className="form-input"
                          {...register('taxId')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'education' && user?.role === UserRole.STUDENT && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Educational Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="school" className="form-label">School Name</label>
                        <input
                          id="school"
                          type="text"
                          className="form-input"
                          {...register('school')}
                        />
                      </div>

                      <div>
                        <label htmlFor="grade" className="form-label">Current Grade</label>
                        <input
                          id="grade"
                          type="text"
                          className="form-input"
                          {...register('grade')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'monitoring' && user?.role === UserRole.MONITORING_AGENT && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monitoring Area Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="form-label">Coverage Radius (km)</label>
                        <input
                          type="number"
                          className="form-input"
                          min="1"
                          max="100"
                          defaultValue={50}
                          onChange={(e) => {
                            const monitoringArea = watch('monitoringArea');
                            setValue('monitoringArea', {
                              ...monitoringArea,
                              radius: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>

                      <div>
                        <label className="form-label">Center Location</label>
                        <div className="h-64 bg-gray-100 rounded-lg mb-2">
                          {/* Map component would go here */}
                          <div className="flex items-center justify-center h-full text-gray-500">
                            Map integration for selecting monitoring area
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          Click on the map to set your monitoring area center point
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-4">
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
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
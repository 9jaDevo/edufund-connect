import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { useReCaptcha } from '../../utils/security';
import { showToast } from '../../components/ui/Toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const { token, loading, error, showV2Challenge, ReCaptchaV2 } = useReCaptcha('contact_form');

  const onSubmit = async (data: ContactFormData) => {
    if (!token) {
      showToast.error('Please complete the security verification');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast.success('Message sent successfully!');
      reset();
    } catch (error) {
      showToast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90">
              Have questions? We're here to help and would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@edufundconnect.com</p>
                      <p className="text-sm text-gray-500">We aim to respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri from 9am to 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Office</h3>
                      <p className="text-gray-600">123 Education Drive</p>
                      <p className="text-gray-600">New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Quick Support
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Check our comprehensive FAQ section for immediate answers to common questions.
                    </p>
                    <Button 
                      variant="outline"
                      leftIcon={<MessageSquare className="h-4 w-4" />}
                      className="w-full"
                    >
                      Visit FAQ
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-input"
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && (
                          <p className="text-sm text-error-600 mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-sm text-error-600 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="form-input"
                          {...register('subject', { required: 'Subject is required' })}
                        />
                        {errors.subject && (
                          <p className="text-sm text-error-600 mt-1">{errors.subject.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="form-label">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="form-input"
                          {...register('message', { required: 'Message is required' })}
                        ></textarea>
                        {errors.message && (
                          <p className="text-sm text-error-600 mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      {showV2Challenge && (
                        <div className="flex justify-center">
                          <ReCaptchaV2 />
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        size="lg"
                        isLoading={isSubmitting}
                        leftIcon={<Send className="h-4 w-4" />}
                        disabled={loading || !token}
                      >
                        Send Message
                      </Button>

                      {error && (
                        <p className="text-sm text-error-600 text-center mt-2">{error}</p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
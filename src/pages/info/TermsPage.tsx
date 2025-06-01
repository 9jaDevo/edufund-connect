import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import PageHero from '../../components/ui/PageHero';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Terms of Service"
        description="Please read these terms carefully before using our platform."
      />

      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                These Terms of Service ("Terms") govern your use of EduFund Connect's platform and services. 
                By using our platform, you agree to these terms in full. If you disagree with these terms 
                or any part of them, you must not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Usage</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our platform facilitates educational funding through transparent and monitored processes. Users must:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Maintain the confidentiality of their account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect the rights and privacy of other users</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">3.1 Donors</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate payment information</li>
                  <li>Understand the fund disbursement process</li>
                  <li>Accept the monitoring and verification procedures</li>
                  <li>Acknowledge that donations are non-refundable once disbursed</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800">3.2 Students</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate personal and academic information</li>
                  <li>Maintain regular attendance and academic progress</li>
                  <li>Cooperate with monitoring agents</li>
                  <li>Use funds solely for educational purposes</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800">3.3 Monitoring Agents</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Conduct regular and thorough verifications</li>
                  <li>Provide accurate and timely reports</li>
                  <li>Maintain professional conduct</li>
                  <li>Protect student privacy and confidentiality</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Fund Management</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  All funds are managed through our secure escrow system with the following conditions:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Funds are held in escrow until verification requirements are met</li>
                  <li>Disbursements occur in stages based on verified progress</li>
                  <li>Platform fees are transparently disclosed</li>
                  <li>Complete transaction records are maintained</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
              <p className="text-gray-600 mb-4">
                We are committed to protecting your privacy and personal data. Our data collection 
                and processing practices are detailed in our{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content and materials available on EduFund Connect, including but not limited to 
                text, graphics, logos, button icons, images, audio clips, data compilations, and 
                software, are the property of EduFund Connect or its content suppliers and protected 
                by international copyright laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                EduFund Connect shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, or any loss of profits or revenues, whether 
                incurred directly or indirectly, or any loss of data, use, goodwill, or other 
                intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through the platform. Continued use of the platform 
                after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For any questions about these Terms, please contact us at:
              </p>
              <div className="text-gray-600">
                <p>Email: legal@edufundconnect.com</p>
                <p>Address: 123 Education Drive, Global City</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">
              Have questions about our terms or need assistance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  variant="primary"
                  leftIcon={<Shield className="h-4 w-4" />}
                >
                  Contact Support
                </Button>
              </Link>
              <Link to="/privacy">
                <Button 
                  variant="outline"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  View Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
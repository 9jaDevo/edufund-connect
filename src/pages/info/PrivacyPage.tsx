import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import PageHero from '../../components/ui/PageHero';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />

      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                At EduFund Connect, we take your privacy seriously. This Privacy Policy explains how 
                we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">2.1 Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Name and contact information</li>
                  <li>Date of birth and identification documents</li>
                  <li>Educational records and financial information</li>
                  <li>Payment information</li>
                  <li>Profile pictures and biographical information</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800">2.2 Usage Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Log data and device information</li>
                  <li>Platform interaction history</li>
                  <li>Communication preferences</li>
                  <li>Location data (with consent)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4">
                <p className="text-gray-600">We use your information to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Facilitate educational funding and monitoring</li>
                  <li>Verify identities and prevent fraud</li>
                  <li>Process donations and disbursements</li>
                  <li>Generate monitoring reports and impact assessments</li>
                  <li>Communicate platform updates and notifications</li>
                  <li>Improve our services and user experience</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <div className="space-y-4">
                <p className="text-gray-600">We may share your information with:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Monitoring agents for verification purposes</li>
                  <li>Educational institutions for enrollment verification</li>
                  <li>Payment processors for donation handling</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p className="text-gray-600">
                  We never sell your personal information to third parties.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data storage and transmission</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <div className="space-y-4">
                <p className="text-gray-600">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, 
                analyze platform usage, and personalize content. You can control cookie preferences 
                through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                We collect information about students under 18 only with parental consent and in 
                compliance with applicable laws. Special protections are in place for minor students' 
                data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred and processed in countries other than your own. 
                We ensure appropriate safeguards are in place for international data transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Policy Updates</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy periodically. We will notify you of any material 
                changes and obtain consent where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                For privacy-related inquiries or to exercise your rights, please contact our Data 
                Protection Officer at:
              </p>
              <div className="text-gray-600">
                <p>Email: privacy@edufundconnect.com</p>
                <p>Address: 123 Education Drive, Global City</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">
              Have questions about your privacy or need to report a concern?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  variant="primary"
                  leftIcon={<Shield className="h-4 w-4" />}
                >
                  Contact Privacy Team
                </Button>
              </Link>
              <Link to="/terms">
                <Button 
                  variant="outline"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  View Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Shield, 
  Users, 
  FileCheck, 
  DollarSign,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How EduFund Connect Works
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Our transparent and accountable platform ensures your donations make a real impact
              in students' lives through verified monitoring and staged disbursements.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  icon: <Users className="h-8 w-8 text-primary-500" />,
                  title: "1. Student Verification",
                  description: "Each student profile is thoroughly verified by our team and local NGO partners. We check academic records, financial needs, and family circumstances.",
                  details: [
                    "Identity verification",
                    "Academic record review",
                    "Financial need assessment",
                    "Local NGO partnership",
                  ]
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-primary-500" />,
                  title: "2. Secure Fund Collection",
                  description: "Donations are held in a secure escrow account and released in stages based on verified progress and milestones.",
                  details: [
                    "Secure payment processing",
                    "Transparent fund tracking",
                    "Stage-based disbursement",
                    "Complete audit trail",
                  ]
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary-500" />,
                  title: "3. Monitoring & Verification",
                  description: "Independent monitoring agents verify student attendance, academic progress, and proper use of funds through regular site visits.",
                  details: [
                    "Regular progress checks",
                    "Photo documentation",
                    "Academic performance tracking",
                    "Fund utilization verification",
                  ]
                },
                {
                  icon: <FileCheck className="h-8 w-8 text-primary-500" />,
                  title: "4. Impact Reporting",
                  description: "Donors receive regular updates on their sponsored students' progress, including academic achievements and personal growth.",
                  details: [
                    "Academic progress reports",
                    "Photo updates",
                    "Personal impact stories",
                    "Financial transparency",
                  ]
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-primary-500 mr-2" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Trust EduFund Connect?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Transparency",
                description: "Track every dollar from donation to disbursement with our transparent reporting system.",
                icon: <ClipboardList className="h-8 w-8" />,
              },
              {
                title: "Verified Impact",
                description: "Independent monitoring agents verify student progress and fund utilization.",
                icon: <Shield className="h-8 w-8" />,
              },
              {
                title: "Local Partnerships",
                description: "We work with trusted local NGOs and educational institutions.",
                icon: <Users className="h-8 w-8" />,
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <div className="text-primary-600">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of donors and help transform students' lives through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/students">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Browse Students
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
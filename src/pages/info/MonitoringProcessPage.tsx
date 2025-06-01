import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Camera, FileCheck, ArrowRight, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import PageHero from '../../components/ui/PageHero';

const MonitoringProcessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Our Monitoring Process"
        description="Ensuring transparency and accountability through rigorous verification and reporting."
        image="https://images.pexels.com/photos/5212326/pexels-photo-5212326.jpeg"
      />

      {/* Process Steps */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-primary-500" />,
                  title: "1. Monitoring Agent Assignment",
                  description: "Each funded student is assigned a dedicated monitoring agent who oversees their progress and fund utilization.",
                  details: [
                    "Background-checked and trained agents",
                    "Local presence for regular visits",
                    "Education sector experience",
                    "Regular training and updates",
                  ]
                },
                {
                  icon: <Camera className="h-8 w-8 text-primary-500" />,
                  title: "2. Regular Site Visits",
                  description: "Monitoring agents conduct scheduled and surprise visits to verify attendance and progress.",
                  details: [
                    "Physical verification of attendance",
                    "Photo documentation",
                    "Teacher consultations",
                    "Resource utilization checks",
                  ]
                },
                {
                  icon: <FileCheck className="h-8 w-8 text-primary-500" />,
                  title: "3. Progress Documentation",
                  description: "Comprehensive reports are compiled to track academic progress and fund utilization.",
                  details: [
                    "Academic performance tracking",
                    "Attendance records",
                    "Financial documentation",
                    "Development milestones",
                  ]
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-primary-500" />,
                  title: "4. Disbursement Verification",
                  description: "Each fund disbursement is tied to verified progress and proper utilization of previous funds.",
                  details: [
                    "Receipt verification",
                    "Progress requirements",
                    "Staged releases",
                    "Audit trail maintenance",
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

      {/* Monitoring Agents */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Monitoring Agents
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "John Kimani",
                role: "Lead Monitor - East Africa",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
                experience: "10+ years in education monitoring",
                location: "Nairobi, Kenya",
              },
              {
                name: "Maria Santos",
                role: "Senior Monitor - Latin America",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
                experience: "8 years in social work",
                location: "Bogotá, Colombia",
              },
              {
                name: "Raj Patel",
                role: "Lead Monitor - South Asia",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                experience: "12 years in education sector",
                location: "Mumbai, India",
              },
            ].map((agent, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">{agent.role}</p>
                  <p className="text-gray-600 text-sm">{agent.experience}</p>
                  <p className="text-gray-500 text-sm">{agent.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "5,000+", label: "Site Visits Completed" },
              { value: "98%", label: "Verification Rate" },
              { value: "24/48h", label: "Response Time" },
              { value: "100%", label: "Fund Tracking" },
            ].map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Join Our Monitoring Network
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Are you passionate about education and transparency? Join our team of monitoring agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Users className="h-4 w-4" />}
                >
                  Apply as Monitor
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonitoringProcessPage;
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Target, 
  Heart, 
  Globe,
  Award,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About EduFund Connect
            </h1>
            <p className="text-xl text-white/90">
              Bridging the gap between education dreams and reality through transparent,
              accountable funding and monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To create a transparent and accountable platform that connects donors directly
                  with students in need, ensuring every contribution makes a verified impact on
                  educational outcomes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  A world where every student has access to quality education, unhindered by
                  financial constraints, supported by a global community of verified donors and
                  monitoring partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Transparency",
                description: "Every dollar is tracked and verified through our monitoring system.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Accountability",
                description: "Regular verification and reporting ensure proper fund utilization.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community",
                description: "Building connections between donors, students, and local partners.",
              },
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <div className="text-primary-600">{value.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "1,500+", label: "Students Supported" },
              { value: "$1.2M+", label: "Funds Disbursed" },
              { value: "98%", label: "Success Rate" },
              { value: "15", label: "Countries Reached" },
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

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Executive Director",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
                description: "Former education policy advisor with 15 years of experience in international development.",
              },
              {
                name: "Michael Chen",
                role: "Head of Operations",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
                description: "Technology expert focused on building transparent and efficient systems.",
              },
              {
                name: "Amina Patel",
                role: "Partnerships Director",
                image: "https://images.pexels.com/photos/3799115/pexels-photo-3799115.jpeg",
                description: "Experienced in building partnerships with educational institutions globally.",
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
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
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of our global community making education accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
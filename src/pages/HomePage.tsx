import { Link } from 'react-router-dom';
import { GraduationCap, Search, DollarSign, BarChart4, Shield, Users, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 relative">
        {/* Bolt.new Badge */}
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-50 hover:scale-110 transition-transform duration-200"
        >
          <img
            src="/bolt-badge-white-circle.svg"
            alt="Powered by Bolt.new"
            className="h-12 w-12 md:h-16 md:w-16 drop-shadow-lg"
          />
        </a>

        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-xs font-medium text-primary-700">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">+150 donors this month</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-2 mb-6">
                <span className="px-3 py-1 text-sm font-medium bg-white/10 text-white rounded-full">
                  Trusted by 1000+ donors worldwide
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Fund Education. Empower Communities. Build the Future.
              </h1>
              
              <p className="text-xl text-white/90 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" /> Verified
                <span className="mx-3">•</span>
                <DollarSign className="h-5 w-5 mr-2" /> Transparent
                <span className="mx-3">•</span>
                <Users className="h-5 w-5 mr-2" /> Monitored
              </p>
              
              <p className="text-lg text-white/80 mb-8">
                Join our global community of donors making education accessible to those who need it most. Every contribution is tracked, verified, and monitored for maximum impact.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/students">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="w-full sm:w-auto font-semibold"
                    leftIcon={<Search className="h-5 w-5" />}
                  >
                    Browse Beneficiaries
                  </Button>
                </Link>
                
                <Link to="/projects">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20"
                    leftIcon={<BarChart4 className="h-5 w-5" />}
                  >
                    View Projects
                  </Button>
                </Link>
                
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Become a Donor
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$1.2M+</p>
                  <p className="text-sm text-white/80">Funds Disbursed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">1,500+</p>
                  <p className="text-sm text-white/80">Students Supported</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">98%</p>
                  <p className="text-sm text-white/80">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How EduFund Connect Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform ensures transparency and accountability at every step of the educational funding process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <DollarSign className="h-8 w-8 text-primary-500" />,
                title: "Donors Contribute",
                description: "Donors choose specific students or projects to fund with complete visibility into how their money will be used."
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-primary-500" />,
                title: "Funds in Escrow",
                description: "All funds are held in escrow and released in stages only after verification by monitoring agents."
              },
              {
                icon: <Shield className="h-8 w-8 text-primary-500" />,
                title: "Monitoring Agents Verify",
                description: "Independent agents verify fund usage and student progress before each disbursement."
              },
              {
                icon: <BarChart4 className="h-8 w-8 text-primary-500" />,
                title: "Impact Tracking",
                description: "Track the real impact of your contribution through regular updates and progress reports."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="outline">
                Learn More About Our Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Students */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Students</h2>
              <p className="text-gray-600 mt-1">Support these students in achieving their educational goals</p>
            </div>
            <Link to="/students">
              <Button variant="outline">View All Students</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "1",
                name: "Michael Johnson",
                image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg",
                location: "Nairobi, Kenya",
                grade: "Grade 10",
                fundingNeeded: 1200,
                fundingReceived: 450,
                story: "Michael dreams of becoming a doctor to help his community..."
              },
              {
                id: "2",
                name: "Amina Ibrahim",
                image: "https://images.pexels.com/photos/3662628/pexels-photo-3662628.jpeg",
                location: "Accra, Ghana",
                grade: "Grade 8",
                fundingNeeded: 950,
                fundingReceived: 320,
                story: "Amina excels in mathematics and wants to be an engineer..."
              },
              {
                id: "3",
                name: "Raj Patel",
                image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
                location: "Mumbai, India",
                grade: "Grade 11",
                fundingNeeded: 1500,
                fundingReceived: 900,
                story: "Raj is passionate about computer science and developing apps..."
              }
            ].map((student) => (
              <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{student.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span>{student.location}</span>
                    <span className="mx-2">•</span>
                    <span>{student.grade}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{student.story}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Funding Progress</span>
                      <span className="text-primary-600">{`$${student.fundingReceived} / $${student.fundingNeeded}`}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{width: `${(student.fundingReceived / student.fundingNeeded) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <Link to={`/students/${student.id}`}>
                    <Button variant="primary" fullWidth>
                      Sponsor {student.name.split(" ")[0]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Through transparency and accountability, we're making a real difference in students' lives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "250+", label: "Students Supported" },
              { value: "$120K", label: "Funds Disbursed" },
              { value: "98%", label: "Completion Rate" },
              { value: "15", label: "Countries Reached" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-card hover:shadow-md transition-shadow">
                <p className="text-4xl font-bold text-primary-500 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our community about how EduFund Connect has made a difference
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Thanks to the support I received through EduFund Connect, I was able to complete my education and am now studying computer science at university.",
                name: "Grace Mwangi",
                role: "Former Student",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
              },
              {
                quote: "The transparency of this platform gives me confidence that my donations are making a real difference. I can see exactly how my funds are being used.",
                name: "Robert Chen",
                role: "Donor",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              },
              {
                quote: "As a school administrator, EduFund Connect has simplified the process of helping our students receive financial support for their education.",
                name: "Sarah Okafor",
                role: "School Principal",
                image: "https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-4 overflow-hidden rounded-full">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="italic text-gray-700 mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join our community today and help transform education through transparent, accountable funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="font-semibold"
                >
                  Join EduFund Connect
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
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

export default HomePage;
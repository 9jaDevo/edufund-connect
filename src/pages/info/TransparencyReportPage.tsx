import { Link } from 'react-router-dom';
import { 
  BarChart, 
  PieChart, 
  DollarSign, 
  Users, 
  ArrowRight,
  Download,
  CheckCircle,
  Shield
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import PageHero from '../../components/ui/PageHero';

const TransparencyReportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Transparency Report"
        description="Our commitment to complete transparency in educational funding and impact."
        image="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
      />

      {/* Key Metrics */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <DollarSign className="h-8 w-8 text-primary-500" />,
                title: "Total Funds Raised",
                value: "$1.2M",
                change: "+15% from last year",
              },
              {
                icon: <Users className="h-8 w-8 text-primary-500" />,
                title: "Students Supported",
                value: "1,500+",
                change: "+25% from last year",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary-500" />,
                title: "Verification Rate",
                value: "98%",
                change: "Consistent performance",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary-500" />,
                title: "Success Rate",
                value: "92%",
                change: "+5% from last year",
              },
            ].map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                      {metric.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary-600 mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500">{metric.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Fund Allocation
            </h2>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { category: "Direct Educational Expenses", percentage: 70, amount: "$840,000" },
                    { category: "Monitoring & Verification", percentage: 15, amount: "$180,000" },
                    { category: "Local NGO Support", percentage: 10, amount: "$120,000" },
                    { category: "Platform Operations", percentage: 5, amount: "$60,000" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-primary-600">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.percentage}% of total funds
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                variant="outline"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Download Detailed Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Impact Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Academic Performance
                </h3>
                <div className="space-y-4">
                  {[
                    { metric: "Grade Improvement", value: "85%", description: "Students showing grade improvements" },
                    { metric: "Attendance Rate", value: "92%", description: "Average attendance rate" },
                    { metric: "Completion Rate", value: "88%", description: "Program completion rate" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.metric}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Monitoring Effectiveness
                </h3>
                <div className="space-y-4">
                  {[
                    { metric: "Verification Rate", value: "98%", description: "Fund usage verification" },
                    { metric: "Response Time", value: "24h", description: "Average response to inquiries" },
                    { metric: "Documentation", value: "100%", description: "Complete audit trail" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.metric}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Geographic Distribution */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Geographic Distribution
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { region: "East Africa", students: 450, funds: "$360,000" },
              { region: "South Asia", students: 380, funds: "$304,000" },
              { region: "Latin America", students: 290, funds: "$232,000" },
            ].map((region, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {region.region}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Students</span>
                      <span className="font-semibold">{region.students}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Funds Disbursed</span>
                      <span className="font-semibold">{region.funds}</span>
                    </div>
                  </div>
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
              Make a Verified Impact
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of donors and help create more success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/students">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<DollarSign className="h-4 w-4" />}
                >
                  Support a Student
                </Button>
              </Link>
              <Link to="/monitoring-process">
                <Button 
                  variant="outline" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Learn About Monitoring
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransparencyReportPage;
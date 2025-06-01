import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, GraduationCap } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const SuccessStoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-white/90">
              Real stories of students whose lives have been transformed through education funding and support.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-16">
        <div className="container">
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
                  alt="Grace Mwangi"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <Badge variant="success" className="mb-4">Featured Story</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  From Rural Kenya to Medical School
                </h2>
                <p className="text-gray-600 mb-6">
                  Grace Mwangi dreamed of becoming a doctor since childhood. Despite facing significant financial challenges, her determination and the support from EduFund Connect donors helped her complete high school with top grades and secure admission to medical school.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-primary-500 mr-2" />
                    <span>Graduated top of her class</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-primary-500 mr-2" />
                    <span>Received full university scholarship</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-primary-500 mr-2" />
                    <span>Now mentoring other students</span>
                  </div>
                </div>
                <Button variant="primary">Read Full Story</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            More Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "David Nguyen",
                image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
                location: "Vietnam",
                achievement: "Computer Science Graduate",
                story: "From a small village to becoming a software engineer at a leading tech company.",
              },
              {
                name: "Sofia Rodriguez",
                image: "https://images.pexels.com/photos/3662628/pexels-photo-3662628.jpeg",
                location: "Colombia",
                achievement: "Engineering Student",
                story: "Breaking barriers as a first-generation university student in engineering.",
              },
              {
                name: "Raj Patel",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                location: "India",
                achievement: "Medical Resident",
                story: "Pursuing his dream of healthcare while giving back to his community.",
              },
            ].map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 relative">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {story.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">{story.achievement}</p>
                  <p className="text-gray-600 mb-4">{story.story}</p>
                  <Button variant="outline" fullWidth>Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            In Their Own Words
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "The monitoring and support system helped me stay focused and accountable throughout my education journey.",
                name: "Michael Johnson",
                role: "Engineering Graduate",
                image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg"
              },
              {
                quote: "Thanks to the donors and monitoring agents who believed in me, I'm now able to pursue my dreams.",
                name: "Amina Ibrahim",
                role: "Medical Student",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary-500 mb-4" />
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "250+", label: "Success Stories" },
              { value: "85%", label: "University Acceptance" },
              { value: "92%", label: "Completion Rate" },
              { value: "78%", label: "Employment Rate" },
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
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Help Write the Next Success Story
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your support can help transform another student's life through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/students">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<GraduationCap className="h-4 w-4" />}
                >
                  Support a Student
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="outline" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Become a Donor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;
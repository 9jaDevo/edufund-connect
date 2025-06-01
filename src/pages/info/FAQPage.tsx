import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

interface FAQCategory {
  name: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    name: "General",
    questions: [
      {
        question: "What is EduFund Connect?",
        answer: "EduFund Connect is a transparent educational funding platform that connects donors directly with verified students in need. We ensure accountability through independent monitoring and staged fund disbursement."
      },
      {
        question: "How do you verify students?",
        answer: "We partner with local NGOs and educational institutions to verify student identities, academic records, and financial needs. Each student undergoes a thorough verification process before being listed on our platform."
      },
      {
        question: "What percentage of donations goes to students?",
        answer: "85% of donations go directly to student education expenses. The remaining 15% covers monitoring costs and platform maintenance to ensure transparency and accountability."
      }
    ]
  },
  {
    name: "Donors",
    questions: [
      {
        question: "How do I know my donation is being used properly?",
        answer: "We use a staged disbursement system where funds are released only after verification by independent monitoring agents. You receive regular updates and reports on your sponsored student's progress."
      },
      {
        question: "Can I choose specific students to support?",
        answer: "Yes! You can browse student profiles and choose who to support based on their stories, needs, and educational goals."
      },
      {
        question: "Are donations tax-deductible?",
        answer: "Yes, donations are tax-deductible in most countries where we operate. You'll receive a tax receipt for your contributions."
      }
    ]
  },
  {
    name: "Students",
    questions: [
      {
        question: "How can I apply for funding?",
        answer: "Students must be referred through our partner NGOs or educational institutions. These partners help verify student information and needs."
      },
      {
        question: "What expenses are covered?",
        answer: "Funding typically covers tuition fees, educational materials, uniforms, and transportation costs related to education."
      },
      {
        question: "How long does the funding process take?",
        answer: "Once verified and listed on the platform, funding time varies based on donor interest. Most students receive initial funding within 1-3 months."
      }
    ]
  },
  {
    name: "Monitoring",
    questions: [
      {
        question: "How does the monitoring process work?",
        answer: "Independent monitoring agents conduct regular site visits, verify attendance and progress, and document fund utilization. They submit detailed reports before each fund disbursement."
      },
      {
        question: "Who are the monitoring agents?",
        answer: "Our monitoring agents are verified professionals with experience in education and social work. They undergo thorough background checks and training."
      },
      {
        question: "How often are monitoring reports provided?",
        answer: "Monitoring reports are submitted monthly, with comprehensive reviews before each fund disbursement stage."
      }
    ]
  }
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(question)) {
      newExpanded.delete(question);
    } else {
      newExpanded.add(question);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our platform, funding process, and monitoring system.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.name}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <Card
                        key={faqIndex}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => toggleQuestion(faq.question)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-gray-900 pr-8">
                              {faq.question}
                            </h3>
                            {expandedQuestions.has(faq.question) ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </div>
                          
                          {expandedQuestions.has(faq.question) && (
                            <p className="mt-4 text-gray-600">
                              {faq.answer}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No questions found matching your search.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<MessageSquare className="h-4 w-4" />}
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, UserCheck, MapPin, BookOpen, Calendar, DollarSign, History, Plus } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatCurrency } from '../../utils/helpers';

// Mock student data
const mockStudents = [
  {
    id: "1",
    name: "Michael Johnson",
    image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg",
    location: "Nairobi, Kenya",
    school: "Greenwood Academy",
    grade: "Grade 10",
    age: 16,
    fundingNeeded: 1200,
    fundingReceived: 450,
    verified: true,
    story: "Michael dreams of becoming a doctor to help his community. He has consistently been at the top of his class despite facing many challenges at home. His mother is a single parent who works as a cleaner to support their family of four. Michael helps take care of his younger siblings when his mother is at work.\n\nDespite these challenges, Michael has maintained excellent grades, particularly in science subjects. His teachers describe him as hardworking, determined, and compassionate. He volunteers at a local clinic on weekends, gaining valuable experience and insight into his future career.\n\nFunding will help cover Michael's tuition fees, books, uniform, and transportation costs for the next academic year. This support is crucial for him to continue his education and pursue his dream of becoming a doctor.",
    goals: "Complete high school with top grades to qualify for a medical scholarship\nAttend university to study medicine\nReturn to his community as a doctor to improve healthcare access",
    academicRecords: [
      { year: "2022", grade: "A", ranking: "2nd in class", comments: "Excellent performance in sciences" },
      { year: "2021", grade: "A-", ranking: "3rd in class", comments: "Strong improvement in mathematics" },
    ],
    recentUpdates: [
      { date: "2023-03-15", title: "Mid-term exams completed", content: "Michael achieved top scores in Biology and Chemistry" },
      { date: "2023-02-10", title: "Science project award", content: "Won second place in the regional science fair" },
    ]
  },
  // Other students would be here...
];

// Mock funding history
const mockFundingHistory = [
  {
    id: "1",
    donorName: "Sarah Williams",
    amount: 200,
    date: "2023-04-15",
    message: "Keep up the great work Michael! Your dedication is inspiring.",
  },
  {
    id: "2",
    donorName: "James Thompson",
    amount: 150,
    date: "2023-03-20",
    message: "Wishing you all the best in your studies.",
  },
  {
    id: "3",
    donorName: "Anonymous",
    amount: 100,
    date: "2023-02-28",
    message: "",
  },
];

const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any | null>(null);
  const [fundingHistory, setFundingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const { isAuthenticated } = useAuthStore();
  
  const customAmounts = [25, 50, 100, 250];
  
  useEffect(() => {
    // Simulate API call to fetch student data
    const fetchStudent = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundStudent = mockStudents.find(s => s.id === id);
        setStudent(foundStudent || null);
        
        // Fetch funding history
        setFundingHistory(mockFundingHistory);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudent();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!student) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h2>
        <p className="text-gray-600 mb-6">The student you are looking for does not exist or has been removed.</p>
        <Link to="/students">
          <Button variant="primary">Browse Other Students</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section with Student Info */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <Link to="/students" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Students</span>
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-200 mb-4">
                <img 
                  src={student.image} 
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  {student.name}
                  {student.verified && (
                    <Badge variant="success\" className="ml-2 flex items-center">
                      <UserCheck className="h-3 w-3 mr-1" />
                      <span>Verified</span>
                    </Badge>
                  )}
                </h2>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{student.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{student.school} • {student.grade}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Age: {student.age}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Funding Progress</span>
                    <span className="text-primary-600">
                      {formatCurrency(student.fundingReceived)} / {formatCurrency(student.fundingNeeded)}
                    </span>
                  </div>
                  <ProgressBar 
                    value={student.fundingReceived} 
                    max={student.fundingNeeded} 
                    variant="primary"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {Math.round((student.fundingReceived / student.fundingNeeded) * 100)}% of goal
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{student.name}'s Story</h1>
              
              <div className="prose prose-sm max-w-none text-gray-600 mb-6">
                {student.story.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Educational Goals</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-600">
                {student.goals.split('\n').map((goal: string, i: number) => (
                  <li key={i}>{goal}</li>
                ))}
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle as="h4">Academic Record</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.academicRecords.map((record: any, i: number) => (
                        <div key={i} className="flex justify-between pb-2 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="font-medium">{record.year}</p>
                            <p className="text-sm text-gray-600">{record.comments}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary-600">{record.grade}</p>
                            <p className="text-sm text-gray-600">{record.ranking}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle as="h4">Recent Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.recentUpdates.map((update: any, i: number) => (
                        <div key={i} className="pb-2 border-b border-gray-100 last:border-0">
                          <p className="font-medium">{update.title}</p>
                          <p className="text-sm text-gray-600 mb-1">{update.content}</p>
                          <p className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Funding History */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Funding History</h2>
            
            <Card>
              <CardContent className="p-6">
                {fundingHistory.length > 0 ? (
                  <div className="space-y-4">
                    {fundingHistory.map((donation) => (
                      <div key={donation.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <DollarSign className="h-5 w-5 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-gray-900">{donation.donorName}</p>
                            <p className="font-semibold text-primary-600">{formatCurrency(donation.amount)}</p>
                          </div>
                          <p className="text-sm text-gray-500">{new Date(donation.date).toLocaleDateString()}</p>
                          {donation.message && (
                            <p className="text-sm text-gray-600 mt-1 italic">"{donation.message}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <History className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No donations yet</h3>
                    <p className="text-gray-500 mt-1">Be the first to support {student.name}!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Donation Form */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sponsor {student.name.split(" ")[0]}</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-4">
                    Your donation goes into an escrow account and is released in three stages, each verified by a Monitoring Agent.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">1</div>
                      <p className="text-sm text-gray-600">Initial disbursement for enrollment fees (30%)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">2</div>
                      <p className="text-sm text-gray-600">Mid-term disbursement after verification (30%)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">3</div>
                      <p className="text-sm text-gray-600">Final disbursement upon completion (40%)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Donation Amount</label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {customAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          donationAmount === amount
                            ? 'bg-primary-50 text-primary-700 border border-primary-200'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative mt-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      min="5"
                      className="form-input pl-7"
                      placeholder="Other amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message (Optional)</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="form-input"
                    placeholder="Add a personal message to encourage the student..."
                  ></textarea>
                </div>
                
                {isAuthenticated ? (
                  <Button 
                    variant="primary" 
                    fullWidth
                    size="lg"
                    leftIcon={<DollarSign className="h-4 w-4" />}
                  >
                    Donate ${donationAmount}
                  </Button>
                ) : (
                  <>
                    <Link to="/login" className="block mb-2">
                      <Button variant="primary" fullWidth>
                        Log in to donate
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" fullWidth>
                        Create an account
                      </Button>
                    </Link>
                  </>
                )}
                
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                        <span>{String.fromCharCode(65 + i)}</span>
                      </div>
                    ))}
                    <div className="h-6 w-6 rounded-full bg-primary-100 border border-white text-primary-700 flex items-center justify-center text-xs">
                      <Plus className="h-3 w-3" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">15 donors have helped</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
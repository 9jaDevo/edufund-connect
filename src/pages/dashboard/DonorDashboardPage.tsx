import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Users, GraduationCap, BarChart, Calendar, ArrowUpRight, Download, Plus } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { formatCurrency, formatDate } from '../../utils/helpers';

// Mock data for sponsored students
const mockSponsoredStudents = [
  {
    id: "1",
    name: "Michael Johnson",
    image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg",
    location: "Nairobi, Kenya",
    school: "Greenwood Academy",
    grade: "Grade 10",
    fundingAmount: 450,
    startDate: "2023-01-15",
    progress: 70,
    status: "active",
    nextDisbursement: "2023-06-15"
  },
  {
    id: "3",
    name: "Raj Patel",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "Mumbai, India",
    school: "St. Xavier's School",
    grade: "Grade 11",
    fundingAmount: 600,
    startDate: "2022-11-10",
    progress: 85,
    status: "active",
    nextDisbursement: "2023-05-20"
  },
];

// Mock recent transactions
const mockTransactions = [
  {
    id: "tx1",
    type: "donation",
    amount: 250,
    date: "2023-04-10",
    recipient: "Michael Johnson",
    status: "completed"
  },
  {
    id: "tx2",
    type: "donation",
    amount: 200,
    date: "2023-03-15",
    recipient: "Raj Patel",
    status: "completed"
  },
  {
    id: "tx3",
    type: "disbursement",
    amount: 135,
    date: "2023-02-22",
    recipient: "Greenwood Academy (for Michael Johnson)",
    status: "completed"
  },
  {
    id: "tx4",
    type: "monitoring_fee",
    amount: 15,
    date: "2023-02-22",
    recipient: "Jane Monitor (MA)",
    status: "completed"
  }
];

const DonorDashboardPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [sponsoredStudents, setSponsoredStudents] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDonorData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000)),
        ]);
        
        setSponsoredStudents(mockSponsoredStudents);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching donor data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDonorData();
  }, []);
  
  const totalDonated = transactions
    .filter(tx => tx.type === 'donation')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalStudents = sponsoredStudents.length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-white/80">Track your impact and manage your contributions</p>
        </div>
      </div>
      
      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'students'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('students')}
            >
              My Students
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'reports'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              Impact Reports
            </button>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary-100 p-3 mr-4">
                      <DollarSign className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Donated</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDonated)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-secondary-100 p-3 mr-4">
                      <GraduationCap className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Students Supported</p>
                      <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent-100 p-3 mr-4">
                      <Users className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Countries Reached</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-100 p-3 mr-4">
                      <Calendar className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-2xl font-bold text-gray-900">Jan 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Active Sponsorships */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Active Sponsorships</h2>
            
            {sponsoredStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {sponsoredStudents.map((student) => (
                  <Card key={student.id} className="flex overflow-hidden">
                    <img 
                      src={student.image} 
                      alt={student.name}
                      className="h-full w-24 md:w-32 object-cover"
                    />
                    <CardContent className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          <Link to={`/students/${student.id}`} className="text-gray-900 hover:text-primary-600">
                            {student.name}
                          </Link>
                        </h3>
                        <Badge 
                          variant={student.status === "active" ? "success" : "warning"}
                        >
                          {student.status === "active" ? "Active" : "Pending"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {student.school} • {student.grade} • {student.location}
                      </p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Academic Progress</span>
                          <span className="text-primary-600">{student.progress}%</span>
                        </div>
                        <ProgressBar 
                          value={student.progress} 
                          max={100} 
                          size="sm"
                          variant="primary" 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          Next disbursement: {formatDate(student.nextDisbursement)}
                        </span>
                        <span className="font-medium text-primary-600">
                          {formatCurrency(student.fundingAmount)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mb-8">
                <CardContent className="p-8 text-center">
                  <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active sponsorships</h3>
                  <p className="text-gray-500 mb-4">Start making a difference by sponsoring a student today.</p>
                  <Link to="/students">
                    <Button variant="primary">Browse Students</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
            
            {/* Recent Transactions */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipient
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge
                              variant={
                                transaction.type === 'donation'
                                  ? 'primary'
                                  : transaction.type === 'disbursement'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {transaction.type === 'donation'
                                ? 'Donation'
                                : transaction.type === 'disbursement'
                                ? 'Disbursement'
                                : 'Monitoring Fee'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.recipient}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {transaction.type === 'donation'
                              ? formatCurrency(transaction.amount)
                              : `-${formatCurrency(transaction.amount)}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <Badge
                              variant={transaction.status === 'completed' ? 'success' : 'warning'}
                            >
                              {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Sponsored Students</h2>
              <Link to="/students">
                <Button variant="outline" leftIcon={<Plus className="h-4 w-4" />}>
                  Sponsor More Students
                </Button>
              </Link>
            </div>
            
            {sponsoredStudents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {sponsoredStudents.map((student) => (
                  <Card key={student.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 lg:w-1/5">
                        <img 
                          src={student.image} 
                          alt={student.name}
                          className="h-48 md:h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="text-lg font-semibold mr-2">{student.name}</h3>
                              <Badge 
                                variant={student.status === "active" ? "success" : "warning"}
                              >
                                {student.status === "active" ? "Active" : "Pending"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {student.school} • {student.grade} • {student.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              Sponsorship started: {formatDate(student.startDate)}
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 text-right">
                            <p className="text-lg font-bold text-primary-600">
                              {formatCurrency(student.fundingAmount)}
                            </p>
                            <p className="text-sm text-gray-500">Total contribution</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Academic Progress</span>
                            <span className="text-primary-600">{student.progress}%</span>
                          </div>
                          <ProgressBar 
                            value={student.progress} 
                            max={100} 
                            variant="primary" 
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-medium text-gray-900">Next Disbursement</p>
                            <p className="text-sm text-gray-600">{formatDate(student.nextDisbursement)}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-medium text-gray-900">Monitoring Agent</p>
                            <p className="text-sm text-gray-600">John Monitor</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-medium text-gray-900">Latest Report</p>
                            <p className="text-sm text-gray-600">April 5, 2023</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Link to={`/students/${student.id}`}>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            View Reports
                          </Button>
                          <Button variant="primary" size="sm">
                            Add Funds
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active sponsorships</h3>
                  <p className="text-gray-500 mb-4">Start making a difference by sponsoring a student today.</p>
                  <Link to="/students">
                    <Button variant="primary">Browse Students</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">All Transactions</h2>
              <Button 
                variant="outline" 
                leftIcon={<Download className="h-4 w-4" />}
              >
                Export
              </Button>
            </div>
            
            <Card className="mb-8">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="form-label">Date Range</label>
                    <select className="form-input bg-white">
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                      <option>All time</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Type</label>
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Donations</option>
                      <option>Disbursements</option>
                      <option>Monitoring Fees</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Student</label>
                    <select className="form-input bg-white">
                      <option>All Students</option>
                      <option>Michael Johnson</option>
                      <option>Raj Patel</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Status</label>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Failed</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge
                              variant={
                                transaction.type === 'donation'
                                  ? 'primary'
                                  : transaction.type === 'disbursement'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {transaction.type === 'donation'
                                ? 'Donation'
                                : transaction.type === 'disbursement'
                                ? 'Disbursement'
                                : 'Monitoring Fee'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.recipient}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {transaction.type === 'donation'
                              ? formatCurrency(transaction.amount)
                              : `-${formatCurrency(transaction.amount)}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <Badge
                              variant={transaction.status === 'completed' ? 'success' : 'warning'}
                            >
                              {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Impact Reports</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-primary-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Donated</p>
                      <p className="text-xl font-bold text-primary-600">{formatCurrency(totalDonated)}</p>
                    </div>
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-gray-600">Educational Expenses</p>
                      <p className="text-xl font-bold text-secondary-600">{formatCurrency(totalDonated * 0.85)}</p>
                    </div>
                    <div className="p-3 bg-accent-50 rounded-lg">
                      <p className="text-sm text-gray-600">Students Supported</p>
                      <p className="text-xl font-bold text-accent-600">{sponsoredStudents.length}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Monitoring Costs</p>
                      <p className="text-xl font-bold text-gray-600">{formatCurrency(totalDonated * 0.15)}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" fullWidth>
                    Download Impact Summary
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Funding Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tuition & School Fees</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <ProgressBar value={50} max={100} variant="primary" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Books & Learning Materials</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <ProgressBar value={20} max={100} variant="secondary" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uniforms & Clothing</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <ProgressBar value={15} max={100} variant="accent" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monitoring & Administration</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <ProgressBar value={15} max={100} variant="warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Progress Reports</h3>
            
            {sponsoredStudents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {sponsoredStudents.map((student) => (
                  <Card key={student.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center">
                          <img
                            src={student.image}
                            alt={student.name}
                            className="h-12 w-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.school} • {student.grade}</p>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Button variant="outline" size="sm">
                            View Full Report
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Academic Progress</span>
                          <span className="text-primary-600">{student.progress}%</span>
                        </div>
                        <ProgressBar 
                          value={student.progress} 
                          max={100} 
                          variant="primary" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm font-medium text-gray-900">Latest Report</p>
                          <p className="text-sm text-gray-600">April 5, 2023</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm font-medium text-gray-900">Next Disbursement</p>
                          <p className="text-sm text-gray-600">{formatDate(student.nextDisbursement)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm font-medium text-gray-900">Monitoring Status</p>
                          <Badge variant="success">Verified</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reports available yet</h3>
                  <p className="text-gray-500">Reports will appear once you've sponsored students.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboardPage;
import { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Building, 
  UserCheck, 
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Plus,
  Filter
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for pending verifications
  const pendingVerifications = [
    { id: 1, name: "Sofia Rodriguez", type: "student", date: "2023-04-15", status: "pending" },
    { id: 2, name: "Global Education Trust", type: "ngo", date: "2023-04-14", status: "pending" },
    { id: 3, name: "Sunrise Academy", type: "school", date: "2023-04-12", status: "pending" },
    { id: 4, name: "John Smith", type: "monitoring_agent", date: "2023-04-10", status: "pending" },
  ];
  
  // Mock data for recent disbursements
  const recentDisbursements = [
    { 
      id: 1, 
      student: "Michael Johnson", 
      school: "Greenwood Academy",
      donor: "Sarah Williams",
      amount: 180, 
      batch: 1,
      date: "2023-04-08", 
      status: "approved" 
    },
    { 
      id: 2, 
      student: "Raj Patel", 
      school: "St. Xavier's School",
      donor: "James Thompson",
      amount: 240, 
      batch: 2,
      date: "2023-04-07", 
      status: "pending" 
    },
    { 
      id: 3, 
      student: "Amina Ibrahim", 
      school: "Sunrise College",
      donor: "Robert Chen",
      amount: 150, 
      batch: 1,
      date: "2023-04-05", 
      status: "approved" 
    },
    { 
      id: 4, 
      student: "David Nguyen", 
      school: "Hanoi International School",
      donor: "Maria Lopez",
      amount: 200, 
      batch: 3,
      date: "2023-04-03", 
      status: "rejected" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/80">Manage users, funds, and platform operations</p>
        </div>
      </div>
      
      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'Users' },
              { id: 'verifications', label: 'Verifications' },
              { id: 'funds', label: 'Fund Management' },
              { id: 'reports', label: 'Monitoring Reports' },
              { id: 'settings', label: 'Platform Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
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
                      <Users className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">253</p>
                      <p className="text-xs text-green-500">+12% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-secondary-100 p-3 mr-4">
                      <DollarSign className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Funds</p>
                      <p className="text-2xl font-bold text-gray-900">$28,650</p>
                      <p className="text-xs text-green-500">+8% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent-100 p-3 mr-4">
                      <CheckCircle className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verified Users</p>
                      <p className="text-2xl font-bold text-gray-900">189</p>
                      <p className="text-xs text-green-500">75% of total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-warning-100 p-3 mr-4">
                      <Clock className="h-6 w-6 text-warning-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Verifications</p>
                      <p className="text-2xl font-bold text-gray-900">16</p>
                      <p className="text-xs text-error-500">Action required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-primary-500" />
                          <span className="text-gray-700">Students</span>
                        </div>
                        <span className="font-medium">92</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">35% of users</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-secondary-500" />
                          <span className="text-gray-700">Donors</span>
                        </div>
                        <span className="font-medium">115</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">45% of users</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-accent-500" />
                          <span className="text-gray-700">Schools</span>
                        </div>
                        <span className="font-medium">28</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">10% of users</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <UserCheck className="h-4 w-4 mr-2 text-error-500" />
                          <span className="text-gray-700">Monitoring Agents</span>
                        </div>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-error-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">10% of users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fund Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">Active in Escrow</span>
                        <span className="font-medium">$15,200</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">55% of total funds</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">Disbursed</span>
                        <span className="font-medium">$9,800</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">35% of total funds</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">Monitoring Fees</span>
                        <span className="font-medium">$2,450</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">10% of total funds</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-500">Avg. Funding</p>
                        <p className="font-semibold">$850 / student</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-500">Completion Rate</p>
                        <p className="font-semibold">92%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Pending Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Pending Verifications */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Pending Verifications</CardTitle>
                    <Badge variant="warning">{pendingVerifications.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    {pendingVerifications.length > 0 ? (
                      pendingVerifications.map((item) => (
                        <li key={item.id} className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Badge 
                                  variant="outline" 
                                  className="mr-2 capitalize"
                                >
                                  {item.type.replace('_', ' ')}
                                </Badge>
                                <span>Requested on {new Date(item.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Review</Button>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="px-6 py-8 text-center">
                        <p className="text-gray-500">No pending verifications</p>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Recent Disbursements */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Disbursements</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    {recentDisbursements.length > 0 ? (
                      recentDisbursements.map((item) => (
                        <li key={item.id} className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{item.student}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                                <span className="mr-2">{item.school}</span>
                                <span>Batch {item.batch} • ${item.amount}</span>
                              </div>
                            </div>
                            <div>
                              <Badge 
                                variant={
                                  item.status === 'approved' 
                                    ? 'success' 
                                    : item.status === 'pending' 
                                    ? 'warning' 
                                    : 'error'
                                }
                              >
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="px-6 py-8 text-center">
                        <p className="text-gray-500">No recent disbursements</p>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        
        {activeTab === 'verifications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Verifications</h2>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Students</option>
                      <option>Schools</option>
                      <option>NGOs</option>
                      <option>Monitoring Agents</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      leftIcon={<Filter className="h-4 w-4" />}
                    >
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
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
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted On
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingVerifications.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">ID: {item.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={
                                item.type === 'student'
                                  ? 'primary'
                                  : item.type === 'ngo'
                                  ? 'secondary'
                                  : item.type === 'school'
                                  ? 'accent'
                                  : 'outline'
                              }
                              className="capitalize"
                            >
                              {item.type.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                item.status === 'approved'
                                  ? 'success'
                                  : item.status === 'pending'
                                  ? 'warning'
                                  : 'error'
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Review
                              </Button>
                              <Button variant="success" size="sm">
                                Approve
                              </Button>
                              <Button variant="error" size="sm">
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-right">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
                    </p>
                    <nav className="inline-flex rounded-md shadow-sm">
                      <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                        1
                      </button>
                      <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
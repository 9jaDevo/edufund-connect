import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  School, 
  FileCheck, 
  DollarSign,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  MapPin,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const NGODashboardPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for projects
  const projects = [
    {
      id: "1",
      title: "Computer Lab for Greenwood Academy",
      location: "Nairobi, Kenya",
      budget: 15000,
      raised: 12000,
      beneficiaries: 200,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      progress: 65
    },
    {
      id: "2",
      title: "Library Renovation Project",
      location: "Mombasa, Kenya",
      budget: 8000,
      raised: 3000,
      beneficiaries: 150,
      status: "pending",
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      progress: 25
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">NGO Dashboard</h1>
          <p className="text-white/80">Manage your projects and student beneficiaries</p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Projects' },
              { id: 'students', label: 'Students' },
              { id: 'reports', label: 'Reports' },
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
                      <School className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Projects</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                      <p className="text-xs text-green-500">+2 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-secondary-100 p-3 mr-4">
                      <Users className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Students Supported</p>
                      <p className="text-2xl font-bold text-gray-900">350</p>
                      <p className="text-xs text-green-500">+45 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent-100 p-3 mr-4">
                      <DollarSign className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Funding</p>
                      <p className="text-2xl font-bold text-gray-900">$125K</p>
                      <p className="text-xs text-green-500">92% success rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-warning-100 p-3 mr-4">
                      <FileCheck className="h-6 w-6 text-warning-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">95%</p>
                      <p className="text-xs text-green-500">Above target</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Projects */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                <Link to="/projects/new">
                  <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                    New Project
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {project.location}
                          </div>
                        </div>
                        <Badge
                          variant={project.status === 'active' ? 'success' : 'warning'}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Progress</span>
                            <span>${project.raised} / ${project.budget}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${(project.raised / project.budget) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Beneficiaries: {project.beneficiaries}</span>
                          <span className="text-gray-600">{project.progress}% complete</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="primary" size="sm">Update Status</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      type: 'project',
                      title: 'Computer Lab Project Phase 1 Completed',
                      date: '2024-01-15',
                      status: 'success'
                    },
                    {
                      type: 'funding',
                      title: 'New Donation Received for Library Project',
                      date: '2024-01-12',
                      status: 'info'
                    },
                    {
                      type: 'report',
                      title: 'Monthly Progress Report Submitted',
                      date: '2024-01-10',
                      status: 'success'
                    }
                  ].map((update, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {update.type === 'project' ? (
                          <School className="h-5 w-5 text-primary-500" />
                        ) : update.type === 'funding' ? (
                          <DollarSign className="h-5 w-5 text-secondary-500" />
                        ) : (
                          <FileCheck className="h-5 w-5 text-accent-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{update.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(update.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default NGODashboardPage;
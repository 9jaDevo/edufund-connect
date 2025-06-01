import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  MapPin, 
  Users, 
  FileCheck,
  Camera,
  AlertCircle,
  Upload,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { uploadMonitoringPhoto } from '../../services/fileUpload';
import { showToast } from '../../components/ui/Toast';
import { socket } from '../../lib/socket';

const MADashboardPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for assigned projects
  const assignedProjects = [
    {
      id: "1",
      name: "Greenwood Academy Computer Lab",
      location: "Nairobi, Kenya",
      type: "Infrastructure",
      nextVisit: "2024-03-15",
      status: "ongoing",
      progress: 65
    },
    {
      id: "2",
      name: "St. Mary's School Library",
      location: "Mombasa, Kenya",
      type: "Education",
      nextVisit: "2024-03-20",
      status: "pending",
      progress: 0
    }
  ];

  // Mock data for recent reports
  const recentReports = [
    {
      id: "1",
      projectName: "Greenwood Academy Computer Lab",
      date: "2024-02-28",
      type: "Site Visit",
      status: "completed",
      findings: "Construction progressing as planned. All materials verified."
    },
    {
      id: "2",
      projectName: "St. Mary's School Library",
      date: "2024-02-25",
      type: "Document Review",
      status: "pending_review",
      findings: "Awaiting final approval from NGO partner."
    }
  ];

  useEffect(() => {
    if (user) {
      // Connect to WebSocket
      socket.connect();
      
      // Listen for new notifications
      socket.on('notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
        showToast.info(notification.message);
      });

      // Cleanup
      return () => {
        socket.off('notification');
        socket.disconnect();
      };
    }
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const photoUrl = await uploadMonitoringPhoto(file, 'report-1');
      showToast.success('Photo uploaded successfully');
      // Update report with photo URL
    } catch (error) {
      showToast.error('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">Monitoring Agent Dashboard</h1>
          <p className="text-white/80">Track and verify project progress</p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Assigned Projects' },
              { id: 'reports', label: 'Reports' },
              { id: 'schedule', label: 'Schedule' },
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
                      <ClipboardList className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Projects</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                      <p className="text-xs text-green-500">All on track</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-secondary-100 p-3 mr-4">
                      <FileCheck className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reports Submitted</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                      <p className="text-xs text-green-500">This month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent-100 p-3 mr-4">
                      <MapPin className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Site Visits</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-xs text-green-500">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-warning-100 p-3 mr-4">
                      <AlertCircle className="h-6 w-6 text-warning-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <p className="text-xs text-warning-500">Action needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assigned Projects */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Assigned Projects</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignedProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {project.location}
                          </div>
                        </div>
                        <Badge
                          variant={project.status === 'ongoing' ? 'success' : 'warning'}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Next Visit:</span>
                          <span className="font-medium">{project.nextVisit}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="primary" size="sm">Submit Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reports</h2>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Project
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
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
                        {recentReports.map((report) => (
                          <tr key={report.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{report.projectName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{report.type}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={report.status === 'completed' ? 'success' : 'warning'}
                              >
                                {report.status.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <label className="relative">
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<Camera className="h-4 w-4" />}
                                  >
                                    Add Photos
                                  </Button>
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === 'projects' && (
          <div>
            {/* Project Search and Filters */}
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
                        placeholder="Search projects..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Infrastructure</option>
                      <option>Education</option>
                      <option>Technology</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Ongoing</option>
                      <option>Pending</option>
                      <option>Completed</option>
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

            {/* Projects List */}
            <div className="grid grid-cols-1 gap-6">
              {assignedProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge
                          variant={project.status === 'ongoing' ? 'success' : 'warning'}
                          className="mb-2 md:mb-0 md:ml-2"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Project Type</p>
                        <p className="text-sm text-gray-600">{project.type}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Next Visit</p>
                        <p className="text-sm text-gray-600">{project.nextVisit}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Progress</p>
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{project.progress}% complete</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button variant="outline">View Details</Button>
                      <Button variant="outline" leftIcon={<Camera className="h-4 w-4" />}>
                        Upload Photos
                      </Button>
                      <Button variant="primary">Submit Report</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            {/* Report Filters */}
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
                        placeholder="Search reports..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Site Visit</option>
                      <option>Document Review</option>
                      <option>Progress Update</option>
                    </select>
                    <Button variant="primary">New Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Findings
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentReports.map((report) => (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.projectName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {report.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{report.type}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={report.status === 'completed' ? 'success' : 'warning'}
                            >
                              {report.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600 line-clamp-2">{report.findings}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">View</Button>
                              <label className="relative">
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  leftIcon={<Upload className="h-4 w-4" />}
                                >
                                  Upload
                                </Button>
                              </label>
                            </div>
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

        {activeTab === 'schedule' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Visit Schedule</h2>
              <Button variant="primary" leftIcon={<Calendar className="h-4 w-4" />}>
                Schedule Visit
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignedProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.location}</p>
                        </div>
                        <Badge variant="outline">{project.type}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Next Visit: {project.nextVisit}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="primary" size="sm">Start Visit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MADashboardPage;
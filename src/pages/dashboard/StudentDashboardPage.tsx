import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  GraduationCap, 
  School, 
  User,
  DollarSign,
  Bell,
  Settings,
  Download,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const StudentDashboardPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for student profile
  const studentProfile = {
    school: "Greenwood Academy",
    grade: "Grade 10",
    enrollmentDate: "2023-09-01",
    fundingNeeded: 1200,
    fundingReceived: 450,
    academicProgress: 75,
    nextDisbursement: "2024-01-15",
    attendance: 95,
    subjects: [
      { name: "Mathematics", grade: "A", progress: 85, lastTest: 92 },
      { name: "Science", grade: "A-", progress: 82, lastTest: 88 },
      { name: "English", grade: "B+", progress: 78, lastTest: 85 },
      { name: "History", grade: "A", progress: 90, lastTest: 95 }
    ],
    upcomingEvents: [
      { date: "2024-01-15", title: "Second Term Fees Due", type: "payment" },
      { date: "2024-01-20", title: "Progress Report Submission", type: "academic" },
      { date: "2024-02-01", title: "Parent-Teacher Meeting", type: "meeting" }
    ],
    recentUpdates: [
      { date: "2023-12-15", title: "First Term Report Submitted", type: "academic" },
      { date: "2023-12-10", title: "Funding Disbursement Received", type: "funding" },
      { date: "2023-12-01", title: "Attendance Report Updated", type: "attendance" }
    ],
    documents: [
      { name: "First Term Report Card", date: "2023-12-15", type: "report" },
      { name: "Attendance Certificate", date: "2023-12-01", type: "certificate" },
      { name: "School ID Card", date: "2023-09-01", type: "identification" }
    ],
    notifications: [
      { 
        id: 1,
        title: "Upcoming Disbursement",
        message: "Your next funding disbursement is scheduled for January 15th",
        type: "info",
        date: "2024-01-10"
      },
      {
        id: 2,
        title: "Document Required",
        message: "Please upload your latest progress report",
        type: "warning",
        date: "2024-01-08"
      },
      {
        id: 3,
        title: "Achievement Unlocked",
        message: "Congratulations on maintaining above 90% attendance!",
        type: "success",
        date: "2024-01-05"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}</h1>
          <p className="text-white/80">Track your academic progress and funding status</p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'academics', label: 'Academics' },
              { id: 'funding', label: 'Funding' },
              { id: 'documents', label: 'Documents' },
              { id: 'notifications', label: 'Notifications' },
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
                      <p className="text-sm font-medium text-gray-500">School</p>
                      <p className="text-lg font-bold text-gray-900">{studentProfile.school}</p>
                      <p className="text-xs text-gray-500">{studentProfile.grade}</p>
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
                      <p className="text-sm font-medium text-gray-500">Academic Progress</p>
                      <p className="text-lg font-bold text-gray-900">{studentProfile.academicProgress}%</p>
                      <p className="text-xs text-green-500">On track</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent-100 p-3 mr-4">
                      <User className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Attendance</p>
                      <p className="text-lg font-bold text-gray-900">{studentProfile.attendance}%</p>
                      <p className="text-xs text-green-500">Above target</p>
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
                      <p className="text-sm font-medium text-gray-500">Next Disbursement</p>
                      <p className="text-lg font-bold text-gray-900">Jan 15</p>
                      <p className="text-xs text-warning-500">In 15 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Funding Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Funding Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Total Progress</span>
                    <span className="text-primary-600">
                      ${studentProfile.fundingReceived} / ${studentProfile.fundingNeeded}
                    </span>
                  </div>
                  <ProgressBar
                    value={studentProfile.fundingReceived}
                    max={studentProfile.fundingNeeded}
                    variant="primary"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {Math.round((studentProfile.fundingReceived / studentProfile.fundingNeeded) * 100)}% of total funding received
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Next Disbursement</p>
                    <p className="text-sm text-gray-600">{new Date(studentProfile.nextDisbursement).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Monitoring Status</p>
                    <Badge variant="success">Verified</Badge>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Last Report</p>
                    <p className="text-sm text-gray-600">December 15, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {studentProfile.subjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <span className="font-medium">{subject.name}</span>
                            <span className="text-sm text-gray-500 ml-2">Last Test: {subject.lastTest}%</span>
                          </div>
                          <span className="text-primary-600">{subject.grade}</span>
                        </div>
                        <ProgressBar
                          value={subject.progress}
                          max={100}
                          variant="primary"
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {studentProfile.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === 'academics' && (
          <div className="space-y-8">
            {/* Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Subject Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Subject Details</h3>
                    <div className="space-y-6">
                      {studentProfile.subjects.map((subject, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{subject.name}</h4>
                            <Badge variant={subject.grade.startsWith('A') ? 'success' : 'primary'}>
                              {subject.grade}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Overall Progress</span>
                                <span className="text-primary-600">{subject.progress}%</span>
                              </div>
                              <ProgressBar value={subject.progress} max={100} variant="primary" size="sm" />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Last Test Score</span>
                              <span className="font-medium">{subject.lastTest}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Attendance Rate</p>
                        <div className="flex items-center mt-2">
                          <div className="flex-1">
                            <ProgressBar value={studentProfile.attendance} max={100} variant="success" />
                          </div>
                          <span className="ml-4 font-medium">{studentProfile.attendance}%</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Class Participation</p>
                        <div className="flex items-center mt-2">
                          <div className="flex-1">
                            <ProgressBar value={85} max={100} variant="primary" />
                          </div>
                          <span className="ml-4 font-medium">85%</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Assignment Completion</p>
                        <div className="flex items-center mt-2">
                          <div className="flex-1">
                            <ProgressBar value={92} max={100} variant="accent" />
                          </div>
                          <span className="ml-4 font-medium">92%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button variant="outline" fullWidth leftIcon={<Download className="h-4 w-4" />}>
                        Download Full Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {studentProfile.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge variant={
                        event.type === 'payment' 
                          ? 'warning' 
                          : event.type === 'academic' 
                          ? 'primary' 
                          : 'secondary'
                      }>
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'funding' && (
          <div className="space-y-8">
            {/* Current Funding Status */}
            <Card>
              <CardHeader>
                <CardTitle>Current Funding Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Funding Overview</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Total Funding Progress</span>
                          <span className="text-primary-600">
                            ${studentProfile.fundingReceived} / ${studentProfile.fundingNeeded}
                          </span>
                        </div>
                        <ProgressBar
                          value={studentProfile.fundingReceived}
                          max={studentProfile.fundingNeeded}
                          variant="primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Received</p>
                          <p className="text-xl font-bold text-primary-600">
                            ${studentProfile.fundingReceived}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Remaining</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${studentProfile.fundingNeeded - studentProfile.fundingReceived}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Next Disbursement</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Scheduled Date</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(studentProfile.nextDisbursement).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Amount</span>
                          <span className="font-medium">$150</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Purpose</span>
                          <span className="font-medium">Term 2 Fees</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status</span>
                          <span className="font-medium">Verification in Progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding History */}
            <Card>
              <CardHeader>
                <CardTitle>Funding History</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      date: '2023-12-10',
                      amount: 150,
                      purpose: 'Term 1 Fees',
                      status: 'completed',
                      donor: 'Anonymous'
                    },
                    {
                      date: '2023-11-15',
                      amount: 200,
                      purpose: 'Books and Supplies',
                      status: 'completed',
                      donor: 'John Smith'
                    },
                    {
                      date: '2023-10-01',
                      amount: 100,
                      purpose: 'Uniform',
                      status: 'completed',
                      donor: 'Sarah Wilson'
                    }
                  ].map((disbursement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">${disbursement.amount}</p>
                          <p className="text-sm text-gray-500">{disbursement.purpose}</p>
                          <p className="text-xs text-gray-500">From: {disbursement.donor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="success">Completed</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(disbursement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-8">
            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                  <Button variant="outline" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Library */}
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {studentProfile.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-8">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Notification Settings</CardTitle>
                  <Button variant="outline" size="sm" leftIcon={<Settings className="h-4 w-4" />}>
                    Configure
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Email Notifications', enabled: true },
                    { title: 'SMS Alerts', enabled: false },
                    { title: 'App Notifications', enabled: true },
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{setting.title}</span>
                      <Badge variant={setting.enabled ? 'success' : 'secondary'}>
                        {setting.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {studentProfile.notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {notification.type === 'success' ? (
                          <CheckCircle className="h-6 w-6 text-success-500" />
                        ) : notification.type === 'warning' ? (
                          <AlertCircle className="h-6 w-6 text-warning-500" />
                        ) : (
                          <Bell className="h-6 w-6 text-primary-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                        </div>
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

export default StudentDashboardPage;
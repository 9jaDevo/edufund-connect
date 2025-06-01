import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, FileText, GraduationCap, School, User } from 'lucide-react';
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
      { name: "Mathematics", grade: "A", progress: 85 },
      { name: "Science", grade: "A-", progress: 82 },
      { name: "English", grade: "B+", progress: 78 },
      { name: "History", grade: "A", progress: 90 }
    ],
    upcomingEvents: [
      { date: "2024-01-15", title: "Second Term Fees Due" },
      { date: "2024-01-20", title: "Progress Report Submission" },
      { date: "2024-02-01", title: "Parent-Teacher Meeting" }
    ],
    recentUpdates: [
      { date: "2023-12-15", title: "First Term Report Submitted", type: "academic" },
      { date: "2023-12-10", title: "Funding Disbursement Received", type: "funding" },
      { date: "2023-12-01", title: "Attendance Report Updated", type: "attendance" }
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
              { id: 'profile', label: 'Profile' },
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
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{subject.name}</span>
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

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Updates</CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {studentProfile.recentUpdates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {update.type === 'academic' ? (
                          <BookOpen className="h-5 w-5 text-primary-500" />
                        ) : update.type === 'funding' ? (
                          <GraduationCap className="h-5 w-5 text-secondary-500" />
                        ) : (
                          <FileText className="h-5 w-5 text-accent-500" />
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

export default StudentDashboardPage;
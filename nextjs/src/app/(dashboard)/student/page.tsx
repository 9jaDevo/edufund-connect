import { BookOpen, Users, Award, TrendingUp, Calendar, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function StudentDashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your academic progress and sponsorship</p>
        </div>
        <Button variant="primary" leftIcon={<FileText className="h-4 w-4" />}>
          Submit Progress Report
        </Button>
      </div>

      {/* Profile Completion Banner */}
      <Card className="mb-8 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Complete Your Profile</h3>
              <p className="text-sm text-gray-600">
                Add more information to increase your chances of getting sponsored
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">65%</p>
                <p className="text-xs text-gray-600">Complete</p>
              </div>
              <Button variant="primary">Update Profile</Button>
            </div>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2 mt-4">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <Users className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Sponsors</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-xs text-green-500">Supporting you</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-accent-100 p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Support</p>
                <p className="text-2xl font-bold text-gray-900">$3,450</p>
                <p className="text-xs text-green-500">This year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary-100 p-3 mr-4">
                <BookOpen className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current GPA</p>
                <p className="text-2xl font-bold text-gray-900">3.7</p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <Award className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-green-500">Milestones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">Fall Semester 2024</h4>
                      <p className="text-sm text-gray-600">Computer Science</p>
                    </div>
                    <Badge variant="success">In Progress</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data Structures</span>
                      <span className="font-medium">A</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Algorithms</span>
                      <span className="font-medium">A-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Database Systems</span>
                      <span className="font-medium">B+</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Web Development</span>
                      <span className="font-medium">A</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Spring Semester 2024</h4>
                      <p className="text-sm text-gray-600">Computer Science</p>
                    </div>
                    <Badge variant="default">Completed</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Semester GPA</span>
                    <span className="font-medium">3.8</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="rounded-full bg-success-100 p-2">
                    <FileText className="h-4 w-4 text-success-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Progress report submitted</p>
                    <p className="text-xs text-gray-500">Mid-term update for Fall 2024</p>
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="rounded-full bg-accent-100 p-2">
                    <Award className="h-4 w-4 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Achievement unlocked</p>
                    <p className="text-xs text-gray-500">Dean's List - Spring 2024</p>
                  </div>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="rounded-full bg-primary-100 p-2">
                    <Users className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New message from sponsor</p>
                    <p className="text-xs text-gray-500">John D. sent you an encouragement message</p>
                  </div>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Your Sponsors */}
          <Card>
            <CardHeader>
              <CardTitle>Your Sponsors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    JD
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">John Doe</p>
                    <p className="text-xs text-gray-600">Supporting since Jan 2024</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 font-semibold">
                    MS
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Maria Silva</p>
                    <p className="text-xs text-gray-600">Supporting since Mar 2024</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" fullWidth className="mt-4">
                Send Thank You Message
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-warning-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Progress Report</p>
                    <p className="text-xs text-gray-600">Due in 5 days</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-error-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Final Exams</p>
                    <p className="text-xs text-gray-600">Due in 2 weeks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Semester Review</p>
                    <p className="text-xs text-gray-600">Due in 1 month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" fullWidth>
                Update Grades
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                Upload Documents
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                View Financial Aid
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

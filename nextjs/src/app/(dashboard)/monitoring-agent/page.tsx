import { MapPin, ClipboardCheck, Camera, Star, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default function MonitoringAgentDashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoring Agent Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your assignments and submit reports</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-warning-500 fill-warning-500" />
              <span className="text-2xl font-bold">4.8</span>
            </div>
            <p className="text-xs text-gray-600">Your Rating</p>
          </div>
          <div className="h-12 w-px bg-gray-300"></div>
          <div className="text-right">
            <Badge variant="warning" className="text-lg px-3 py-1">
              Gold
            </Badge>
            <p className="text-xs text-gray-600 mt-1">Badge Level</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <ClipboardCheck className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
                <p className="text-xs text-green-500">3 pending</p>
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
                <p className="text-sm font-medium text-gray-500">Active Assignments</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-green-500">In your area</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary-100 p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$2,350</p>
                <p className="text-xs text-green-500">This month</p>
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
                <p className="text-sm font-medium text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Assignments */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Assignments</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Computer Lab - Greenwood School</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Nairobi, Kenya · 12 km away</p>
                </div>
                <Badge variant="warning">Mid-term Due</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Report Type</span>
                  <span className="font-medium">Mid-term Report</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-medium text-warning-600">3 days</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium">$150</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Required Items:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Photos</Badge>
                    <Badge variant="outline">GPS Location</Badge>
                    <Badge variant="outline">Progress Report</Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" fullWidth>
                    View Details
                  </Button>
                  <Button variant="primary" size="sm" fullWidth leftIcon={<Camera className="h-4 w-4" />}>
                    Submit Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Borehole Water Project</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Kampala, Uganda · 8 km away</p>
                </div>
                <Badge variant="success">On Track</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Report Type</span>
                  <span className="font-medium">Final Report</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-medium text-success-600">14 days</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium">$200</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Required Items:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Photos</Badge>
                    <Badge variant="outline">GPS Location</Badge>
                    <Badge variant="outline">Final Assessment</Badge>
                    <Badge variant="outline">Beneficiary Interviews</Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" fullWidth>
                    View Details
                  </Button>
                  <Button variant="primary" size="sm" fullWidth leftIcon={<Camera className="h-4 w-4" />}>
                    Submit Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="rounded-full bg-success-100 p-2">
                    <ClipboardCheck className="h-5 w-5 text-success-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium">Pre-implementation Report</h4>
                        <p className="text-sm text-gray-600">Scholarship Fund - 5 Students</p>
                      </div>
                      <Badge variant="success">Approved</Badge>
                    </div>
                    <p className="text-xs text-gray-500">Submitted 2 days ago · Payment received</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="rounded-full bg-warning-100 p-2">
                    <ClipboardCheck className="h-5 w-5 text-warning-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium">Mid-term Report</h4>
                        <p className="text-sm text-gray-600">Teacher Training Initiative</p>
                      </div>
                      <Badge variant="warning">Under Review</Badge>
                    </div>
                    <p className="text-xs text-gray-500">Submitted 1 week ago · Pending approval</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="rounded-full bg-success-100 p-2">
                    <ClipboardCheck className="h-5 w-5 text-success-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium">Final Report</h4>
                        <p className="text-sm text-gray-600">Library Construction Project</p>
                      </div>
                      <Badge variant="success">Approved</Badge>
                    </div>
                    <p className="text-xs text-gray-500">Submitted 2 weeks ago · Payment received</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Badge Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <Award className="h-16 w-16 text-warning-500 mx-auto mb-2" />
                  <Badge variant="warning" className="text-base px-4 py-1">
                    Gold Badge
                  </Badge>
                  <p className="text-xs text-gray-600 mt-2">Achieved after 40 successful reports</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reports to Platinum</span>
                    <span className="font-medium">13 more</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-warning-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <p>✓ Bronze: 10 reports</p>
                  <p>✓ Silver: 25 reports</p>
                  <p>✓ Gold: 40 reports</p>
                  <p>□ Platinum: 60 reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>New Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">School Renovation</p>
                    <Badge variant="primary">$180</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Lagos, Nigeria · 15 km</p>
                </div>

                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">Student Sponsorship</p>
                    <Badge variant="primary">$120</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Nairobi, Kenya · 8 km</p>
                </div>
              </div>

              <Button variant="outline" size="sm" fullWidth className="mt-4">
                View All Available
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reports Submitted</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Approval Rate</span>
                <span className="font-medium text-success-600">100%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Response Time</span>
                <span className="font-medium">2.3 days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Shield, Users, FolderOpen, AlertCircle, CheckCircle, XCircle, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="error" className="px-3 py-1">
            5 Pending Verifications
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <Users className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-xs text-green-500">+23 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-accent-100 p-3 mr-4">
                <FolderOpen className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-xs text-green-500">12 pending review</p>
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
                <p className="text-2xl font-bold text-gray-900">$456K</p>
                <p className="text-xs text-green-500">+$45K this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <Shield className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Platform Health</p>
                <p className="text-2xl font-bold text-gray-900">97%</p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-warning-200 bg-warning-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning-600" />
                <CardTitle className="text-lg">User Verifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 mb-2">5</p>
              <p className="text-sm text-gray-600 mb-4">NGOs and Monitoring Agents awaiting approval</p>
              <Button variant="primary" size="sm" fullWidth>
                Review Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-error-200 bg-error-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-error-600" />
                <CardTitle className="text-lg">Project Reviews</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 mb-2">12</p>
              <p className="text-sm text-gray-600 mb-4">New projects pending approval</p>
              <Button variant="primary" size="sm" fullWidth>
                Review Projects
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary-200 bg-primary-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary-600" />
                <CardTitle className="text-lg">Fund Disbursements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 mb-2">8</p>
              <p className="text-sm text-gray-600 mb-4">Milestone completions awaiting release</p>
              <Button variant="primary" size="sm" fullWidth>
                Process Disbursements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent User Registrations */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent User Registrations</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    HF
                  </div>
                  <div>
                    <p className="font-medium text-sm">Hope Foundation</p>
                    <p className="text-xs text-gray-600">NGO · Kenya</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <CheckCircle className="h-4 w-4 text-success-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <XCircle className="h-4 w-4 text-error-600" />
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 font-semibold">
                    JK
                  </div>
                  <div>
                    <p className="font-medium text-sm">James Kimani</p>
                    <p className="text-xs text-gray-600">Monitoring Agent · Nairobi</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <CheckCircle className="h-4 w-4 text-success-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <XCircle className="h-4 w-4 text-error-600" />
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-semibold">
                    AM
                  </div>
                  <div>
                    <p className="font-medium text-sm">Amina Mohammed</p>
                    <p className="text-xs text-gray-600">Student · University of Lagos</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <Badge variant="success">Approved</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Project Submissions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Project Submissions</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">Computer Lab Expansion</p>
                    <p className="text-xs text-gray-600">by Education First NGO</p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-3">
                  <span>Budget: $15,000</span>
                  <span>Beneficiaries: 200</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="success" size="sm" fullWidth>
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" fullWidth>
                    Review
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">Clean Water Initiative</p>
                    <p className="text-xs text-gray-600">by Water For All</p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-3">
                  <span>Budget: $25,000</span>
                  <span>Beneficiaries: 1,000</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="success" size="sm" fullWidth>
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" fullWidth>
                    Review
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">Scholarship Program 2024</p>
                    <p className="text-xs text-gray-600">by Hope Foundation</p>
                  </div>
                  <Badge variant="success">Approved</Badge>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Budget: $50,000</span>
                  <span>Beneficiaries: 50</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Statistics */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">New Donors</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FolderOpen className="h-8 w-8 text-accent-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-600">New Projects</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="h-8 w-8 text-secondary-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">$127K</p>
                <p className="text-sm text-gray-600">Total Donations</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-success-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

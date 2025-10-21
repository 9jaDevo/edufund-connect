import Link from 'next/link'
import { Plus, FolderOpen, DollarSign, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default function NGODashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your projects and track funding</p>
        </div>
        <Link href="/ngo/projects/new">
          <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            Create Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <FolderOpen className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-500">3 active</p>
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
                <p className="text-sm font-medium text-gray-500">Funds Raised</p>
                <p className="text-2xl font-bold text-gray-900">$45,230</p>
                <p className="text-xs text-green-500">+$2,500 this month</p>
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
                <p className="text-sm font-medium text-gray-500">Beneficiaries</p>
                <p className="text-2xl font-bold text-gray-900">328</p>
                <p className="text-xs text-green-500">Lives impacted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
          <Link href="/ngo/projects">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Computer Lab for Greenwood School</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Nairobi, Kenya</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-medium">$8,500 / $15,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: '57%' }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Donors</span>
                  <span className="font-medium">23</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Beneficiaries</span>
                  <span className="font-medium">120 students</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" fullWidth>
                    View Details
                  </Button>
                  <Button variant="primary" size="sm" fullWidth>
                    Update Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Borehole Water Project</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Kampala, Uganda</p>
                </div>
                <Badge variant="warning">Pending Report</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-medium">$12,000 / $12,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Donors</span>
                  <span className="font-medium">8</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Beneficiaries</span>
                  <span className="font-medium">500 people</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" fullWidth>
                    View Details
                  </Button>
                  <Button variant="warning" size="sm" fullWidth>
                    Submit Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="rounded-full bg-accent-100 p-2">
                <DollarSign className="h-4 w-4 text-accent-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New donation received</p>
                <p className="text-xs text-gray-500">$500 for Computer Lab project</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="rounded-full bg-primary-100 p-2">
                <FolderOpen className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Project approved</p>
                <p className="text-xs text-gray-500">Teacher Training Initiative is now live</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="rounded-full bg-warning-100 p-2">
                <TrendingUp className="h-4 w-4 text-warning-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Monitoring report submitted</p>
                <p className="text-xs text-gray-500">Mid-term report for Borehole project</p>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

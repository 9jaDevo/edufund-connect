import { Heart, TrendingUp, Users, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DonorDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your impact summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <DollarSign className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
                <p className="text-xs text-green-500">+$500 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-accent-100 p-3 mr-4">
                <Heart className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Projects Supported</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-green-500">2 active</p>
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
                <p className="text-sm font-medium text-gray-500">Students Helped</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-green-500">Lives changed</p>
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
                <p className="text-sm font-medium text-gray-500">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Active Projects</h2>
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
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Your Contribution</span>
                  <span className="font-medium">$2,500</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Milestone</span>
                  <span className="font-medium">Equipment Installation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Scholarship Fund for 5 Students</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Lagos, Nigeria</p>
                </div>
                <Badge variant="warning">Pending Report</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: '30%' }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Your Contribution</span>
                  <span className="font-medium">$5,000</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Milestone</span>
                  <span className="font-medium">Mid-term Report</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

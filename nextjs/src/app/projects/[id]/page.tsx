import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Users, Calendar, TrendingUp, Heart, ArrowLeft } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/format'

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const supabase = await createServerSupabaseClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      ngos (
        id,
        organization_name,
        mission_statement,
        rating_avg,
        total_projects,
        users (
          name,
          profile_picture
        )
      ),
      milestones (
        id,
        title,
        description,
        amount,
        status,
        order
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !project) {
    notFound()
  }

  const progressPercentage = project.budget > 0
    ? Math.round((project.amount_raised / project.budget) * 100)
    : 0

  const remainingAmount = project.budget - project.amount_raised

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <Link href="/projects">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="primary">{project.project_type.replace('_', ' ')}</Badge>
                  <Badge variant={project.status === 'active' ? 'success' : 'default'}>
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-3xl">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{project.beneficiaries_count} beneficiaries</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formatDate(project.created_at)}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Milestones */}
            {project.milestones && project.milestones.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones
                      .sort((a: any, b: any) => a.order - b.order)
                      .map((milestone: any) => (
                        <div
                          key={milestone.id}
                          className="flex items-start gap-4 p-4 border rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.status === 'completed'
                                  ? 'bg-success-100 text-success-600'
                                  : milestone.status === 'in_progress'
                                  ? 'bg-warning-100 text-warning-600'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {milestone.order}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{milestone.title}</h4>
                              <Badge
                                variant={
                                  milestone.status === 'completed'
                                    ? 'success'
                                    : milestone.status === 'in_progress'
                                    ? 'warning'
                                    : 'default'
                                }
                              >
                                {milestone.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            {milestone.description && (
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                              Amount: ${milestone.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* NGO Info */}
            {project.ngos && (
              <Card>
                <CardHeader>
                  <CardTitle>About the Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold">
                      {project.ngos.organization_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{project.ngos.organization_name}</h3>
                      {project.ngos.mission_statement && (
                        <p className="text-sm text-gray-600 mt-1">{project.ngos.mission_statement}</p>
                      )}
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{project.ngos.rating_avg?.toFixed(1) || 'N/A'} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{project.ngos.total_projects || 0} projects</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Donation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Support This Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${project.amount_raised.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        raised of ${project.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-primary-500 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {progressPercentage}% funded · ${remainingAmount.toLocaleString()} to go
                    </p>
                  </div>

                  {/* Donation Options */}
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      leftIcon={<Heart className="h-5 w-5" />}
                    >
                      Donate Now
                    </Button>
                    <Button variant="outline" size="lg" fullWidth>
                      Share Project
                    </Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-6 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Project Timeline</span>
                      <span className="font-medium">
                        {project.start_date && project.end_date
                          ? `${formatDate(project.start_date)} - ${formatDate(project.end_date)}`
                          : 'Ongoing'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Donors</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Donation</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <div className="w-5 h-5 rounded-full bg-success-100 flex items-center justify-center">
                        <span className="text-success-600 text-xs">✓</span>
                      </div>
                      <span>Verified NGO</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <div className="w-5 h-5 rounded-full bg-success-100 flex items-center justify-center">
                        <span className="text-success-600 text-xs">✓</span>
                      </div>
                      <span>Independent Monitoring</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-success-100 flex items-center justify-center">
                        <span className="text-success-600 text-xs">✓</span>
                      </div>
                      <span>Secure Escrow</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

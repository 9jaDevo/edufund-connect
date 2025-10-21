import { Suspense } from 'react'
import Link from 'next/link'
import { MapPin, Users, TrendingUp, Search } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

async function ProjectsList() {
  const supabase = await createServerSupabaseClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      description,
      location,
      budget,
      amount_raised,
      beneficiaries_count,
      project_type,
      status,
      created_at,
      ngos (
        organization_name,
        rating_avg
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(12)

  if (error) {
    console.error('Error fetching projects:', error)
    return <div className="text-center py-12 text-error-500">Failed to load projects</div>
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No active projects at the moment. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const progressPercentage = project.budget > 0
          ? Math.round((project.amount_raised / project.budget) * 100)
          : 0

        return (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="primary">{project.project_type.replace('_', ' ')}</Badge>
                <Badge variant="success">{progressPercentage}% funded</Badge>
              </div>
              <CardTitle className="line-clamp-2">{project.title}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {project.description}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-medium">
                      ${project.amount_raised.toLocaleString()} of ${project.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {project.beneficiaries_count} beneficiaries
                    </span>
                  </div>
                  {project.ngos && Array.isArray(project.ngos) && project.ngos[0] && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {project.ngos[0].rating_avg?.toFixed(1) || 'N/A'} ★
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {project.ngos && Array.isArray(project.ngos) && project.ngos[0] && (
                <p className="text-xs text-gray-500 mb-3">
                  by {project.ngos[0].organization_name}
                </p>
              )}

              <Link href={`/projects/${project.id}`}>
                <Button variant="primary" size="sm" fullWidth>
                  View Details & Donate
                </Button>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Projects</h1>
              <p className="text-gray-600 mt-1">
                Support verified education and community development projects
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">All Types</option>
              <option value="student_sponsorship">Student Sponsorship</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="education_materials">Education Materials</option>
              <option value="teacher_training">Teacher Training</option>
              <option value="technology">Technology</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">All Locations</option>
              <option value="kenya">Kenya</option>
              <option value="uganda">Uganda</option>
              <option value="tanzania">Tanzania</option>
              <option value="nigeria">Nigeria</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container py-8">
        <Suspense fallback={<LoadingSpinner size="lg" text="Loading projects..." />}>
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  )
}

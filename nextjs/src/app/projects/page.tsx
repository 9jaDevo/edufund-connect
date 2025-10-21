import { Suspense } from 'react'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ProjectCard } from '@/components/features/project-card'
import { ProjectsFilters } from './projects-client'

interface ProjectsListProps {
  searchParams: {
    search?: string
    type?: string
    location?: string
    sort?: string
  }
}

async function ProjectsList({ searchParams }: ProjectsListProps) {
  const supabase = await createServerSupabaseClient()

  let query = supabase
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
      start_date,
      end_date,
      ngos (
        organization_name,
        rating_avg
      )
    `)
    .eq('status', 'active')

  if (searchParams.search) {
    query = query.or(`title.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%`)
  }

  if (searchParams.type) {
    query = query.eq('project_type', searchParams.type)
  }

  if (searchParams.location) {
    query = query.ilike('location', `%${searchParams.location}%`)
  }

  switch (searchParams.sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    case 'most_funded':
      query = query.order('amount_raised', { ascending: false })
      break
    case 'least_funded':
      query = query.order('amount_raised', { ascending: true })
      break
    case 'urgent':
      query = query.order('end_date', { ascending: true, nullsFirst: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  query = query.limit(24)

  const { data: projects, error } = await query

  if (error) {
    console.error('Error fetching projects:', error)
    return (
      <div className="text-center py-12">
        <p className="text-error-500 mb-4">Failed to load projects</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-900 font-medium mb-2">No projects found</p>
        <p className="text-gray-500 mb-4">
          {searchParams.search || searchParams.type || searchParams.location
            ? 'Try adjusting your filters to see more results'
            : 'No active projects at the moment. Check back soon!'}
        </p>
        {(searchParams.search || searchParams.type || searchParams.location) && (
          <Link href="/projects">
            <Button variant="outline">Clear Filters</Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project as any} />
        ))}
      </div>
    </div>
  )
}

interface PageProps {
  searchParams: {
    search?: string
    type?: string
    location?: string
    sort?: string
  }
}

export default function ProjectsPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
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

      <Suspense fallback={<div className="h-32" />}>
        <ProjectsFilters />
      </Suspense>

      <div className="container py-8">
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<LoadingSpinner size="lg" text="Loading projects..." />}
        >
          <ProjectsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

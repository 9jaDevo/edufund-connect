import Link from 'next/link'
import { MapPin, Users, TrendingUp, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatRelativeTime } from '@/lib/utils/format'
import { type Project } from '@/types'

interface ProjectCardProps {
  project: Project & {
    ngos?: Array<{
      organization_name: string
      rating_avg: number | null
    }>
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progressPercentage = project.budget > 0
    ? Math.round((project.amount_raised / project.budget) * 100)
    : 0

  const ngo = project.ngos && Array.isArray(project.ngos) ? project.ngos[0] : null

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'pending':
        return 'warning'
      case 'completed':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const getTypeLabel = (type: string) => {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="primary">{getTypeLabel(project.project_type)}</Badge>
          <Badge variant={getStatusVariant(project.status)}>
            {progressPercentage}% funded
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {project.description}
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Raised</span>
              <span className="font-medium">
                {formatCurrency(project.amount_raised)} of {formatCurrency(project.budget)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                {project.beneficiaries_count} beneficiaries
              </span>
            </div>
            {ngo?.rating_avg && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                  {ngo.rating_avg.toFixed(1)} ★
                </span>
              </div>
            )}
          </div>

          {project.created_at && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Created {formatRelativeTime(new Date(project.created_at))}</span>
            </div>
          )}
        </div>

        {ngo && (
          <p className="text-xs text-gray-500 mb-3">
            by {ngo.organization_name}
          </p>
        )}

        <Link href={`/projects/${project.id}`} className="mt-auto">
          <Button variant="primary" size="sm" fullWidth>
            View Details & Donate
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

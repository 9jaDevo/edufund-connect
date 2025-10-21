'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'

export function ProjectsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  const updateFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (type) params.set('type', type)
    if (location) params.set('location', location)
    if (sort) params.set('sort', sort)

    startTransition(() => {
      router.push(`/projects${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }

  const clearFilters = () => {
    setSearch('')
    setType('')
    setLocation('')
    setSort('newest')
    startTransition(() => {
      router.push('/projects')
    })
  }

  const hasFilters = search || type || location || sort !== 'newest'

  return (
    <div className="bg-white border-b">
      <div className="container py-4">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateFilters()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                startTransition(() => {
                  const params = new URLSearchParams(searchParams)
                  if (e.target.value) {
                    params.set('type', e.target.value)
                  } else {
                    params.delete('type')
                  }
                  router.push(`/projects?${params.toString()}`)
                })
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="student_sponsorship">Student Sponsorship</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="education_materials">Education Materials</option>
              <option value="teacher_training">Teacher Training</option>
              <option value="technology">Technology</option>
              <option value="community_development">Community Development</option>
            </select>
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                startTransition(() => {
                  const params = new URLSearchParams(searchParams)
                  if (e.target.value) {
                    params.set('location', e.target.value)
                  } else {
                    params.delete('location')
                  }
                  router.push(`/projects?${params.toString()}`)
                })
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              <option value="Kenya">Kenya</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Rwanda">Rwanda</option>
            </select>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                startTransition(() => {
                  const params = new URLSearchParams(searchParams)
                  params.set('sort', e.target.value)
                  router.push(`/projects?${params.toString()}`)
                })
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_funded">Most Funded</option>
              <option value="least_funded">Least Funded</option>
              <option value="urgent">Most Urgent</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={updateFilters}
              disabled={isPending}
            >
              Apply Filters
            </Button>
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                disabled={isPending}
              >
                Clear All
              </Button>
            )}
            {isPending && (
              <span className="text-sm text-gray-500">Updating...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

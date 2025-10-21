'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProjectWizard } from '@/components/forms/project-wizard'
import { createClient } from '@/lib/supabase/client'
import { type ProjectFormData } from '@/lib/validations/project'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (data: ProjectFormData) => {
    setIsLoading(true)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('You must be logged in to create a project')
        return
      }

      // Get NGO profile
      const { data: ngoData, error: ngoError } = await supabase
        .from('ngos')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (ngoError || !ngoData) {
        toast.error('NGO profile not found. Please complete your profile first.')
        return
      }

      // Insert project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          ngo_id: ngoData.id,
          title: data.title,
          description: data.description,
          project_type: data.project_type,
          location: data.location,
          budget: data.budget,
          beneficiaries_count: data.beneficiaries_count,
          start_date: data.start_date || null,
          end_date: data.end_date || null,
          status: 'pending',
          amount_raised: 0,
        })
        .select()
        .single()

      if (projectError) {
        console.error('Project creation error:', projectError)
        toast.error('Failed to create project: ' + projectError.message)
        return
      }

      toast.success('Project created successfully! It will be reviewed by our admin team.')
      router.push('/ngo/projects')
    } catch (err) {
      console.error('Unexpected error:', err)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/ngo">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <ProjectWizard onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react'
import { projectSchema, type ProjectFormData } from '@/lib/validations/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProjectWizardProps {
  onSubmit: (data: ProjectFormData) => Promise<void>
  isLoading?: boolean
}

const PROJECT_TYPES = [
  { value: 'student_sponsorship', label: 'Student Sponsorship' },
  { value: 'infrastructure', label: 'Infrastructure (Borehole, Classroom, etc.)' },
  { value: 'education_materials', label: 'Education Materials' },
  { value: 'teacher_training', label: 'Teacher Training' },
  { value: 'technology', label: 'Technology & Equipment' },
  { value: 'other', label: 'Other Community Project' },
]

export function ProjectWizard({ onSubmit, isLoading }: ProjectWizardProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: 'onChange',
  })

  const nextStep = async () => {
    let fieldsToValidate: (keyof ProjectFormData)[] = []

    if (step === 1) {
      fieldsToValidate = ['title', 'project_type', 'description']
    } else if (step === 2) {
      fieldsToValidate = ['location', 'budget', 'beneficiaries_count']
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleFormSubmit = async (data: ProjectFormData) => {
    await onSubmit(data)
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Create New Project</CardTitle>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full ${
                  index + 1 <= step ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        <CardDescription>
          Step {step} of {totalSteps}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="title" className="form-label">
                  Project Title
                </label>
                <Input
                  id="title"
                  placeholder="e.g., Computer Lab for Greenwood School"
                  error={errors.title?.message}
                  {...register('title')}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Make it descriptive and compelling
                </p>
              </div>

              <div>
                <label htmlFor="project_type" className="form-label">
                  Project Type
                </label>
                <select
                  id="project_type"
                  className="form-input"
                  {...register('project_type')}
                >
                  <option value="">Select a project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.project_type && (
                  <p className="form-error">{errors.project_type.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="form-label">
                  Project Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  className="form-input"
                  placeholder="Describe your project in detail. What will be done? Who will benefit? What impact will it have?"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="form-error">{errors.description.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 50 characters. Be specific about goals and outcomes.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Location & Budget */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="location" className="form-label">
                  Project Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="location"
                    type="text"
                    className="form-input pl-10"
                    placeholder="e.g., Nairobi, Kenya"
                    {...register('location')}
                  />
                </div>
                {errors.location && (
                  <p className="form-error">{errors.location.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="form-label">
                    Total Budget (USD)
                  </label>
                  <Input
                    id="budget"
                    type="number"
                    step="0.01"
                    placeholder="10000"
                    error={errors.budget?.message}
                    {...register('budget', { valueAsNumber: true })}
                  />
                </div>

                <div>
                  <label htmlFor="beneficiaries_count" className="form-label">
                    Number of Beneficiaries
                  </label>
                  <Input
                    id="beneficiaries_count"
                    type="number"
                    placeholder="50"
                    error={errors.beneficiaries_count?.message}
                    {...register('beneficiaries_count', { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start_date" className="form-label">
                    Expected Start Date (Optional)
                  </label>
                  <Input
                    id="start_date"
                    type="date"
                    error={errors.start_date?.message}
                    {...register('start_date')}
                  />
                </div>

                <div>
                  <label htmlFor="end_date" className="form-label">
                    Expected End Date (Optional)
                  </label>
                  <Input
                    id="end_date"
                    type="date"
                    error={errors.end_date?.message}
                    {...register('end_date')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Review Your Project</h3>

                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium">{watch('title')}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <Badge variant="primary">
                    {PROJECT_TYPES.find(t => t.value === watch('project_type'))?.label}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-sm">{watch('description')}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{watch('location')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">${watch('budget')?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Beneficiaries</p>
                    <p className="font-medium">{watch('beneficiaries_count')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">
                      {watch('start_date') && watch('end_date')
                        ? `${watch('start_date')} to ${watch('end_date')}`
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <p className="text-sm text-warning-800">
                  <strong>Note:</strong> Your project will be reviewed by our admin team before going live.
                  You'll receive an email notification once it's approved.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>

            {step < totalSteps ? (
              <Button
                type="button"
                variant="primary"
                onClick={nextStep}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                variant="success"
                isLoading={isLoading}
                leftIcon={<Check className="h-4 w-4" />}
              >
                Submit Project
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

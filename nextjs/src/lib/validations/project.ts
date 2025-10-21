import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  project_type: z.string().min(1, 'Please select a project type'),
  location: z.string().min(3, 'Location is required'),
  location_lat: z.number().optional(),
  location_long: z.number().optional(),
  budget: z.number().min(1, 'Budget must be greater than 0'),
  beneficiaries_count: z.number().min(1, 'Number of beneficiaries must be at least 1'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  image_url: z.string().url().optional(),
})

export const milestoneSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  amount: z.number().min(0, 'Amount must be 0 or greater'),
  order: z.number().min(1),
  target_date: z.string().optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
export type MilestoneFormData = z.infer<typeof milestoneSchema>

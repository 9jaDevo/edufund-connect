import { z } from 'zod'

export const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation amount is $1'),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  cover_fees: z.boolean().default(false),
  anonymous: z.boolean().default(false),
})

export type DonationFormData = z.infer<typeof donationSchema>

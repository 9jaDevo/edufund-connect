'use client'

import { DonationForm } from '@/components/forms/donation-form'

interface DonationSectionProps {
  projectId: string
  projectTitle: string
}

export function DonationSection({ projectId, projectTitle }: DonationSectionProps) {
  return (
    <div className="sticky top-4">
      <DonationForm projectId={projectId} projectTitle={projectTitle} />
    </div>
  )
}

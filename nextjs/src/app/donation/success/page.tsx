'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!sessionId) {
      router.push('/')
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/donor')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [sessionId, router])

  if (!sessionId) {
    return <LoadingSpinner size="lg" text="Redirecting..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-success-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Donation!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Your generous contribution has been received and will be held securely in escrow.
            Funds will be released to the project as milestones are completed and verified.
          </p>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-primary-600" />
              <h3 className="font-semibold text-primary-900">What Happens Next?</h3>
            </div>
            <ul className="text-sm text-primary-800 space-y-2 text-left max-w-md mx-auto">
              <li>✓ You'll receive a confirmation email with your donation receipt</li>
              <li>✓ Your donation is now secured in our escrow system</li>
              <li>✓ You'll get updates as the project reaches milestones</li>
              <li>✓ Monitoring agents will verify progress before fund release</li>
              <li>✓ Track your impact anytime from your donor dashboard</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donor">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg">
                Browse More Projects
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Redirecting to your dashboard in {countdown} seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Loading..." />}>
      <SuccessContent />
    </Suspense>
  )
}

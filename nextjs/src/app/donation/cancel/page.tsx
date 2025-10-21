import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DonationCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-warning-100 rounded-full mb-6">
            <XCircle className="h-12 w-12 text-warning-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Donation Cancelled
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Your donation was not completed. No charges have been made to your account.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">What happened?</h3>
            <p className="text-sm text-gray-600">
              You cancelled the payment process or closed the payment window.
              Your donation was not processed and no money was transferred.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button variant="primary" size="lg" leftIcon={<RefreshCw className="h-4 w-4" />}>
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            If you experienced any issues during checkout, please contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

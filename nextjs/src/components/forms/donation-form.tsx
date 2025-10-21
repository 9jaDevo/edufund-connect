'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Heart, DollarSign, Loader2 } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { donationSchema, type DonationFormData } from '@/lib/validations/donation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface DonationFormProps {
  projectId: string
  projectTitle: string
  suggestedAmounts?: number[]
}

export function DonationForm({
  projectId,
  projectTitle,
  suggestedAmounts = [25, 50, 100, 250, 500, 1000]
}: DonationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      cover_fees: false,
      anonymous: false,
    },
  })

  const amount = watch('amount')
  const coverFees = watch('cover_fees')

  const calculateTotal = () => {
    if (!amount) return 0
    if (!coverFees) return amount

    const feePercentage = 0.029
    const stripeFee = 0.30
    return Math.round(((amount + stripeFee) / (1 - feePercentage)) * 100) / 100
  }

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value)
    setValue('amount', value)
  }

  const onSubmit = async (data: DonationFormData) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          amount: data.amount,
          message: data.message,
          coverFees: data.cover_fees,
          anonymous: data.anonymous,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId, url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        const stripe = await stripePromise
        if (!stripe) {
          throw new Error('Stripe failed to load')
        }
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          throw error
        }
      }
    } catch (error) {
      console.error('Donation error:', error)
      toast.error('Failed to process donation. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-error-500" />
          Make a Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Suggested Amounts */}
          <div>
            <label className="form-label">Choose an amount</label>
            <div className="grid grid-cols-3 gap-3">
              {suggestedAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountSelect(value)}
                  className={`p-3 border rounded-lg font-medium transition-all ${
                    selectedAmount === value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label htmlFor="amount" className="form-label">
              Or enter custom amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="1"
                placeholder="100.00"
                className="pl-10"
                error={errors.amount?.message}
                {...register('amount', {
                  valueAsNumber: true,
                  onChange: () => setSelectedAmount(null)
                })}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="form-label">
              Leave a message (optional)
            </label>
            <textarea
              id="message"
              rows={3}
              className="form-input"
              placeholder="Share why you're supporting this project..."
              {...register('message')}
            />
            {errors.message && (
              <p className="form-error">{errors.message.message}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-start">
              <input
                id="cover_fees"
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded mt-1"
                {...register('cover_fees')}
              />
              <label htmlFor="cover_fees" className="ml-2 block text-sm text-gray-700">
                Cover transaction fees (adds ~3%)
                {coverFees && amount && (
                  <span className="block text-xs text-gray-500 mt-1">
                    Total: ${calculateTotal().toFixed(2)}
                  </span>
                )}
              </label>
            </div>

            <div className="flex items-start">
              <input
                id="anonymous"
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded mt-1"
                {...register('anonymous')}
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Make my donation anonymous
              </label>
            </div>
          </div>

          {/* Summary */}
          {amount && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Donation Amount</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
              {coverFees && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fees</span>
                    <span className="font-medium">
                      ${(calculateTotal() - amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-primary-600">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            leftIcon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className="h-5 w-5" />}
          >
            {isLoading ? 'Processing...' : `Donate ${amount ? `$${calculateTotal().toFixed(2)}` : ''}`}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Secure payment powered by Stripe. Your donation will be held in escrow and released based on project milestones.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

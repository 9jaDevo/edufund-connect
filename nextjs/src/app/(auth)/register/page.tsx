'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { UserRole } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserRole.DONOR,
      terms: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        toast.error('Registration failed: ' + signUpError.message)
        return
      }

      if (authData.user) {
        // Insert user data into users table
        const { error: insertError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: data.email,
          name: data.name,
          role: data.role,
          country: data.country,
          phone: data.phone,
          is_verified: false,
        })

        if (insertError) {
          console.error('Error inserting user data:', insertError)
        }

        toast.success('Registration successful! Please check your email to verify your account.')
        router.push('/login?registered=true')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('An unexpected error occurred. Please try again.')
      toast.error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-500 hover:text-primary-600">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md flex items-start gap-2 text-error-700">
              <AlertCircle className="h-5 w-5 text-error-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div>
              <label htmlFor="role" className="form-label">
                I am a
              </label>
              <select
                id="role"
                className="form-input"
                {...register('role')}
              >
                <option value={UserRole.DONOR}>Donor</option>
                <option value={UserRole.STUDENT}>Student</option>
                <option value={UserRole.NGO}>NGO</option>
                <option value={UserRole.SCHOOL}>School</option>
                <option value={UserRole.MONITORING_AGENT}>Monitoring Agent</option>
              </select>
              {errors.role && <p className="form-error">{errors.role.message}</p>}
            </div>

            <div>
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <Input
                id="country"
                type="text"
                error={errors.country?.message}
                {...register('country')}
                placeholder="e.g., United States"
              />
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register('phone')}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded mt-1"
                {...register('terms')}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-500 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && <p className="form-error">{errors.terms.message}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

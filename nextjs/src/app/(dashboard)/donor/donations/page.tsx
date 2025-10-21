import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { DollarSign, Calendar, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DonationsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in to view your donations</div>
  }

  const { data: donations } = await supabase
    .from('donations')
    .select(`
      *,
      projects (
        id,
        title,
        status,
        amount_raised,
        budget
      )
    `)
    .eq('donor_id', user.id)
    .order('created_at', { ascending: false })

  const totalDonated = donations?.reduce((sum, d) => sum + d.amount, 0) || 0
  const activeProjects = donations?.filter(d => d.escrow_status === 'held').length || 0
  const completedDonations = donations?.filter(d => d.escrow_status === 'released').length || 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
        <p className="text-gray-600 mt-2">Track your contributions and their impact</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <DollarSign className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalDonated)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <Shield className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Escrow</p>
                <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
                <p className="text-xs text-gray-500">Active projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success-100 p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedDonations}</p>
                <p className="text-xs text-gray-500">Fully released</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donations List */}
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          {!donations || donations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't made any donations yet</p>
              <Link
                href="/projects"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Browse Projects →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation: any) => (
                <div
                  key={donation.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <Link
                        href={`/projects/${donation.project_id}`}
                        className="font-medium text-lg hover:text-primary-600"
                      >
                        {donation.projects?.title || 'Unknown Project'}
                      </Link>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(donation.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{formatCurrency(donation.amount)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          donation.status === 'completed'
                            ? 'success'
                            : donation.status === 'failed'
                            ? 'error'
                            : 'warning'
                        }
                      >
                        {donation.status}
                      </Badge>
                      <div className="mt-2">
                        <Badge
                          variant={
                            donation.escrow_status === 'released'
                              ? 'success'
                              : donation.escrow_status === 'held'
                              ? 'warning'
                              : 'default'
                          }
                        >
                          {donation.escrow_status === 'held'
                            ? 'In Escrow'
                            : donation.escrow_status === 'released'
                            ? 'Released'
                            : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {donation.message && (
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                      <p className="italic">"{donation.message}"</p>
                    </div>
                  )}

                  {donation.projects && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Project Progress</span>
                        <span>
                          {formatCurrency(donation.projects.amount_raised)} /{' '}
                          {formatCurrency(donation.projects.budget)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (donation.projects.amount_raised / donation.projects.budget) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

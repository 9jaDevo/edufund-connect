import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG } from '@/lib/stripe/config'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, amount, message, coverFees, anonymous } = body

    if (!projectId || !amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid project ID or amount' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get project details
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, title, ngo_id')
      .eq('id', projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Calculate total amount including fees if covered
    const feePercentage = 0.029 + 0.003 // Stripe fee (2.9% + 30¢)
    const stripeFee = 30 // 30 cents in cents
    let totalAmount = amount * 100 // Convert to cents

    if (coverFees) {
      totalAmount = Math.round((amount * 100 + stripeFee) / (1 - feePercentage))
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.currency,
            product_data: {
              name: `Donation to: ${project.title}`,
              description: message || 'Support this project',
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      metadata: {
        projectId: project.id,
        donorId: user.id,
        ngoId: project.ngo_id,
        message: message || '',
        coverFees: coverFees ? 'true' : 'false',
        anonymous: anonymous ? 'true' : 'false',
        originalAmount: amount.toString(),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

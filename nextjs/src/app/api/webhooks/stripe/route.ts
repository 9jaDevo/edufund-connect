import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/config'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const supabase = await createServerSupabaseClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const metadata = session.metadata

        if (!metadata) {
          throw new Error('Missing metadata in checkout session')
        }

        const { projectId, donorId, ngoId, message, coverFees, anonymous, originalAmount } = metadata

        // Create donation record
        const { data: donation, error: donationError } = await supabase
          .from('donations')
          .insert({
            project_id: projectId,
            donor_id: donorId,
            amount: parseFloat(originalAmount),
            status: 'completed',
            escrow_status: 'held',
            message: message || null,
            payment_method: 'stripe',
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .select()
          .single()

        if (donationError) {
          console.error('Error creating donation:', donationError)
          throw donationError
        }

        // Update project amount_raised
        const { error: projectError } = await supabase.rpc(
          'increment_project_funds',
          {
            project_id: projectId,
            amount: parseFloat(originalAmount),
          }
        )

        if (projectError) {
          console.error('Error updating project funds:', projectError)
        }

        // Update or create escrow record
        const { error: escrowError } = await supabase.rpc(
          'update_escrow',
          {
            project_id: projectId,
            amount: parseFloat(originalAmount),
          }
        )

        if (escrowError) {
          console.error('Error updating escrow:', escrowError)
        }

        console.log(`Donation processed: ${donation.id}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Payment failed:', paymentIntent.id)

        // Update donation status if exists
        await supabase
          .from('donations')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

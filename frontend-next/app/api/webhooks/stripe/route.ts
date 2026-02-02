import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '../../../lib/prisma'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-11-15' })

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature') || ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.bookingId as string | undefined
      if (bookingId) {
        await prisma.booking.update({ where: { id: bookingId }, data: { status: 'CONFIRMED' } })
        console.log(`Booking ${bookingId} marked CONFIRMED`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handling failed:', err)
    return NextResponse.json({ error: 'Webhook handling failed' }, { status: 500 })
  }
}

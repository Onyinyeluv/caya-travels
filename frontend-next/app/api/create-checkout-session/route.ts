import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '../../../lib/prisma'
import { supabaseServer } from '../../../lib/supabaseServer'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-11-15' })

export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const { listingId, startDate, endDate, totalCents } = body
    if (!listingId || !startDate || !endDate || !totalCents) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // find or create prisma user by email
    const email = userData.user.email || undefined
    if (!email) return NextResponse.json({ error: 'User has no email' }, { status: 400 })

    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({ data: { email, name: userData.user.user_metadata?.full_name || undefined } })
    }

    // create a pending booking in DB
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        listingId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCents: Number(totalCents)
      }
    })

    // audit log for pending booking
    await prisma.auditLog.create({
      data: {
        action: 'CREATE_PENDING_BOOKING',
        entity: 'Booking',
        entityId: booking.id,
        userId: user.id,
        userEmail: user.email,
        meta: { listingId, startDate, endDate, totalCents: Number(totalCents) }
      }
    })

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Booking ${listingId}` },
            unit_amount: Number(totalCents)
          },
          quantity: 1
        }
      ],
      metadata: { bookingId: booking.id },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile?payment=cancel`
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

import fetch from 'node-fetch'
import nodemailer from 'nodemailer'
import { Booking } from '@prisma/client'

const provider = process.env.EMAIL_PROVIDER || process.env.SENDGRID_API_KEY ? 'sendgrid' : 'smtp'
const from = process.env.EMAIL_FROM || 'no-reply@example.com'

async function sendSendGrid(to: string, subject: string, text: string, html?: string) {
  const key = process.env.SENDGRID_API_KEY || ''
  if (!key) throw new Error('Missing SENDGRID_API_KEY')
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: 'text/plain', value: text }, ...(html ? [{ type: 'text/html', value: html }] : [])]
    })
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`SendGrid error: ${res.status} ${txt}`)
  }
  return true
}

async function sendSmtp(to: string, subject: string, text: string, html?: string) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) throw new Error('Missing SMTP config')
  const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } })
  await transporter.sendMail({ from, to, subject, text, html })
  return true
}

export async function sendBookingConfirmed(booking: Partial<Booking> & { userEmail?: string; listingTitle?: string }) {
  const to = booking.userEmail || ''
  const subject = `Your booking is confirmed for ${booking.listingTitle || 'your listing'}`
  const text = `Your booking (${booking.id}) has been confirmed for ${booking.listingTitle || ''} from ${booking.startDate} to ${booking.endDate}. Amount: $${((booking.totalCents||0)/100).toFixed(2)}.`
  try {
    if (provider === 'sendgrid') return await sendSendGrid(to, subject, text)
    return await sendSmtp(to, subject, text)
  } catch (err) {
    console.warn('Failed to send booking confirmed email', err)
    return false
  }
}

export async function sendBookingCancelled(booking: Partial<Booking> & { userEmail?: string; listingTitle?: string }) {
  const to = booking.userEmail || ''
  const subject = `Your booking was cancelled for ${booking.listingTitle || 'your listing'}`
  const text = `Your booking (${booking.id}) for ${booking.listingTitle || ''} from ${booking.startDate} to ${booking.endDate} has been cancelled.`
  try {
    if (provider === 'sendgrid') return await sendSendGrid(to, subject, text)
    return await sendSmtp(to, subject, text)
  } catch (err) {
    console.warn('Failed to send booking cancelled email', err)
    return false
  }
}

export async function sendGeneric({ to, subject, text, html }: { to: string; subject: string; text: string; html?: string }) {
  try {
    if (provider === 'sendgrid') return await sendSendGrid(to, subject, text, html)
    return await sendSmtp(to, subject, text, html)
  } catch (err) {
    console.warn('Failed to send generic email', err)
    return false
  }
}

export default { sendBookingConfirmed, sendBookingCancelled }

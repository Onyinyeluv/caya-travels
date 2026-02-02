import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'host@example.com' },
    update: {},
    create: { email: 'host@example.com', name: 'Host' }
  })

  // ensure admin row for that user (role-based admin)
  await prisma.admin.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id, role: 'admin' }
  })

  await prisma.listing.create({
    data: {
      title: 'Cozy City Apartment',
      description: 'A cozy place in the city center',
      priceCents: 9000,
      lat: 40.7128,
      lng: -74.0060,
      ownerId: user.id
    }
  })

  // Sample Program listing (education)
  const programListing = await prisma.listing.create({
    data: {
      title: 'B.Sc. Computer Science — Global University',
      description: 'This program combines core computing foundations with hands-on projects and an industry placement in the final year.',
      priceCents: 0,
      lat: 51.5074,
      lng: -0.1278,
      ownerId: user.id,
      type: 'PROGRAM'
    }
  })

  await prisma.program.create({
    data: {
      listingId: programListing.id,
      degree: 'B.Sc. Computer Science',
      intakeStart: new Date('2026-09-01'),
      intakeEnd: new Date('2027-01-31'),
      requirements: 'High school diploma; transcript; English proficiency (IELTS 6.5 or equivalent)',
      applicationFeeCents: 5000,
      documents: [{ name: 'Prospectus', path: 'docs/prospectus-global-univ.pdf' }]
    }
  })

  // Sample Travel listing
  await prisma.listing.create({
    data: {
      title: 'Sunny Beach Resort — 5-night package',
      description: 'Enjoy 5 nights at the Sunny Beach Resort with daily breakfast, airport transfers, and optional excursions.',
      priceCents: 90000,
      lat: 6.5244,
      lng: 3.3792,
      ownerId: user.id,
      type: 'TRAVEL'
    }
  })

  console.log('Seed completed')
}

  // create a test partner (approved) for admin testing
  const partnerUser = await prisma.user.upsert({ where: { email: 'partner@example.com' }, update: {}, create: { email: 'partner@example.com', name: 'Partner Co' } })
  await prisma.partner.upsert({ where: { userId: partnerUser.id }, update: { approved: true, approvedAt: new Date() }, create: { userId: partnerUser.id, name: 'Partner Co', approved: true, approvedAt: new Date() } })

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
    // create a test partner (approved) for admin testing
    const partnerUser = await prisma.user.upsert({ where: { email: 'partner@example.com' }, update: {}, create: { email: 'partner@example.com', name: 'Partner Co' } })
    await prisma.partner.upsert({ where: { userId: partnerUser.id }, update: { approved: true, approvedAt: new Date() }, create: { userId: partnerUser.id, name: 'Partner Co', approved: true, approvedAt: new Date() } })
  .finally(async () => {
    await prisma.$disconnect()
  })

export const featuredListings = [
  {
    id: 'fixture-program-1',
    type: 'PROGRAM',
    title: 'B.Sc. Computer Science — Global University',
    description: 'This program combines core computing foundations with hands-on projects and an industry placement in the final year.',
    priceCents: 0,
    lat: 51.5074,
    lng: -0.1278,
    program: {
      degree: 'B.Sc. Computer Science',
      intakeStart: '2026-09-01',
      intakeEnd: '2027-01-31',
      requirements: 'High school diploma; transcript; English proficiency (IELTS 6.5 or equivalent)',
      applicationFeeCents: 5000,
      documents: [{ name: 'Prospectus', path: 'docs/prospectus-global-univ.pdf' }]
    }
  },
  {
    id: 'fixture-travel-1',
    type: 'TRAVEL',
    title: 'Sunny Beach Resort — 5-night package',
    description: 'Enjoy 5 nights at the Sunny Beach Resort with daily breakfast, airport transfers, and optional excursions.',
    priceCents: 90000,
    lat: 6.5244,
    lng: 3.3792,
    availabilityNotes: 'Limited rooms for June–August. Peak surcharge may apply.',
    cancellationPolicy: 'Full refund if canceled 7 days before arrival. 50% refund within 3-7 days. No refund within 72 hours.'
  }
]

export default featuredListings

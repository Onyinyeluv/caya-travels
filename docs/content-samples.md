# Content Samples: Home Hero, Listing Examples & Email Templates

Use these samples as starting copy. Replace placeholders with your brand voice and specific data.

## 1) Home Hero (Short + Long)
- Headline (short): Find Programs & Book Travel — All In One Place
- Subhead (long): Discover university programs, apply with confidence, or book travel packages and stays — search, compare, and pay securely in one platform.
- 3 Value Bullets:
  - Search and compare programs and travel offers side-by-side.
  - Secure payments with Stripe and fast confirmations.
  - Partner-managed listings with transparent policies and audit trails.
- CTAs:
  - Primary: Get Started
  - Secondary (partners): Become a Partner

## 2) Sample Program Listing (Education)
- Title: B.Sc. Computer Science — Global University
- Short summary: 4-year undergraduate program focused on software engineering and data science.
- Full description: This program combines core computing foundations with hands-on projects and an industry placement in the final year. Students will learn algorithms, systems, databases, machine learning, and software engineering practices. Scholarships and flexible intakes available.
- Degree: B.Sc. Computer Science
- Intake Start: 2026-09-01
- Intake End: 2027-01-31
- Requirements: High school diploma; transcript; English proficiency (IELTS 6.5 or equivalent)
- Application fee: $50
- Documents: Prospectus PDF (prospectus-global-univ.pdf)

Example JSON snippet (for content/seed):
{
  "type": "PROGRAM",
  "title": "B.Sc. Computer Science — Global University",
  "description": "This program combines core computing foundations with hands-on projects and an industry placement in the final year...",
  "priceCents": 0,
  "program": {
    "degree": "B.Sc. Computer Science",
    "intakeStart": "2026-09-01",
    "intakeEnd": "2027-01-31",
    "requirements": "High school diploma; transcript; English proficiency (IELTS 6.5 or equivalent)",
    "applicationFeeCents": 5000,
    "documents": [{ "name": "Prospectus", "path": "docs/prospectus-global-univ.pdf" }]
  }
}

## 3) Sample Travel Listing
- Title: Sunny Beach Resort — 5-night package
- Short summary: All-inclusive beach resort package with flights and transfers included.
- Full description: Enjoy 5 nights at the Sunny Beach Resort with daily breakfast, airport transfers, and optional excursions. Flexible cancellation up to 7 days before arrival.
- Price: $900 per person
- Availability notes: Limited rooms for June–August. Peak surcharge may apply.

Example JSON snippet:
{
  "type": "TRAVEL",
  "title": "Sunny Beach Resort — 5-night package",
  "description": "Enjoy 5 nights at the Sunny Beach Resort with daily breakfast, airport transfers, and optional excursions.",
  "priceCents": 90000,
  "availabilityNotes": "Limited rooms for June–August. Peak surcharge may apply.",
  "cancellationPolicy": "Full refund if canceled 7 days before arrival. 50% refund within 3-7 days. No refund within 72 hours."
}

## 4) Email Templates (Plain text / placeholders)

Booking/Application Received (user):
Subject: We received your booking/application — {listingTitle}

Hi {name},

Thanks — we received your {booking|application} for "{listingTitle}". Your reference is {bookingId}. We'll notify you when the partner confirms.

If you paid, your payment reference is {paymentId}.

View your booking: {appUrl}/bookings/{bookingId}

Thanks,
The Team


Booking/Application Confirmed (user):
Subject: Your {booking|application} is confirmed — {listingTitle}

Hi {name},

Good news — your {booking|application} for "{listingTitle}" is confirmed.

Reference: {bookingId}
Details: {appUrl}/bookings/{bookingId}

If you have questions, reply to this email or visit {appUrl}/support

Regards,
The Team


Booking/Application Cancelled (user):
Subject: Your {booking|application} was cancelled — {listingTitle}

Hi {name},

Your {booking|application} for "{listingTitle}" has been cancelled. Reason: {reason}

If you believe this is a mistake, contact support.

Regards,
The Team

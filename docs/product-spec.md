# Combined Product Spec: ApplyBoard + Wakanow (Education + Travel Marketplace)

## Purpose
Build a single marketplace platform that supports both education admissions (ApplyBoard-style) and travel booking (Wakanow-style) experiences. The platform connects end users (students, travelers) with partners (institutions, travel vendors, agents) and provides listings, applications/reservations, payments, search, and partner portals.

## Primary User Personas
- **Student / Applicant**: Searches programs, compares institutions, submits applications, pays fees, tracks application status.
- **Traveler**: Searches flights, hotels, and packages, books trips, pays, and manages bookings/trips.
- **Institution / University Partner**: Publishes programs, manages applications, reviews applicants, communicates decisions.
- **Travel Vendor / Agent**: Publishes offers (flights, hotels, packages), manages inventory, confirms/cancels bookings.
- **Platform Admin**: Oversees marketplace, audits actions, manages partners and disputes.

## High-level User Journeys
- Search & Discover: Users search by location, dates, program, type, or preferences. Results show listings with maps, filters, and reviews.
- Listing Detail: User views listing with details, images, requirements/inclusions, location map, and partner info.
- Reservation / Application: User starts application (education) or booking (travel); fills forms, uploads docs if needed, pays via Stripe, and receives confirmation email.
- Partner Workflow: Partner logs in to partner portal, creates/edits listings, views applications/bookings, accepts/rejects, issues confirmations, and manages inventory.
- Admin & Audit: Admin inspects audit logs, user reports, and intervenes on disputes, with RBAC enforcement.

## Core Listing Types (MVP)
- **Program (Education)**: Institution program with fields: name, degree, intake dates, requirements, tuition, location, application fee, documents required.
- **Travel Offer**: Flight/Hotel/Package a vendor lists with availability, pricing rules, cancellation policy, and included services.
- **Combined Package**: For cross-sell offers (study+travel short-term packages) — optional later MVP.

## Key Capabilities (MVP scope)
- Unified search across Programs and Travel Offers with facets and map view (Typesense + Mapbox).
- Listing CRUD & media uploads (Supabase) for partners/admins.
- Application/Booking flow with Stripe Checkout and webhook-confirmation.
- User profiles with applications/bookings list and status updates.
- Partner portal (basic): create/edit listings, view bookings/applications, accept/cancel.
- Audit logging for create/update/delete and payment events.
- Transactional emails (SendGrid/SMTP) for confirmations & cancellations.

## Compliance & Data Considerations
- Payments: PCI via Stripe Checkout — avoid storing card data.
- PII: Store minimal personal data; support deletion/export for GDPR compliance.
- Documents: Secure storage (Supabase private buckets) and expiring links for downloads.
- Regional rules: Enable localized tax/VAT handling and currency support later.

## Operational & Non-functional Requirements
- Scalable search (Typesense or managed alternative).
- Near real-time sync between DB and search index; eventual consistency acceptable.
- Resilient background jobs for non-blocking operations (emails, indexing) — can start as inline best-effort, then extract to worker.
- Observability: logs, error reporting, and simple metrics (daily bookings, conversions).

## Success Metrics (first 3 months)
- Search to booking/application conversion rate > 3%.
- Average time to confirm booking/application < 10 minutes (after partner action).
- 99% of booking confirmations delivered via email successfully.

## Risks & Mitigations
- Partner onboarding friction: Provide templates and onboarding docs; seed initial partners.
- Complex pricing/inventory: Start with simple fixed-price offerings; evolve to inventory/availability model.
- Legal and refund disputes: Define clear cancellation/refund policies and admin dispute resolution flows.

---

Created as the guiding specification for the combined platform MVP.

# MVP Backlog & Architecture Map

## Goal
Define a prioritized set of deliverables to launch an MVP that supports both education program applications and travel bookings, mapped to the current codebase and highlighting gaps.

## Priority 1 — Core Marketplace MVP (Weeks 0–4)
1. Unified Search & Listings (High)
   - Deliverables: Search API, search page, map results, listing detail pages.
   - Existing: `frontend-next/app/api/search/route.ts`, `components/SearchBar.tsx`, `MapWithMarkers.tsx`, `listings` pages.
   - Gaps: Program-specific fields, travel-specific filters (dates, occupancy).

2. Listing CRUD & Media Uploads (High)
   - Deliverables: Partner/admin create/edit listing UI, image upload to Supabase, Typesense sync.
   - Existing: `components/ListingForm.tsx`, API routes for listings, `lib/typesenseSync.ts`.
   - Gaps: Partner onboarding, structured program schema.

3. Booking/Application Flow with Payments (High)
   - Deliverables: Checkout session, pending booking model, Stripe webhook confirmation, booking pages.
   - Existing: `app/api/create-checkout-session/route.ts`, `app/api/webhooks/stripe/route.ts`, booking models and pages.
   - Gaps: Document uploads for applications, partner acceptance workflow for education apps.

## Priority 2 — Partner Portal & Admin (Weeks 4–8)
4. Partner Portal (Medium)
   - Deliverables: Partner auth, listing management dashboard, bookings/applications list, acceptance actions.
   - Existing: Basic admin pages and `Admin` model; partner role model required.
   - Gaps: Partner onboarding flows, permissions, UI polishing.

5. Audit, Emailing & Notifications (Medium)
   - Deliverables: Audit viewer, transactional emails (complete), in-app notifications (later).
   - Existing: `lib/mailer.ts`, `AuditLog` model, admin audit UI exists.
   - Gaps: Notification center, retryable background jobs.

## Priority 3 — Polishing & Scale (Weeks 8–12)
6. Inventory & Availability (Low)
   - Deliverables: Inventory model for travel offers, calendar availability, dynamic pricing.
   - Gaps: Complex; postpone until initial partners onboard.

7. Compliance, Reporting & Localization (Low)
   - Deliverables: GDPR features, tax handling, currency and language support.

## First 3 Implementation Tickets (ready to pick)
1. Ticket: Add Program schema and form fields
   - Goal: Extend `Listing` model to include education-specific fields (degree, intake dates, requirements, application fee). Update `ListingForm` and listing detail UI.
   - Estimated: 1–2 days.

2. Ticket: Travel filters & date availability on search
   - Goal: Add date/occupancy filters to search API and client; ensure Typesense schema supports travel attributes.
   - Estimated: 2–3 days.

3. Ticket: Partner portal skeleton + partner role
   - Goal: Add `Partner` role model, partner sign-up route, and a minimal partner dashboard to list and edit their listings.
   - Estimated: 3–5 days.

## Architecture Notes & Recommendations
- Move non-blocking work (email send, typesense indexing) to a background worker (Redis + Bull / Azure Functions) as next-scale step.
- Add Redis cache for search and session-level caching for heavily-read pages.
- Create CI workflow for tests and CD pipeline for deployments.

---

This backlog maps high-level features to current code artifacts and provides starting tickets to iterate quickly.

# Caya Express Travels — UI & Content Specification

Project: Caya Express Travels (education + travel marketplace)
Primary brand color: Gold (#D4AF37)

Purpose
- Provide a clear page map, required data fields, sample copy and acceptance criteria for the initial UI implementation. This mirrors the ApplyBoard experience focused on program discovery and partner-driven student applications, combined with travel bookings.

Pages (priority ordering)

1) Home (`/`)
  - Purpose: Discovery hub — search, featured programs and travel packages, hero CTA.
  - Required components: Hero, SearchBar, FeaturedCards (Program/Travel), Categories, How-it-works section, Footer.
  - Required data: featured listing title, short description, image, price, type (PROGRAM/TRAVEL), CTA link.
  - Sample copy: "Caya Express Travels — Discover programs and travel packages worldwide. Apply or book with trusted partners."

2) Search / Listings (`/search` or `/listings`)
  - Purpose: Filtered listing results (programs + travel) with map and list view toggle.
  - Components: SearchBar (debounced), Filters (type, price, location, intake), ListingCard, MapWithMarkers, Pagination or infinite scroll.
  - Data: listing.title, listing.type, priceCents, summary, lat/lng, imagePath, program.degree (if PROGRAM), intake dates.

3) Listing Detail (`/listings/[id]`)
  - Purpose: Full detail page for a listing (program or travel), booking or apply CTAs, program documents download.
  - Components: Image gallery, Details panel, ProgramDetails (if PROGRAM), Booking widget (for TRAVEL) or Apply widget (for PROGRAM), Partner info, Related listings, Reviews (future).
  - Data: listing.description, images, program.documents (name + path), applicationFeeCents, requirements, partner/owner info.

4) Program Detail (embedded on listing detail)
  - Purpose: Show program-specific fields: degree, intakes, requirements, documents, apply CTA.
  - Data: Program.degree, intakeStart/intakeEnd, requirements, documents[]

5) Booking Flow (`/bookings/*`)
  - Purpose: Checkout flow for travel bookings; confirmation pages and webhooks processed server-side.
  - Components: Booking form, Calendar pickers, Stripe Checkout integration, Booking detail page.
  - Data: booking.startDate, endDate, totalCents, status

6) Partner Portal (`/partner/*`)
  - Purpose: Partner onboarding, dashboard, create listings, manage students/applications.
  - Pages: Onboard, Dashboard, Listings, Students (list, create, detail), Settings.
  - Permission: Partners must be `approved` to create listings or students.

7) Admin Portal (`/admin/*`)
  - Purpose: Admin actions: view/approve partners, audit logs, bookings management, seed/maintenance tools.
  - Pages: Partners list (approve/revoke), Bookings, Audit log (search & pagination), Listings management.

8) Auth & Profile
  - Sign Up / Sign In (Supabase), Profile page with bookings and partner status, support/contact page.

Minimal acceptance criteria per page
- Home: hero + search present, 3 featured cards, CTA links working.
- Search: results display, filters change results, map shows markers.
- Listing Detail: program docs downloadable, booking/apply CTA triggers expected API call.
- Partner Dashboard: new partner sees pending message if not approved; approved partner can view their listings and create students.
- Admin Partners: admin can approve/revoke partners and partner status updates propagate to partner endpoints.

Content notes
- Use seed fixtures for initial content. Keep program documents accessible through Supabase buckets; consider signed URLs for private docs (later).

Next steps
- Map these page fields to the component library (Buttons, Inputs, ListingCard, ListingForm, FileUploader, Map, Modal, Toast). Create `docs/components.md` next.

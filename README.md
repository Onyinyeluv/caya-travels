# Caya Express Travels - Full Stack Website

A comprehensive education and travel marketplace platform combining program applications and travel bookings, built with Next.js, Prisma, Supabase, and Stripe.

## 🌟 Features

### For Students/Travelers
- **Browse & Search**: Search and filter education programs and travel packages
- **Program Applications**: Apply to universities and educational institutions worldwide
- **Travel Bookings**: Book curated travel packages with secure Stripe payments
- **Profile Dashboard**: Track application status and manage bookings
- **Secure Authentication**: Email/password auth via Supabase

### For Partners
- **Partner Portal**: Dedicated dashboard for education institutions and travel agencies
- **Student Management**: Track and manage student applications
- **Approval Workflow**: Admin-controlled partner approval system

### For Admins
- **Partner Management**: Approve/reject partner registrations
- **Booking Dashboard**: View and manage all bookings
- **Audit Logging**: Track all system activities
- **Email Notifications**: Automated notifications for status changes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Prisma ORM, PostgreSQL
- **Authentication & Storage**: Supabase
- **Payments**: Stripe Checkout
- **Search**: Typesense (optional, with Prisma fallback)
- **Email**: SendGrid/SMTP

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Supabase account (free tier works)
- Stripe account (for payments)

### 1. Environment Setup

Create `.env.local` in `frontend-next/`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/caya_express

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Typesense
TYPESENSE_API_KEY=your-key
TYPESENSE_HOST=xxx.a1.typesense.net
TYPESENSE_PORT=443
TYPESENSE_PROTOCOL=https

# Email
EMAIL_FROM=noreply@cayaexpress.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

Create `.env` in `backend/`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/caya_express
```

### 2. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Authentication > Providers > Enable Email provider
3. Create storage buckets:
   - `listings` (public)
   - `program-docs` (public or private)
4. Copy project URL and keys to your `.env.local`

### 3. Database Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name initial

# Seed the database (creates admin, partner, sample listings)
node prisma/seed.ts
```

### 4. Frontend Setup

```powershell
# Navigate to frontend directory
cd ../frontend-next

# Install dependencies
npm install

# Install Tailwind dependencies
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography

# Install additional packages
npm install clsx @supabase/auth-helpers-nextjs

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### 5. Test Accounts (from seed)

- **Admin**: `host@example.com` / `admin123`
- **Partner**: `partner@example.com` / `partner123`

## 📚 Key Pages

- `/` - Home page with hero, search, featured listings
- `/search` - Search and filter listings
- `/listings/[id]` - Listing detail with booking/apply forms
- `/profile` - User dashboard
- `/about` - About page
- `/contact` - Contact form
- `/help` - FAQ and help center
- `/partner/dashboard` - Partner portal
- `/admin/dashboard` - Admin dashboard

## 🎨 Design System

**Brand**: Caya Express Travels  
**Primary Color**: Gold (#D4AF37)  
**Font**: Inter

UI components in `components/ui/`: Button, Input, Textarea

## 💳 Payment Flow

1. User initiates booking
2. Backend creates Stripe Checkout Session
3. User completes payment on Stripe
4. Webhook confirms payment
5. Booking confirmed via email

## 🧪 Testing

**Stripe Test Cards**:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

Use any future expiry and any CVC.

## 📖 Documentation

See `/docs` folder for:
- `ui-spec.md` - Page specifications
- `style-guide.md` - Design system guide
- `components.md` - Component library

## 🐛 Troubleshooting

### Prisma errors
```powershell
cd backend
npx prisma generate
```

### Missing dependencies
```powershell
cd frontend-next
npm install
```

### Supabase auth issues
- Verify environment variables
- Check Supabase dashboard for correct keys
- Ensure email auth is enabled

## 📝 License

MIT

---

**Built with ❤️ for education and travel enthusiasts worldwide**


Quick local dev (after installing Node.js and Git):

```powershell
cd 'C:\Users\Angel\Desktop\CA'
npm install
# from workspace root: starts frontend (Vite), frontend-next (if you run its dev), and backend via root scripts
npm run dev
```

To develop the Next.js frontend specifically:

```powershell
cd 'C:\Users\Angel\Desktop\CA\frontend-next'
npm install
npm run dev
```

To set up the backend database using Prisma (example with local Postgres or Supabase):

1. Create a Postgres database and set `DATABASE_URL` in `backend/.env`.
2. From `backend` folder:

```powershell
cd 'C:\Users\Angel\Desktop\CA\backend'
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run dev
```

If you want, I can continue by wiring Prisma queries into the Express API, or replacing Express with a small Next.js API route layer — tell me which direction you'd prefer.
 
Auth (Supabase) setup
- I added Supabase client scaffolding in `frontend-next/lib/`:
	- `supabaseClient.ts` — client-side (uses `NEXT_PUBLIC_` env vars)
	- `supabaseServer.ts` — server-side (uses `SUPABASE_SERVICE_ROLE_KEY`)
- To set up Supabase for auth and storage:
	1. Create a project at https://app.supabase.com and note the project URL and keys.
	2. Set the following env vars (example in `backend/.env.example`):
		 - `SUPABASE_URL`
		 - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
		 - `NEXT_PUBLIC_SUPABASE_URL`
		 - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	3. Use the client in pages (e.g., `supabaseClient.auth.signUp`, `signIn`) to implement login flows.

Server-side notes:
- Protect server-only secrets — never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- I can add a bookings API that verifies a user's JWT via Supabase and creates booking records in Prisma; tell me if you want me to implement that now.
 
Stripe payments
- I added Stripe Checkout server routes to the Next.js app:
	- `POST /api/create-checkout-session` — creates a pending booking in the DB and returns a Stripe Checkout URL.
	- `POST /api/webhooks/stripe` — webhook handler that verifies the Stripe signature and marks bookings as `CONFIRMED` when payment completes.

Env vars to set (see `backend/.env.example`):
- `STRIPE_SECRET_KEY` — your Stripe secret key (server only)
- `STRIPE_WEBHOOK_SECRET` — the webhook signing secret (server only)
- `NEXT_PUBLIC_APP_URL` — optional override for redirect URLs (default `http://localhost:3000`)

Local webhook testing with Stripe CLI:

1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
2. Start listening and forward events to your local webhook endpoint:

```powershell
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

3. Create a Checkout Session via the app and complete payment in the test Stripe Checkout page — the CLI will forward events to your local server which will update the booking status.

Security:
- Keep `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` secret and only available to server environments.

Mapbox & Typesense
- I added Mapbox and Typesense scaffolding. To enable search and maps, set these env vars (see `backend/.env.example`):
	- `TYPESENSE_HOST`, `TYPESENSE_PORT`, `TYPESENSE_PROTOCOL`, `TYPESENSE_API_KEY` — Typesense server connection
	- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox public token for maps

Typesense setup notes:
1. Install and run Typesense server (or use Typesense Cloud). Create a `listings` collection with schema matching the Prisma model, for example:

```json
{
	"name": "listings",
	"fields": [
		{ "name": "id", "type": "string" },
		{ "name": "title", "type": "string" },
		{ "name": "description", "type": "string" },
		{ "name": "priceCents", "type": "int32" },
		{ "name": "lat", "type": "float" },
		{ "name": "lng", "type": "float" },
		{ "name": "_geo", "type": "geopoint" }
	],
	"default_sorting_field": "priceCents"
}
```

2. Index existing listings from the database into Typesense (I can add a seed script to push Prisma data into Typesense if you want).

Indexing script
- Run the Typesense indexing script (reads listings from Prisma and upserts into Typesense):

```powershell
cd 'C:\Users\Angel\Desktop\CA\backend'
npm install
npm run typesense:import
```

This script will attempt to create a `listings` collection if one does not exist and then upsert documents for each listing in the database.

Mapbox notes:
- Add `NEXT_PUBLIC_MAPBOX_TOKEN` to env and the Map component will render a map on listing pages.
- Mapbox requires a public token; keep it restricted via Mapbox dashboard if possible.

Admin UI
- A basic admin interface has been added at `frontend-next/app/admin/listings`.
	- Create, edit, and delete listings from the UI.
	- The `ListingForm` uploads images to Supabase Storage (bucket `listings`) and then creates/updates listings via the API.
	- For server-side authorization the API checks the Supabase user token and requires the authenticated user to match the listing owner email when updating or deleting.

How to use the admin UI
1. Ensure Supabase env vars are set in `backend/.env` and that a `listings` storage bucket exists on your Supabase project.
2. Sign in at `http://localhost:3000/signin` using the Supabase auth UI (email/password created via the sign-up form).
3. Visit `http://localhost:3000/admin/listings` to manage listings.

Notes:
- This admin UI is intentionally simple to bootstrap functionality. For production you should add role-based access control (e.g., admin role), server-side session endpoints, and protections around storage operations (e.g., signed upload URLs, cleaning up unused images when listings are deleted).
- I can add role checks and a server endpoint that returns a secure server-side session token for admin operations if you want.

Admin emails and server session
- You can configure `ADMIN_EMAILS` (comma-separated) in your env to allow specific emails to act as admins (they can edit/delete any listing).
- I added a server endpoint `GET /api/auth/session` that accepts the `Authorization: Bearer <token>` header and returns the Supabase user for that token. The admin UI uses this to attempt operations; for production we should use proper role claims in Supabase or a dedicated admin table.
 - You can configure `ADMIN_EMAILS` (comma-separated) in your env to allow specific emails to act as admins (they can edit/delete any listing). Note: we've also added a proper `Admin` table in the database and server-side checks that prefer that table for robust role management.
 - I added a server endpoint `GET /api/auth/session` that accepts the `Authorization: Bearer <token>` header and returns the Supabase user for that token. The admin UI uses this to attempt operations; for production we recommend using the `Admin` table or Supabase custom claims.
Audit logs
- An `AuditLog` table has been added to the database to record important events (booking creation, listing updates, deletes, etc.). This helps with tracing actions and security audits.

Where logs are created:
- Booking creation (both direct bookings and pending bookings created for Stripe Checkout) — `CREATE_BOOKING` and `CREATE_PENDING_BOOKING` entries.
- Listing updates — `UPDATE_LISTING`.
- Listing deletes — `DELETE_LISTING`.

You can view the `AuditLog` table in Prisma Studio:

```powershell
cd 'C:\Users\Angel\Desktop\CA\backend'
npm run prisma:studio
```

When you run migrations (see below) the `AuditLog` table will be created. I recommend reviewing these logs during testing and production for accountability.

Admin audit UI
- I added a simple admin audit viewer at `http://localhost:3000/admin/audit` that calls the new admin API endpoint. The page requires an authenticated admin user (sign in via `/signin`) and uses the Supabase session token to call `/api/admin/audit`.

If you'd like, I can add server-side filtering (by action, entity, date ranges) and CSV export for audit logs.

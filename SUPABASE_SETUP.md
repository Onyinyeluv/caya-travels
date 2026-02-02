# 🚀 Supabase Setup Guide for Caya Express Travels

## Step 1: Create Supabase Account (2 minutes)

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub, Google, or Email
4. Verify your email if needed

## Step 2: Create New Project (2 minutes)

1. Click **"New Project"**
2. Fill in:
   - **Name**: `caya-express` (or any name you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is perfect
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

## Step 3: Get API Credentials

Once your project is ready:

1. Go to **Settings** (gear icon on left sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: Copy this
   - **anon public**: Copy the `anon` key
   - **service_role secret**: Copy the `service_role` key

## Step 4: Update Your .env.local File

Open: `C:\Users\Angel\Desktop\CA\frontend-next\.env.local`

Replace these lines:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key-here
```

With your actual values from Step 3.

## Step 5: Get Database Connection String

1. In Supabase, go to **Settings** > **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)
5. Replace `[YOUR-PASSWORD]` with your database password from Step 2

Update in **both files**:
- `C:\Users\Angel\Desktop\CA\frontend-next\.env.local`
- `C:\Users\Angel\Desktop\CA\backend\.env`

```bash
DATABASE_URL=postgresql://postgres:your-actual-password@db.xxx.supabase.co:5432/postgres
```

## Step 6: Create Storage Buckets

1. In Supabase, click **Storage** (database icon on left sidebar)
2. Click **"New bucket"**
3. Create first bucket:
   - **Name**: `listings`
   - **Public bucket**: ✅ Check this box
   - Click **"Create bucket"**
4. Create second bucket:
   - **Name**: `program-docs`
   - **Public bucket**: ✅ Check this box
   - Click **"Create bucket"**

## Step 7: Enable Email Auth (Already enabled by default)

1. Go to **Authentication** > **Providers**
2. Make sure **Email** is enabled (should be on by default)
3. You're done!

## ✅ You're Ready!

Your `.env.local` and `.env` files should now look like:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:YourPassword123@db.abcdefghijk.supabase.co:5432/postgres
```

## 🎉 Next Steps

After saving your environment files, come back and I'll help you:
1. Generate Prisma client
2. Run database migrations
3. Seed sample data
4. Start the development server!

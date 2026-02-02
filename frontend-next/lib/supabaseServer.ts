import { createClient } from '@supabase/supabase-js'

// This file is for server-side usage only. Keep the service role key secret.
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRole)

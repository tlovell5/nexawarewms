import { SupabaseClient, createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bdaxrzvycwtgyvfdvihi.supabase.co"; // Get from your supabase project settings
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYXhyenZ5Y3d0Z3l2ZmR2aWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NDk3MDUsImV4cCI6MjAwNzUyNTcwNX0.fpoKK6GZlscRLtt6smw3DCWq2LRwzKH9QQKfUADgO0Y"; // Get from your supabase project settings

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default SupabaseClient;
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || (typeof window !== "undefined" ? window.location.origin : "")
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Supabase URL:", supabaseUrl)
  console.log("[v0] Supabase Key exists:", !!supabaseAnonKey)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing environment variables:", {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey,
      allEnvVars: Object.keys(process.env).filter((key) => key.includes("SUPABASE")),
    })
    throw new Error("Missing Supabase environment variables. Please check your Project Settings.")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

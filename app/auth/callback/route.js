import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {  createServerClient } from '@supabase/ssr'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/web'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name, options) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"

// export async function GET(request) {
//   const requestUrl = new URL(request.url)
//   const code = requestUrl.searchParams.get("code")

//   if (code) {
//     const cookieStore = cookies()
//     const supabase = createRouteHandlerClient({
//       cookies: () => cookieStore
//     })
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   // URL to redirect to after sign in process completes
//   return NextResponse.redirect(`http://localhost:3000/web`)
// }

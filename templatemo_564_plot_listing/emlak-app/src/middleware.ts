import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase-middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  const { pathname } = request.nextUrl
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const isPlaceholder = supabaseUrl.includes("placeholder") || !supabaseUrl

  // Development bypass check
  if (isPlaceholder) {
    const devToken = request.cookies.get("admin_token")?.value
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      if (devToken === "dev_bypass_token") return response
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    if (pathname === "/admin/login" && devToken === "dev_bypass_token") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // 1. Refresh session
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Admin routes protection
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      // If already logged in as admin, redirect to admin dashboard
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role === 'admin' || profile?.role === 'moderator') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      }
      return response
    }

    // If not logged in, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Role check: Only admin and moderator can access admin routes
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
      // Unauthorized role, redirect to a 403 page
      return NextResponse.redirect(new URL('/admin/unauthorized', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}

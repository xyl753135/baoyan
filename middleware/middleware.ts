import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) { 
    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.rewrite(new URL('/login', request.url))
    // }
    console.log("middleware triggered!")
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            has: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        }
    ],
}
/**
 * https://nextjs.org/docs/pages/building-your-application/routing/middleware
 * 
 * MATCHING PATHS
 * 
 * Middleware will be invoked for every route in your project. The following is the execution order:
 * headers from next.config.js
 * redirects from next.config.js
 * Middleware (rewrites, redirects, etc.)
 * beforeFiles (rewrites) from next.config.js
 * Filesystem routes (public/, _next/static/, pages/, app/, etc.)
 * afterFiles (rewrites) from next.config.js
 * Dynamic Routes (/blog/[slug])
 * fallback (rewrites) from next.config.js
 */
import { NextRequest } from 'next/server'
import { updateSession } from "@/utils/AuthHelper";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log("middleware triggered!");
    
    // Get session value
    const session = request.cookies.get("session")?.value;

    // If user is trying to go to /profile, check if they have a session.
    if (request.nextUrl.pathname.startsWith('/profile')) {
        // User doesn't have a session. Take them to login instead of profile.
        // Otherwise, renew session.expires value
        const res = updateSession(request, '/login');
        console.log("Middleware updated session")
        return res;
    }
}

// This will filter Middleware so it runs on specific paths
// You can match a single path or multiple paths with an array syntax
export const config = {
    // This regex is saying "NOT api, next/static, next/image, or any file ending in png"
    matcher: [
        '/((?!api|_next/static|.*\\.mp3|.*\\.lrc|_next/image|.*\\.png$).*)'],
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
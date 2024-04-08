import { NextRequest } from 'next/server'
import { deleteSession, extendSession, getSession } from "@/utils/AuthHelper";
import { redirect } from 'next/navigation';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log("current URL:", request.url)
    // Get session value
    if (request.nextUrl.pathname == ('/profile')) {
        
        
        // User doesn't have a session. Take them to login instead of profile.
        // Otherwise, renew session.expires value
        const res = extendSession(request, 60); // If user doesnt have session or fail to parse, fallback to /login
        console.log(`middleware triggered: handle /profile visit; extend session;`);
        return res;
    }

    // User does have a session. Take them to profile instead of login.
    // if (request.nextUrl.pathname.startsWith('/login')) {
        
        
    //     const session = await getSession();
    //     if (session != null) {
    //         const userData = session.user;
    //         if (userData) {
    //             return Response.redirect(new URL("/profile", request.url));
    //         }
    //     }
    // }

    if (request.nextUrl.pathname.startsWith('/logout')) {
        console.log("middleware triggered: handle /logout visit");

        return deleteSession(request);
    }

    // const session = request.cookies.get("session")?.value;
    // if (session == undefined) {
    //     if (request.nextUrl.pathname.startsWith('/profile')) {
    //         return Response.redirect(new URL("/login", request.url));
    //     }
    // } else {
        
    // }

    // If user is trying to go to /profile, check if they have a session.
    
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
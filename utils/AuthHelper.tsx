import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
          algorithms: ["HS256"],
        });
        return payload;
      } catch (error) {
        console.error(error);
        // Handle the error, e.g., by creating a new session
        cookies().delete("session");
        return null;
      }
      
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 hr from now")
        .sign(key);
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }

    let parsed = null;
    try {
        parsed = await decrypt(session);
    } catch (error) {
        console.error("AuthHelper.extendSession failed to decrypt sesson, assume parse = null");
    }
    return parsed;
}

export async function extendSession(
    request: NextRequest, 
    extendMins: number) {
    // Check if session exists
    const session = request.cookies.get("session")?.value;
    if (!session) {
        // Redirect to fallback url
        request.cookies.delete("session");
        console.log("AuthHelper.extendSession(): No session found, returning to fallback URL /login");
        return Response.redirect(new URL("/login", request.url));
    }
    
    // Parse session
    let parsed = null;
    try {
        parsed = await decrypt(session);
    } catch (error) {
        // Delete invalid session
        request.cookies.delete("session");
        // Redirect to fallback url
        console.error("AuthHelper.extendSession(): Failed to decrypt sesson, assume parse = null, returning to fallback URL /login");
        return Response.redirect(new URL("/login", request.url));
    }

    // Extend the session
    parsed.expires = new Date(Date.now() + extendMins * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}

export async function deleteSession(request: NextRequest) {
    request.cookies.delete("session");
    return Response.redirect(new URL("/login", request.url));
}
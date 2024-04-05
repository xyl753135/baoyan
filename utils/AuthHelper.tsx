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
        .setExpirationTime("10 sec from now")
        .sign(key);
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }

    let parsed = await decrypt(session); // could be null if expired

    return parsed;
}

export async function updateSession(request: NextRequest, fallbackUrl: string) {
    const session = request.cookies.get("session")?.value;
    if (!session) {
        console.log("No session found, returning to fallback URL")
        return Response.redirect(new URL(fallbackUrl, request.url));
    }
    
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    if (parsed == null) {
        Response.redirect(new URL("/login", request.url));
    }
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
  }
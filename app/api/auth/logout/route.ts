import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
 
export async function POST(request: Request) {
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}
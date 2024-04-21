import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { comparePasswordToHash } from "@/utils/PasswordHasher";
import { encrypt } from '@/utils/AuthHelper';
import { cookies } from "next/headers";
 
export async function POST(request: Request) {
  try {
    // Get POST variables
    const { 
      usernameHidden,
      nameInput, 
      bnameInput,
      lineInput,
      whatsappInput,
      wechatInput,
      emailInput,
      phoneInput,
      dobInput,
      genderSelect,
      countrySelect,
      localeSelect
    } = await request.json();
    
    // Validate variables
    console.log("dobInput",dobInput);
    const dobDate = new Date(dobInput);
    console.log("dobInput as Date", dobDate);

    
    // Update table
    let updateResult =
      await sql`UPDATE users
        SET name = ${nameInput},
        bname = ${bnameInput},
        line = ${lineInput},
        whatsapp = ${whatsappInput},
        wechat = ${wechatInput},
        email = ${emailInput},
        phone = ${phoneInput},
        dob = ${dobInput},
        gender = ${genderSelect},
        country = ${countrySelect},
        locale = ${localeSelect}
        WHERE username = ${usernameHidden}`;
    console.log(`Updated ${updateResult.rowCount} rows`);

    const query =
      await sql`SELECT * 
        FROM users
        WHERE username = ${usernameHidden}
        LIMIT 1;`;

    // Create the session
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 60 mins (in theory)
    console.log("expires.ISO:", expires.toLocaleString());
    const session = await encrypt({ user: query.rows[0], expires });
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    
    // Return result (credentials found or not-found)
    return NextResponse.json(
      { 
        updateResult
      }, 
      { 
        status: 200,
        statusText: "OK"
      }
    );

  } catch (error) {
    console.error(error);
    // Return result (server error)
    return NextResponse.json(
      { 
          result: {} ,
          error: String(error)
      }, 
      { 
          status: 500,
          statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
      }
    );
  }
}
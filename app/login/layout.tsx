
import { redirect } from "next/navigation"
import { getSession } from "@/utils/AuthHelper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (session) {
    const userData = session.user;
    if (userData) {
        redirect("/dashboard");
    }
  }
  
  
  return (
    <>
      {children}
    </>
  );
}

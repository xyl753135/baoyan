'use server'

import { MeritClientWrapper } from "@/components/shared/TransferOfMerit/MeritClientWrapper";
import { getSession } from "@/utils/AuthHelper";
import { redirect } from "next/navigation";

export default async function Page() {

  // User data
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  let userData = session.user;

  // const values
  const todayDate = new Date(Date.now());
  const yyyy = todayDate.getFullYear();
  const mm = String(todayDate.getMonth() + 1).padStart(2, "0");
  const dd = String(todayDate.getDate()).padStart(2, "0");
  const date = `${yyyy}-${mm}-${dd}`;

  return (
    <MeritClientWrapper username={userData.username} todayYYYYMMDD={date} privacyOn={false}>
    </MeritClientWrapper>
  );
}

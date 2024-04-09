'use server'

import { MeritClientWrapper } from "@/components/TransferOfMerit/MeritClientWrapper";
import { getSession } from "@/utils/AuthHelper";
import { redirect } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    minWidth: "350px",
    // border: "2px black dashed"
  },
  meritCards: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "1em",
  },
  colHeader: {
    color: "white"
  },
  formfieldLabel: {
    color: "white"
  },
  dateQueryUI: {
    display: "flex",
    flexDirection: "row",
    // flexGrow: "1",
    justifyContent: "space-between",
    // border: "2px black dashed"
  },
  btn: {
    width: "100px",
    flexGrow: "1",
    fontSize: "24px",
    display: "flex", alignItems: "center", justifyContent: "space-around",
    fontWeight: "bold",
    background: "saddlebrown",
    border: "white 1px solid",
    borderRadius: "5px",
    padding: "2px",
    color: "white",
  }
};

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

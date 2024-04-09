'use server'

import { Centerpiece } from "@/components/Centerpiece";
import { MantraApp } from "@/components/MantraApp/MantraApp"
import { getSession } from "@/utils/AuthHelper";
import { redirect } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
};

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  let userData = session.user;

  return (
    <main style={Style.main}>
      <MantraApp username={String(userData.username)} showTransfer={true} showMemberCount={true} memberCount={0}></MantraApp>
      <div style={{
        display: "var(--applicationsMantraShurVisibility)"
      }}>
        <Centerpiece 
          h={400} w={400*0.32} 
          altText={"寶嚴山寶嚴禪寺"} 
          link={"/centerpiece.png"}>
        </Centerpiece>
      </div>
      
    </main>
  );
}

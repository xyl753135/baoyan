'use server'

import { Centerpiece } from "@/components/Centerpiece";
import { MantraApp } from "@/components/MantraApp/V6/MantraApp"
import MantraCounterDisplay from "@/components/MantraApp/V6/MantraCounterDisplay";
import { getSession } from "@/utils/AuthHelper";
import { redirect } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
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
    <main style={{
      ...Style.main,
      // @ts-expect-error
      flexDirection: "var(--flexDirectionRWD)",
    }} >
      <div style={{
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          display: "var(--applicationsMantraShurVisibility)"
        }}>
          <Centerpiece
            h={200} w={200 * 0.32}
            altText={"寶嚴山寶嚴禪寺"}
            link={"/centerpiece.png"}>
          </Centerpiece>
          {/* Statistics (Read-only) */}

        </div>
        <MantraCounterDisplay username={userData.username}></MantraCounterDisplay>
      </div>

      
      <MantraApp username={String(userData.username)} showTransfer={true} showMemberCount={true} memberCount={0}></MantraApp>

      

    </main>
  );
}

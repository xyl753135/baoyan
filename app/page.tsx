'use server'

import Image from "next/image";
// import styles from "./page.module.css";
import LineAddFriendQR from "@/public/lineAddFriendQR.png"

import { MantraApp } from "@/components/MantraApp/MantraApp"


import { MeritCardRandomWrapper } from "@/components/TransferOfMerit/MeritCardRandomWrapper";


const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    justifyContent: "space-around",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    minWidth: "350px",
    
    // border: "2px black dashed"
  },
  colHeader: {
    fontSize: "30px",
  }, 
  MeritCardRandomWrappers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "1em",
  },
};

export default async function Home() {

  return (
    <main style={
      {
        ...Style.main,
        // @ts-expect-error
        flexDirection: "var(--flexDirectionRWD)",
      }}>
      <section>
        <MantraApp></MantraApp>
      </section>

      <section>
        <div style={Style.column}>
          <section style={{ display: "flex", gap: "1em" }}>
            <h3 style={Style.colHeader}>最新回向</h3>
            <button>更新</button>
          </section>
          {/* Most-recent Merit cards */}
          <section style={Style.MeritCardRandomWrappers}>
            <MeritCardRandomWrapper
              width={"350px"} height={"200px"}
              author={"BestNun123"}
              timestamp={"2024-01-01"}
              meritSource="持誦楞嚴神咒 1次"
              text={"Hello world, This is 40 characters! ♥♥♥♥"}>
            </MeritCardRandomWrapper>
            <MeritCardRandomWrapper
              width={"350px"} height={"200px"}
              author={"一二三四五六七八九十超級長用戶名的使用者範例..."}
              timestamp={"2024-01-20"}
              meritSource="持誦楞嚴神咒 7次"
              text={"一二三四五六七八九十一二三四五這是二十字"}>
            </MeritCardRandomWrapper>
            <MeritCardRandomWrapper
              width={"350px"} height={"200px"}
              author={"寫滿了150字的大哥"}
              timestamp={"2024-03-13"}
              meritSource="持誦楞嚴神咒 10次"
              text={`一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十
                  一二三四五六七八九十一二三四五六七八九十
                  一二三四五六七八九十一二三四五六七八九十
                  一二三四五六七八九十一二三四五六七八九十
                  一二三四五六七八九十一二三四五六七八九十
                  一二三四五六七八九十一二三四五六七八九十
                  一二三四五六七八九十一二三這是一百五十字`}>
            </MeritCardRandomWrapper>
            <MeritCardRandomWrapper
              width={"350px"} height={"200px"}
              author={"法德"}
              timestamp={"2024-01-20"}
              meritSource="持誦楞嚴神咒 4次"
              text={"Segne den Schöpfer und sein Wasser. Segne das Kommen und Gehen von Ihm. Möge sein Durchgang die Welt reinigen. Möge Er die Welt für Sein Volk bewahren"}>
            </MeritCardRandomWrapper>
          </section>
        </div>
      </section>



      {/* <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}>
        <Video 
          h={"auto"} 
          w={(0.609448 * screenWidth + 145.576).toString()} 
          // w={"1280px"}
          showControls={true} notSupportedMessage={"Your browser does not support the video tag."}
          link={"/meditationhall.mp4"}
          captions={{ lang: "zh-hant", src: "" }}>        
        </Video>
        <h3 style={{
    fontSize: "2em",
    color: "white",
    margin: "0.5em",
  }}>聽風 聽海 聽自心</h3>
        <h3 style={{
    fontSize: "2em",
    color: "white",
    margin: "0.5em",
  }}>觀山 觀海 觀自在</h3>
      </div> */}






      {/* <GeolocationAPI></GeolocationAPI> */}

      {/* <div style={{
    display: "flex",
    border: "pink 2px solid"
  }}>
        <Image src={LineAddFriendQR} alt={"Scan QR Code (https://line.me/R/ti/p/@185tteka?from=page&accountId=185tteka) to Add Friend on LINE"}></Image>
        <p>
        Add LINE Friends via QR Code
        Open the Friends tab in your LINE app, tap the add friends icon in the top right, select "QR code," and then scan this QR code.
        </p>
      </div> */}

      {/* <br></br>
<p>
WIP...
      觀山 觀海 觀自在
寶嚴快訊
Read More
【楞嚴神咒建寶嚴】邀請您的加入
廣度眾生苦，禮讚新「僧」命─寶嚴禪寺2024 年2 月22 日于高雄圓道禪院舉行新佛子剃度大典
見輝法師疫情後首次赴美弘法，為華人世界帶來新的心靈啟迪
2024年甲辰龍年點【常年光明燈】開始登記
【好書推薦】《剛剛好的般若—好好讀金剛經》正式上架
千佛住錫迎新春 上燈叩鐘慶龍年
迎好年笑開懷，新年走春即時報導
寶嚴禪寺2024走春祈福迎祥龍
灶火爐暖祥瑞臨，歲末圍爐特別報導
見輝法師與音樂製作人郭蘅祈（郭子）攜手錄製《華嚴初會 萬象昭回》
Read More
寶嚴新聞


</p> */}

      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}

            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}
    </main>
  );
}

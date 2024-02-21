'use client'

import Image from "next/image";
// import styles from "./page.module.css";
import { Navbar } from "../components/Navbar";
import LineAddFriendQR from "@/public/lineAddFriendQR.png"
import { Video } from "@/components/Video"
import { Centerpiece } from "@/components/Centerpiece";
import { useEffect, useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // width: "100%",
  },
  videoContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

export default function Home() {
  const [screenHeight, setScreenHeight] = useState(834);
  const [screenWidth, setScreenWidth] = useState(414);

  useEffect(() => {
    setScreenWidth(window?.innerWidth);
    setScreenHeight(window?.innerHeight);
  });

  return (
    <main style={Style.main}>
      <Centerpiece h={screenHeight*0.5} w={screenHeight*0.5*0.32} altText={"寶嚴山寶嚴禪寺"} link={"/centerpiece.png"}></Centerpiece>

      <div style={Style.videoContainer}>
        <Video h={(screenWidth*0.57).toFixed(0)} w={(screenWidth-32).toString()} showControls={true} notSupportedMessage={"Your browser does not support the video tag."}
          link={"/meditationhall.mp4"} 
          filetype={"video/mp4"}>
        </Video>
      </div>
      
    <div>
      WIP
      <section>
        https://line.me/R/ti/p/@185tteka?from=page&accountId=185tteka
        <Image src={LineAddFriendQR} alt={"Scan to Add Friend on LINE"}></Image>
        <p>
        Add LINE Friends via QR Code
        Open the Friends tab in your LINE app, tap the add friends icon in the top right, select "QR code," and then scan this QR code.
        </p>
      </section>
    </div>

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

import Image from "next/image";
import styles from "./page.module.css";
import { Navbar } from "../components/Navbar";



export default function Home() {
  return (
    <main>
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

      <div className={styles.center}>
        <img src="https://static.wixstatic.com/media/673910_d682905ef1a241fdb306ad5d8b261892~mv2.png/v1/fill/w_99,h_311,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E5%AF%B6%E5%9A%B4%E5%B1%B1%E5%AF%B6%E5%9A%B4%E7%A6%AA%E5%AF%BA.png" alt="寶嚴山寶嚴禪寺.png"></img>
      </div>

      {/* <video preload="none" autoplay={false} loop={false} playsinline="true" src="https://video.wixstatic.com/video/673910_2dcbda9b64be42adb2a1429b5a7689d4/1080p/mp4/file.mp4"></video> */}

      <video width="980" height="554" controls={true}>
        <source src="https://video.wixstatic.com/video/673910_2dcbda9b64be42adb2a1429b5a7689d4/1080p/mp4/file.mp4" type="video/mp4"></source>
        <span>Your browser does not support the video tag.</span>
      </video>
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

寶嚴禪寺南區總部圓道禪院  高雄市鼓山區美術東八街8號

email：yuandaochanmonastery@gmail.com  

Tel：(07) 522-4676 / Fax: (07) 553-0053  /  Mobile: 0970-811-155
</p> */}
      

    </main>
  );
}

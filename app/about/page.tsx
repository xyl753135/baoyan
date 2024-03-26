'use client'

import Image, { StaticImageData } from "next/image";

import meditationLobby from "@/public/about/taiwan/meditationLobby.webp";
import monasticCommunity from "@/public/about/taiwan/monasticCommunity.webp";
import jianhui from "@/public/about/taiwan/jianhui2.jpg";
import chuancheng from "@/public/about/taiwan/chuancheng2.jpg";

import expand from "@/public/icons/expand.png"

import taipeiVenue1 from "@/public/about/taiwan/tpc/taipeiVenue1.jpg";
import useWindowSize from "@/utils/WindowResize";
import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  header: {
    fontFamily: "georgia",
    fontSize: "2rem",
    color: "white",
    fontWeight: "normal",
    textAlign: "center",
  },
  main: {
    display: "flex",
    flexDirection: "column"
  }
};

export default function Page() {
  const [screenWidth, screenHeight] = useWindowSize();
  return (
    <main style={Style.main}>
      <h1 style={Style.header}>認識寶嚴</h1>
      <br />
      {/* 寶嚴禪寺 */}
      <section>
        <h2>寶嚴禪寺</h2>
        <br />
        <article>
          <p>
            「寶」, 佛寶、法寶、僧寶。 「嚴」, 以楞嚴經、華嚴經為導,
            圓成依報嚴、正報嚴與眷屬嚴。
          </p>
          <p>
            又放光明名寶嚴, 此光能覺一切眾, 令得寶藏無窮盡, 以此供養諸如來。
            這是一座禪宗道場, 是僧團的安僧立命處, 是眾人心之嚮往處,
            是三界浪子的歸心處。
          </p>
          <p>
            緣起 台東, 好山, 好水, 藍天、湛海、乾淨的空氣、清洌的水質,
            卻是台灣的偏鄉, 世界的邊境, 致使台東出生的在地青年,
            多數離鄉背景在世界各地發展。 如今, 全球環保意識及靈性復興思潮再興,
            台東純淨無染的天與地, 成為追藍族與自然隱者的首選地。
            多年來走訪世界各地帶領禪修, 深明台東的禪修環境是渾然天成、得天獨厚,
            這片土地的風、水、山、海, 能使禪修者的見聞覺知當下滌慮、歇息,
            回歸本來面目, 契悟實相。 2021年因緣成熟,
            在蘊藏藍寶石的都蘭聖山山腳的都蘭平原, 覓得一袈裟地,
            規劃國際禪修及佛學研修中心,
            不意此處竟是家師十數年前曾密囑的東海岸國際學校用地
          </p>
        </article>
      </section>
      <br />
      <br />

      {/* Poem? */}
      <section>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
            湛藍的天、澄碧的海, <br />
            乾淨的空氣、清冽的水質, <br />
            日升太平洋、月落都蘭山,<br />
            於層巒翠峰下之海岸平原, <br />
            一座實踐百丈家風的禪宗道場,<br />
            一座具時代意義的華嚴藝術聖殿, <br />
            即將 啟動興建 興建理念
          </span>
          <Image
            src={meditationLobby}
            alt={"Meditation Building"}
            width={336.5}
            height={201.5}></Image>
        </div>
      </section>
      <br />
      <br />

      {/* 願景 */}
      <section>
        <h2>願景</h2>
        <br />
        <article>
          寶嚴禪寺的設計, 結合現代與傳統, 融合「休閒」與「修行」的多元道場。<br />
          以開悟楞嚴、富貴華嚴、般若金剛為導, 建立教理、禪定、福德三環一體的修學體系, <br />
          <br />
          觀山 觀雲 觀自在 <br />
          聽風 聽海 聽自心<br />
          無論一期一會的短暫造訪, <br />
          或長住禪堂閉關禪修, <br />
          或闔家團圓出遊玩樂,<br />
          或短暫逃離眾聲喧嘩。 <br />
          <br />
          從0歲~100歲, <br />
          都可在這遺世獨立的靜謐寺院中,<br />
          讓見、聞、覺、知覓得歸宿。 <br />
          見華藏莊嚴、聞海潮妙音、<br />
          嗅典雅熏香、嚐清甜尚味、 <br />
          覺浩氣天灸、知直徹本源, <br />
          狂心頓歇, 歇即菩提。
        </article>
      </section>
      <br />
      <br />

      {/* 寶嚴僧團 */}
      <section>
        <h2>寶嚴僧團</h2>
        <br />
        <article style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p>
            「人能弘道, 非道弘人」, 佛法的住世與弘揚, 需要清淨的僧伽。
            寶嚴僧團,
            依佛制「六和敬—身和同住、口和無諍、意和同悅、戒和同修、見和同解、利和同均」建立僧團,
            以「教理、福德、禪定」方向打造當代全方位僧團, 內證無上解脫之道,
            外行弘宗演教, 廣度有情。 「外現聲聞身, 內密無上印」
            僧團日常作息遵依叢林古制五堂功課精進行道, 清淨如法、依律行持。
          </p>
          <Image
            src={monasticCommunity}
            alt={"Monastic Community"}
            width={300}
            height={199}></Image>
          <p>
            「身行菩薩道, 廣度諸有情」 因應現代社會的弘法需求, 法師們皆全方位學習,
            廣學多聞, 化身千百億, 弘法論道、策劃活動、領眾共修、團隊合作,
            僧團法師不分年紀、戒臘、職務地平等發心,
            齊心協力完成一項一項具開創性的佛法弘化志業。
          </p>
        </article>
      </section>
      {/* VIP */}
      <br />
      <br />


      <article>
        <h2>VIPs</h2>
        <br />
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          // rowGap: "2em",
          // columnGap: "2em",
          justifyContent: "space-around",
          // border: "red 1px solid",
        }}>
          <Resume name={"傳塵大和尚"} 
            position={"寶嚴山寶嚴禪寺總住持, 台灣圓道佛教文化交流協進會理事長"} 
            tutelage={"師承臨濟宗第五十七世惟覺安公老和尚"}
            img={chuancheng}>
            <h5>【學歷】</h5>
            <span>
              澳洲新南威爾斯大學管理碩士<br />
            </span>
            <br />
            <h5>【簡介】</h5>
            <span>
              傳塵大和尚是全球持誦百萬華嚴發起人。<br />
            </span>
            <br />
          </Resume>
          <br />
          <Resume name={"見輝法師"} 
            position={"寶巖山寶嚴禪寺宗務長"} 
            tutelage={"師承臨濟宗第五十七世惟覺安公老和尚"}
            img={jianhui}>
            <h5>【學歷】</h5>
            <span>
              國立高師大 成人教育研究所博士<br />
              中台佛學研究所佛學碩士<br />
              澳洲雪梨大學 策略管理暨組織分析碩士<br />
              國立台灣大學 人類學系<br />
            </span>
            <br />

            <h5>【著作】</h5>
            <span>
              亙古一念 華嚴心鑰 2020<br />
              剛剛好的般若--好好讀金剛經 2024<br />
            </span>
            <br />

            <h5>【簡介】</h5>
            <span>
              以多元化角度闡釋佛法,<br />
              弘法行履遍及海內外各地 (中國、美國、澳洲、馬來西亞、新加坡等),<br />
              開創雲端共學體系, 適應現代人自主學習的特質,<br />
              推廣華嚴經、楞嚴經、金剛經等大乘經典, 祈使大眾深入經藏, 智慧如海。<br />
            </span>
            <br />
          </Resume>
        </div>
        
      </article>
      <br />
      <br />


      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // border: "white 1px solid",
        alignItems: "left"
      }}>
        <h2>寶嚴禪寺各分院資訊</h2>
        <br />
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          flexGrow: "0",
          flexBasis: "fit-content",
          rowGap: "2em",
          columnGap: "2em",
          justifyContent: "space-between",
          // border: "red 1px solid",
        }}>
          <Branch name={"台北寶嚴善首講堂"}
            location={"105台北市松山區光復北路112號11樓"}
            phone={"02-2577 2978"}
            maxHeight={"300px"} link={"/about/taiwan/tpc"}>
            <p>
              座落臺北小巨蛋與松山國際機場之間，繁忙的交通要道，匯聚精華薈萃之地，
              因應過往旅客的疲憊，盼在此開辦一座如理如法，以辦楞嚴經、華嚴經、金剛經為弘法的主要道場。
              走進講堂，質樸典雅，幽靜雅緻，吹走了壓力與奔忙留下了安心的寧靜，木桌拜墊仿若玄奘大師的譯經場，空間盡是般若聲。
            </p>
          </Branch>

          <Branch name={"新北寶嚴善覺講堂"}
            location={"220新北市板橋區四川路一段178-180號"}
            phone={"02-2964 6617"}
            maxHeight={"300px"} link={"/about/taiwan/ntpc"}>
            <p>
              講堂位於四川路, 公車站牌就在道場門口, 在車馬塵囂的都市中, 創造一方靜心安定的清涼地, 提供大眾禪修的機緣。
              室內設計現代新穎, 莊嚴殊勝, 隱身於車喧鬧市的心靈充電站。
              講堂兼具都會道場、宗務中心、佛學研修院、設計院、文創院、文化院、
              多媒體藝術實驗室、華嚴天地童童樂園及新聞直播室…等多元功能, 是未來寶嚴禪寺的微型展場暨研發中心。
              歡迎十方大眾前來參禪、聞法, 研修經藏, 開啟聞法之路。
            </p>
          </Branch>

          <Branch name={"桃園寶嚴善親學堂"}
            location={"325桃園市龍潭區百年路41號"}
            phone={"03-479 8285"}
            maxHeight={"300px"} link={"/about/taiwan/tyc"}>
            <p>
              座落於桃園市縣龍潭區百年大鎮的社區, 綠蔭成樹, 花木繁盛。
              寶嚴善親學堂於2022年8月中秋月圓前夕成立。善親學堂不只是一座道場,
              一方禪堂, 更是一座圖書館, 一間心靈加油站。成立的目的不是只有百年教育,
              更化身一畝慈善福田, 守護小鎮區民, 甚至桃竹苗居民大眾的飢渴心靈。
            </p>
          </Branch>

          <Branch name={"台中分院歡喜學堂"}
            location={"406台中市北屯區松竹五路二段27號"}
            phone={"04-2437 7011"}
            // btnLayout={"left"}
            maxHeight={"300px"} link={"/about/taiwan/tcc"}>
            <p>
              本學堂因應居民需求於2022年2月成立。這是一座道場也是一個學堂, 一樓大殿供奉釋伽牟尼佛,
              菩薩的莊嚴慈悲及法師善誘開示下, 眾生好奇與疑惑的心得到慰藉。本學堂以開悟楞嚴及富貴華嚴為導,
              引導眾生參與佛學課程, 佛畫班、插花班、金剛塔寫禪班總是有歡喜的佛子在此學習修行。
            </p>
          </Branch>

          <Branch name={"高雄總部圓道禪院"}
            location={"804高雄市鼓山區美術東八街8號"}
            phone={"07-522 4676"}
            maxHeight={"300px"} link={"/about/taiwan/ksc"}>
            <p>
              圓道禪院於民國一百年一月一日成立, 本院以秉持著佛教慈悲濟世之精神教化人心,
              並關懷社會各階層, 及推動多元文化交流, 以促進全國及國際之宗教融合為本會宗旨。
              座落於高雄市美術館特區, 本院享有著塵囂當中的一絲祥和與寧靜的氣氛。
            </p>
          </Branch>
        </div>
      </div>
    </main>
  );
}


type ResumeProps = {
  name: string,
  position: string,
  tutelage: string,
  img: StaticImageData,
  children: JSX.Element[] | JSX.Element
}

const Resume = ({
  name,
  position,
  tutelage,
  img,
  children
}: ResumeProps) => {
  const [visibility, setVisibility] = useState<Boolean>(false);
  return (
    <section style={{width: "450px"}}>
      <section style={{ display: "flex", flexDirection: "row" }}>
        <Image
          src={img}
          alt={name}
          width={150}
          height={150}
          style={{ borderRadius: "50%" }}>
        </Image>
        <div
          style={{ marginLeft: "1em", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          onClick={() => { setVisibility(!visibility) }}>
          <h3>{name}</h3>
          {/* <br /> */}
          <h4>{position}</h4>
          {/* <br /> */}
          <h4>{tutelage}</h4>
          <p>...更多</p>
        </div>
      </section>
      {
        visibility ?
          <section>
            {children}
          </section>
          :
          <></>
      }
    </section>
  )
}


type BranchProps = {
  name: string,
  location: string,
  phone: string,
  children: JSX.Element[] | JSX.Element,
  maxHeight: string,
  btnLayout?: "left" | "right",
  link: string,
  label?: string
}

const Branch = ({
  name,
  location,
  phone,
  children,
  maxHeight,
  btnLayout = "right",
  link,
  label = "更多..."
}: BranchProps) => {
  const [visibility, setVisibility] = useState<Boolean>(false);
  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      width: "340px"
    }} >
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        {btnLayout == "left" ?
          <Image src={expand}
            alt={"Click to Expand"}
            height={40}
            width={40}
            style={{
              rotate: visibility ? "180deg" : "0deg",
              transition: "all 300ms linear",
              filter: "invert(1)",
              cursor: "pointer"
            }}
            onClick={() => setVisibility(!visibility)}></Image>
          :
          <></>
        }
        <div>
          <h2>{name}</h2>
          <div>{location}</div>
          <div>{`電話: ${phone}`}</div>
        </div>
        {btnLayout == "right" ?
          <Image src={expand}
            alt={"Click to Expand"}
            height={40}
            width={40}
            style={{
              rotate: visibility ? "180deg" : "0deg",
              // transform: visibility ? "scaleY(-1)" : "scaleY(1)", // flips icon vertically
              transition: "all 300ms linear",
              filter: "invert(1)",
              cursor: "pointer"
            }}
            onClick={() => setVisibility(!visibility)}></Image>
          :
          <></>
        }
      </div>
      <div style={{
        transition: visibility ? "all 500ms ease" : "all 500ms ease",
        position: "relative",
        overflow: "hidden",
        opacity: visibility ? "1" : "0",
        height: visibility ? maxHeight : "0px",
      }}>
        <br></br>
        {children}
        <br></br>
        <a href={link} target="_self">{label}</a>
      </div>

    </section>
  )
}
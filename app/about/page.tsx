'use client'

import Image from "next/image";

import { ExpandingCard } from "@/components/ExpandingCard";

import meditationLobby from "@/public/meditationLobby.webp";
import taipeiVenue1 from "@/public/taipeiVenue1.jpg";
import taipeiVenue2 from "@/public/taipeiVenue2.jpg";
import taipeiVenue3 from "@/public/taipeiVenue3.webp";
import useWindowSize from "@/utils/WindowResize";

const Style: { [key: string]: React.CSSProperties } = {
  header: {
    fontFamily: "georgia",
    fontSize: "2rem",
    color: "white",
    fontWeight: "normal",
    textAlign: "center",
    paddingBottom: "1rem",
  },
  
};

export default function Page() {
  const [screenWidth, screenHeight] = useWindowSize();
  return (
    <main>
      <h1 style={Style.header}>認識寶嚴</h1>
      <div>
        <section style={Style.card}>
          <h2 style={Style.cardTitle}>台北寶嚴善首講堂</h2>
          <div style={Style.cardContents}>
            <div style={Style.cardContentsImages}>
              <Image
                src={taipeiVenue1}
                alt={"Taipei venue"}
                width={screenWidth/2}
                height={screenHeight/2}
              ></Image>
              <div>
                <Image
                  src={taipeiVenue2}
                  alt={"Taipei venue"}
                  width={screenWidth/4}
                height={screenHeight/4}
                ></Image>
                <Image
                  src={taipeiVenue3}
                  alt={"Taipei venue"}
                  width={screenWidth/4}
                height={screenHeight/4}
                ></Image>
              </div>
              <div>
                <Image
                  src={taipeiVenue2}
                  alt={"Taipei venue"}
                  width={screenWidth/4}
                  height={screenHeight/4}
                ></Image>
                <Image
                  src={taipeiVenue3}
                  alt={"Taipei venue"}
                  width={screenWidth/4}
                  height={screenHeight/4}
                ></Image>
              </div>
            </div>
            <div style={Style.cardContentsText}>
              半畝方塘一鑑開<br></br>
              天光雲影共徘徊<br></br>
              這是一座道場, 這是一個教育中心,
              更是一個隱身繁華都市叢林中的歇心、讀心、明心處<br></br>
              <br></br>
              <h4>道場成立緣由</h4>
              <br></br>
              2020 ~ 2022年新冠疫情席捲全球, 這兩年的疫情, 限制人類行動自由,
              反而促使生活及產業形態多樣出格。<br></br>
              寶嚴禪寺宗務長見輝法師首開先例, 以雲端共修的方式,
              讓恐慌在家的民眾也可以跟上誦經的行列, 特別是身處北部居民,{" "}
              <br></br>
              置身在擁擠與壓力及快節奏的生活,
              面對疫情巨大變化與時時瀰漫焦慮不安的氛圍中, <br></br>
              因此極需找一處能讓眾生在外在壓力的襲捲下能有靜心歇心的道場,
              得以解脫煩惱, 身心自在。<br></br>
              <br></br>
              <h4>紅塵滾滾修行地</h4>
              <br></br>
              座落臺北小巨蛋與松山國際機場之間, 繁忙的交通要道,
              匯聚精華薈萃之地, 因應過往旅客的疲憊, <br></br>
              盼在此開辦一座如理如法,
              以辦楞嚴經、華嚴經、金剛經為弘法的主要道場。 <br></br>
              <br></br>
              <h4>上善若水~法筵立於寶嚴善首 </h4>
              <br></br>
              寶嚴善首<br></br>
              鎮山石駐立於台北寶嚴善首講堂,
              意義非凡！山水白瀑之石代表有德善知識, 啟轉法輪,
              如甘露水潤澤、利益有情。 <br></br>
              源頭活水清如渠, 富貴華嚴迎牡丹。走進講堂, 質樸典雅, 幽靜雅緻,
              吹走了壓力與奔忙留下了安心的寧靜, <br></br>
              木桌拜墊仿若玄奘大師的譯經場, 空間盡是般若聲。 <br></br>
              <br></br>
              大殿供奉木雕千手千眼觀世音菩薩, 莊嚴慈悲視眾生, 解除六道眾生苦。
              <br></br>
              <br></br>
              初發心的道場~ <br></br>
              歷經一年半載 <br></br>
              雖未 <br></br>
              遊歷湮水百城 <br></br>
              <br></br>
              干里之行, 始於足下, <br></br>
              祈願一起開創歷史 <br></br>
              一起見證修行之路。 <br></br>
              <br></br>
              本院地址: 台北市松山區光復北路112號11樓 <br></br>
              ​連絡電話: 02-25772978 <br></br>

              台北寶嚴善首講堂 2024 課程表
              立即報名:
              https://docs.google.com/forms/d/e/1FAIpQLSdQnM30NAz3IkRYLWGiozaRepW85rxpgT0ye3wJW9Ai87VVxQ/viewform?pli=1
            </div>
          </div>
        </section>

        <ExpandingCard title={"新北寶嚴善覺講堂"} 
            imgSrc={taipeiVenue1} imgAlt={"Taipei venue"} w={screenWidth/3} h={screenHeight/3} 
            description={"於2024年3月，一座涵蓋「藝術、教育、慈善、學術等多功能」的新北寶嚴善覺講堂，終於在大眾的期盼下於焉誕生。"}
            link={"/about/newtaipei"}
            label={"Read more..."}>
                <br></br>
                <p>板橋不但是新北市交通、經濟的樞紐，更有著悠遠的歷史文化及豐富的人文藝術氣息。
                    寶嚴善覺講堂位置優越，交通便捷，大眾運輸四通八達，「福星里」公車站牌就在道場門口，
                    在車馬塵囂的都市中，創造一方靜心安定的清涼地，提供大眾熏習佛法的機緣。正門的觀世音菩薩，
                    以慈悲微笑歡迎大眾，大殿供奉釋迦牟尼佛安詳俯視絡繹訪客，濟世眾生。室內設計現代新穎，莊嚴殊勝，
                    不僅是一座弘法及教育的道場，更是一座心靈充電站。這座兼具都會道場、宗務中心、佛學研修院、設計院、
                    文創院、文化院、多媒體藝術實驗室、華嚴天地童童樂園及新聞直播室…等多元功能，是未來寶嚴禪寺的微型展場以及研發中心。
                    寶嚴善覺講堂隨時歡迎信眾參禪、聞法，研修經藏，廣邀菩薩雲來集，開啟眾生聞法之路。
                </p>
                <br></br>
        </ExpandingCard>

        <section style={Style.card}>
          <h2>桃園寶嚴善親學堂</h2>
          <p></p>
        </section>

        <section style={Style.card}>
          <h2>台中寶嚴歡喜學堂</h2>
          <p></p>
        </section>

        <section style={Style.card}>
          <h2>高雄圓道禪院</h2>
          <p></p>
        </section>
      </div>
      <h1>寶嚴禪寺</h1>
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
      <Image
        src={meditationLobby}
        alt={"Meditation Building"}
        width={673}
        height={403}
      ></Image>
      湛藍的天、澄碧的海, 乾淨的空氣、清冽的水質, 日升太平洋、月落都蘭山,
      於層巒翠峰下之海岸平原, 一座實踐百丈家風的禪宗道場,
      一座具時代意義的華嚴藝術聖殿, 即 將 啟動興建 興建理念 IMG IMG-text 願景
      寶嚴禪寺的設計, 結合現代與傳統, 融合「休閒」與「修行」的多元道場。
      以開悟楞嚴、富貴華嚴、般若金剛為導,
      建立教理、禪定、福德三環一體的修學體系, 觀山 觀雲 觀自在 聽風 聽海 聽自心
      無論一期一會的短暫造訪, 或長住禪堂閉關禪修, 或闔家團圓出遊玩樂,
      或短暫逃離眾聲喧嘩。 從0歲~100歲, 都可在這遺世獨立的靜謐寺院中,
      讓見、聞、覺、知覓得歸宿。 見華藏莊嚴、聞海潮妙音、
      嗅典雅熏香、嚐清甜尚味、 覺浩氣天灸、知直徹本源, 狂心頓歇, 歇即菩提。
      寶嚴僧團 IMG 「人能弘道, 非道弘人」, 佛法的住世與弘揚, 需要清淨的僧伽。
      寶嚴僧團,
      依佛制「六和敬—身和同住、口和無諍、意和同悅、戒和同修、見和同解、利和同均」建立僧團,
      以「教理、福德、禪定」方向打造當代全方位僧團, 內證無上解脫之道,
      外行弘宗演教, 廣度有情。 「外現聲聞身, 內密無上印」
      僧團日常作息遵依叢林古制五堂功課精進行道, 清淨如法、依律行持。
      「身行菩薩道, 廣度諸有情」 因應現代社會的弘法需求, 法師們皆全方位學習,
      廣學多聞, 化身千百億, 弘法論道、策劃活動、領眾共修、團隊合作,
      僧團法師不分年紀、戒臘、職務地平等發心,
      齊心協力完成一項一項具開創性的佛法弘化志業。 寶嚴山寶嚴禪寺總住持
      傳塵大和尚 師承臨濟宗第五十七世惟覺安公老和尚 【現任】
      寶嚴山寶嚴禪寺總住持 台灣圓道佛教文化交流協進會理事長 【學歷】
      澳洲新南威爾斯大學管理碩士 【簡介】傳塵大和尚是全球持誦百萬華嚴發起人。
      IMG 寶嚴山寶嚴禪寺宗務長 見輝法師 師承臨濟宗第五十七世惟覺安公老和尚
      【現任】 寶巖山寶嚴禪寺宗務長 【學歷】 國立高師大 成人教育研究所博士
      中台佛學研究所佛學碩士 澳洲雪梨大學 策略管理暨組織分析碩士 國立台灣大學
      人類學系 【著作】 亙古一念 華嚴心鑰 2020 剛剛好的般若--好好讀金剛經 2024
      【簡介】 以多元化角度闡釋佛法,
      弘法行履遍及海內外各地（中國、美國、澳洲、馬來西亞、新加坡等）,
      開創雲端共學體系, 適應現代人自主學習的特質,
      推廣華嚴經、楞嚴經、金剛經等大乘經典, 祈使大眾深入經藏, 智慧如海。 IMG
      VIDEO 寶嚴禪寺各分院資訊 台北寶嚴善首講堂
      地址：105台北市松山區光復北路112號11樓 電話： 02-2577 2978 ​
      新北寶嚴善覺講堂 地址：220新北市板橋區四川路一段178-180號 電話： 02-2964
      6617 ​ 桃園寶嚴善親學堂 地址： 325桃園市龍潭區百年路41號 電話： 03-479
      8285 ​ 台中分院歡喜學堂 地址：406台中市北屯區松竹五路二段27號 電話：
      04-2437 7011 ​ 高雄總部圓道禪院 地址：804高雄市鼓山區美術東八街8號 電話：
      07-522 4676
    </main>
  );
}

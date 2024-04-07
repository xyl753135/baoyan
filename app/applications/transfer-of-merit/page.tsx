'use client'

import { Centerpiece } from "@/components/Centerpiece";
import { MeritCard } from "@/components/TransferOfMerit/MeritCard";
import { TransferOfMerit } from "@/components/TransferOfMerit/TransferOfMerit";
import { ChangeEvent, useState } from "react";

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
  }
};

export default function Home() {

  const todayDate = new Date(Date.now());
  const yyyymmdd = `${todayDate.getFullYear()}-${String(todayDate.getMonth()+1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;
  
  const [sDate, setSDate] = useState<string>(yyyymmdd);
  const [eDate, setEDate] = useState<string>(yyyymmdd);
  const [queryResults, setQueryResults] = useState<JSX.Element[]>();

  function searchTransfers(formdata: FormData): void {
    // Get form data
    const sDateForm = String(formdata.get("sDate"));  // format yyyy-mm-dd
    const eDateForm = String(formdata.get("eDate"));  // format yyyy-mm-dd
    // console.log(sDate, eDate);
    
    // Validate form data
    if (sDateForm > yyyymmdd) {
      alert("不可查詢未來。");
    }

    // Query database
    const fetchData = [
      {
        id: "1",
        author:"法智",
        timestamp:sDateForm,
        meritSource:"持誦楞嚴神咒 3次",
        text:"迴向寶藏禪寺建設早日圓滿、一切無礙。家人福慧雙修無礙。阿彌陀佛。",
      },
      {
        id: "2",
        author:"法智",
        timestamp:eDateForm,
        meritSource:"持誦楞嚴神咒 2次",
        text:"迴向寶嚴禪寺建設順利圓滿、一切無礙回向工作、一切無礙回向家人、一切安康迴向法界、共入佛智",
      }
    ];

    // Update UI with results
    setQueryResults(fetchData.map((each => 
      <MeritCard
        key={each.id}
        width={"350px"} height={"200px"}
        author={each.author}
        timestamp={each.timestamp}
        meritSource={each.meritSource}
        text={each.text}>
      </MeritCard>
    )));
  }

  return (
    <main style={Style.main}>
      <div style={Style.column}>
        <h3 style={Style.colHeader}>本人回向查詢</h3>
        <form action={searchTransfers}>
          <div style={Style.dateQueryUI}>
            <div>
              {/* sDate */}
              <div style={{width: "200px", display: "flex", justifyContent: "space-between"}}>
                <label htmlFor="sDate" style={Style.formfieldLabel}>Start date:</label>
                <input type="date" name="sDate" id="sDate" 
                  onChange={(event) => {
                    if (eDate < event.target.value) {
                      setEDate(event.target.value);
                    }
                    setSDate(event.target.value);
                  }}
                  value={sDate} />
              </div>
              {/* eDate */}
              <div style={{width: "200px", display: "flex", justifyContent: "space-between"}}>
                <label htmlFor="eDate" style={Style.formfieldLabel}>End date:</label>
                <input type="date" name="eDate" id="eDate" 
                  onChange={(event) => {
                    if (sDate > event.target.value) {
                      setEDate(sDate);
                    } else {
                      setEDate(event.target.value);
                    }
                  }}
                  value={eDate} />
              </div>
              {/* limit */}
              <div style={{width: "200px", display: "flex", justifyContent: "space-between"}}>
                <label htmlFor="limit" style={Style.formfieldLabel}>數量上限:</label>
                <select id="limit" name="limit" style={{ width: "112px", textAlign: "right"}}>
                  <option value="5">5 個</option>
                  <option value="10">10 個</option>
                  <option value="all">全部</option>
                </select>
              </div>
            </div>
            <div style={{display:"flex"}}>
              <button style={{
                  width: "100px",
                  flexGrow: "1",
                  fontSize:"24px", 
                  display: "flex", alignItems: "center", justifyContent: "space-around",
                  fontWeight: "bold",
                  background: "saddlebrown",
                  border: "white 1px solid",
                  borderRadius: "5px",
                  padding: "2px",
                  color: "white"
                }}
                type="submit">查詢</button>
            </div>
          </div>
        </form>
        {
          queryResults
        }
      </div>

      {/* <TransferOfMerit></TransferOfMerit> */}
      <Centerpiece
        h={400} w={400 * 0.32}
        altText={"寶嚴山寶嚴禪寺"}
        link={"/centerpiece.png"}></Centerpiece>

      <div style={Style.column}>
        <section style={{display:"flex", gap:"1em"}}>
          <h3 style={Style.colHeader}>最新回向</h3>
          <button>更新</button>
        </section>
        {/* Most-recent Merit cards */}
        <section style={Style.meritCards}>
          <MeritCard
            width={"350px"} height={"200px"}
            author={"BestNun123"}
            timestamp={"2024-01-01"}
            meritSource="持誦楞嚴神咒 1次"
            text={"Hello world, This is 40 characters! ♥♥♥♥"}>
          </MeritCard>
          <MeritCard
            width={"350px"} height={"200px"}
            author={"一二三四五六七八九十超級長用戶名的使用者範例..."}
            timestamp={"2024-01-20"}
            meritSource="持誦楞嚴神咒 7次"
            text={"一二三四五六七八九十一二三四五這是二十字"}>
          </MeritCard>
          <MeritCard
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
          </MeritCard>
          <MeritCard
            width={"350px"} height={"200px"}
            author={"法德"}
            timestamp={"2024-01-20"}
            meritSource="持誦楞嚴神咒 4次"
            text={"Segne den Schöpfer und sein Wasser. Segne das Kommen und Gehen von Ihm. Möge sein Durchgang die Welt reinigen. Möge Er die Welt für Sein Volk bewahren"}>
          </MeritCard>
        </section>
      </div>
    </main>
  );
}

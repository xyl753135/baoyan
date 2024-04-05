'use client'

import { Centerpiece } from "@/components/Centerpiece";
import { MantraApp } from "@/components/MantraApp/MantraApp"

const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
};

export default function Home() {

  return (
    <main style={Style.main}>
      <MantraApp ></MantraApp>
      <Centerpiece 
        h={400} w={400*0.32} 
        altText={"寶嚴山寶嚴禪寺"} 
        link={"/centerpiece.png"}></Centerpiece>
    </main>
  );
}

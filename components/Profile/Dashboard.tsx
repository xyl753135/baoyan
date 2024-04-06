'use client'

import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";
import { createNotification } from "@/utils/LocalNotificationsHelper"

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // border: "red 2px dotted",
    background: "#455d7a"
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "1em",
    paddingBottom: "1em",
    // border: "red 2px dotted",
    
  },
  btn: {
    margin: "0.2em",
    // paddingLeft: "0.5em",
    // paddingRight: "0.5em",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    border: "white 1px solid",
    borderRadius: "5px",
    background: "saddlebrown",
    cursor: "pointer",
    transition: "all 200ms ease-out"
  },
  img: {
    
  }
};

type Props = {
    h: number | string,
    w: number | string,
    buttonDatas: Array<Array<{ 
      imgPath:string, 
      btnLabel:string, 
      redirectPath:string, 
      filter:string }>>,
}

export const Dashboard = ({
    h,
    w,
    buttonDatas,
}: Props) => {

 const items = buttonDatas.map((eachRow, rowIndex) => (
  <div style={Style.btnRow} key={`row-${rowIndex}`}>
    {eachRow.map((item, itemIndex) => (
      <a href={item.redirectPath}
        target="_self"
        style={{
          ...Style.btn,
          flexBasis: eachRow.length == 2 ? "40%" : eachRow.length == 1 ? "90%" : "24%",
        }} 
        key={`item-${itemIndex}`}
        onClick={() => {
          createNotification("施工中", "請稍後再回來關注", true, "WIP");
        }}>
        <Image width={45} height={45} 
          alt={`Text${itemIndex+1}`} 
          src={item.imgPath}
          style={{
            ...Style.img,
            filter: item.filter}}></Image>
        <p>{item.btnLabel}</p>
      </a>
    ))}
  </div>
));
    
  
  return (
    <section style={{height:h, width:w, ...Style.container}}>
      {items}
    </section>
  );
  
};
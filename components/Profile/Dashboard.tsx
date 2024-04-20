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
    background: "#455d7a",
    maxWidth: "700px"
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
    cursor: "pointer",
    transition: "all 200ms ease-out",
    color: "white"
  },
  img: {

  }
};

type Props = {
  h: number | string,
  w: number | string,
  buttonDatas: Array<Array<{
    imgPath: string,
    btnLabel: string,
    redirectPath: string,
    filter: string,
    bgColor: string
  }>>,
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
            background: item.bgColor,
            flexBasis: eachRow.length == 2 ? "40%" : eachRow.length == 1 ? "90%" : "24%",
          }}
          key={`item-${itemIndex}`}
          onClick={() => {
            createNotification(`前往${item.btnLabel}`, "", false, "nav");
          }}>
          <Image width={45} height={45}
            alt={`${item.btnLabel}${itemIndex + 1}`}
            src={item.imgPath}
            style={{
              ...Style.img,
              filter: item.filter
            }}></Image>
          <p>{item.btnLabel}</p>
        </a>
      ))}
    </div>
  ));


  return (
    <section style={{ height: h, width: w, ...Style.container }}>
      {items}
      <div >
        <form 
          style={Style.btnRow}
          action={async () => {
            const response = await fetch('/api/auth/logout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({}),
            });
            redirect("/");
          }}>
          <button 
            style={{
              ...Style.btn,
              background: "#3b3b3b",
              flexBasis: "120px",
            }}
            type="submit">
            <Image width={45} height={45}
              alt={`登出`}
              src={"/icons/dashboard/logout.png"}
              style={{
                ...Style.img,
                filter: "invert(1)"
              }}>
            </Image>登出</button>
        </form>
      </div>
    </section>
  );

};
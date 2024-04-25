'use client'

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { Modal } from "../Modals/Modal";

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    // border: "white 2px solid",
    // borderRadius: "5px",
    // background: "#455d7a",
    maxWidth: "700px",

    paddingLeft: "10px",
    paddingRight: "10px",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",


  },
  btn: {
    width: "140px",
    // paddingRight: "0.5em",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    gap: "5px",

    border: "white 1px solid",
    borderRadius: "5px",

    cursor: "pointer",
  },
  label: {
    color: "white",
    fontSize: "18px"
  }
};

type Props = {
  h: number | string,
  w: number | string,
  userData: any,
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
  userData,
  buttonDatas,
}: Props) => {

  const router = useRouter();

  const items = buttonDatas.map((eachRow, rowIndex) => (
    <div style={Style.btnRow} key={`row-${rowIndex}`}>
      {
        eachRow.map((item, itemIndex) => (
          <a href={item.redirectPath}
            target="_self"
            style={{
              ...Style.btn,
              background: item.bgColor,
            }}
            key={`item-${itemIndex}`}>
            <Image width={45} height={45}
              alt={`${item.btnLabel}${itemIndex + 1}`}
              src={item.imgPath}
              style={{
                ...Style.img,
                filter: item.filter
              }}></Image>
            <p style={Style.label}>{item.btnLabel}</p>
          </a>
        ))
      }
    </div>
  ));

  async function save() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    redirect("/");
  }

  return (
    <section style={{ height: h, width: w, ...Style.container }}>
      {
        userData.email == "" || userData.email == undefined || userData.email == null ?
          <Modal showCloseBtn={true}
            title={"警告"} body={"目前帳號沒要電子郵件地址，如果忘記密碼系統會無法協助找回帳號"}
            showBtnLeft={true} btnLeftLabel={"立即處理"} btnLeftOnClick={() => {
              router.push("/profile");
            }}
            showBtnRight={false} btnRightLabel={"暫時不處理"} btnRightOnClick={() => {
              console.log('clicked!');
            }}>
          </Modal>
          :
          <></>
      }

      {items}
      <div >
        <form
          style={Style.btnRow}
          action={save}>
          <button
            type="submit"
            style={{
              ...Style.btn,
              background: "#3b3b3b",
              // flexBasis: "120px"
            }}>
            <Image width={45} height={45}
              alt={`登出`}
              src={"/icons/dashboard/logout.png"}
              style={{
                ...Style.img,
                filter: "invert(1)"
              }}></Image>
            <p style={Style.label}>登出</p>
          </button>
        </form>
      </div>
    </section>
  );

};
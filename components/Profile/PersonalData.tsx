'use client'

import { useState } from "react";
import Image from "next/image";


import { InputGroup } from "@/components/Form/InputGroup";
import { SelectGroup } from "@/components/Form/SelectGroup";

import { createNotification } from "@/utils/LocalNotificationsHelper"

type Props = {
    userData: {
        username: string,
        name: string,
        bname: string,
        line: string,
        whatsapp: string,
        email: string,
        phone: string,
        country: string,
        locale: string,
        dob: string,
    }
}

export const PersonalData = ({
    userData
}: Props) => {
    const [name, setName] = useState(userData.name);
    const [bname, setBname] = useState(userData.bname);
    const [line, setLine] = useState(userData.line);
    const [whatsapp, setWhatsapp] = useState(userData.whatsapp);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);
    const [dob, setDob] = useState(userData.dob);

    function savePersonalData(formData: FormData) {
        const nameInput = formData.get("nameInput");
        const bnameInput = formData.get("bnameInput");
        const lineInput = formData.get("lineInput");
        const whatsappInput = formData.get("whatsappInput");
        const emailInput = formData.get("emailInput");
        const phoneInput = formData.get("phoneInput");
        const dobInput = formData.get("dobInput");
        const countrySelect = formData.get("countrySelect");
        const localeSelect = formData.get("localeSelect");
        console.log("user submitted ",
            nameInput, 
            bnameInput, 
            lineInput,
            whatsappInput,
            emailInput,
            phoneInput,
            dobInput,
            countrySelect,
            localeSelect
        );
        createNotification(
            "使用者儲存了個人資料", 
            [
                nameInput, 
                bnameInput, 
                lineInput,
                whatsappInput,
                emailInput,
                phoneInput,
                dobInput,
                countrySelect,
                localeSelect
            ].join(","), 
            false);
    }

    return (
        <section 
            style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-around",
                alignItems: "center",
                height: "800px",
                width: "350px",
                paddingLeft: "0.5em",
                paddingRight: "0.5em",
                // border: "#233142 2px solid",
                background: "#455d7a"
        }}>
            <Image src={"/icons/role_admin.png"} alt={"admin"} width={100} height={100}
                style={{
                    borderRadius: "50%",
                    background: "#f95959",
                    border: "#e3e3e3 3px solid",
                    filter: "invert(1)",
                    margin: "2em"
                }}></Image>
            <label style={{
                color:"white",
                fontSize: "24px"
            }}>{userData.username}</label>
            <br></br>
            <form
                action={savePersonalData}
                style={{
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-around",
                }}>
                <InputGroup
                    placeholder={userData.name}
                    id={"nameInput"}
                    maxLength={255}
                    errorMsg={""}
                    changeHandler={(event) => setName(event.target.value)}
                    width={155}
                    value={name} readOnly={false} label={"姓名"}></InputGroup>
                <InputGroup
                    placeholder={userData.bname}
                    id={"bnameInput"}
                    maxLength={30}
                    errorMsg={""}
                    changeHandler={(event) => setBname(event.target.value)}
                    width={155}
                    value={bname} readOnly={false} label={"法名"}></InputGroup>
                <InputGroup
                    placeholder={userData.line}
                    id={"lineInput"}
                    maxLength={30}
                    errorMsg={""}
                    changeHandler={(event) => setLine(event.target.value)}
                    width={155}
                    value={line} readOnly={false} label={"LINE ID"}></InputGroup>
                <InputGroup
                    placeholder={userData.whatsapp}
                    id={"whatsappInput"}
                    maxLength={30}
                    errorMsg={""}
                    changeHandler={(event) => setWhatsapp(event.target.value)}
                    width={155}
                    value={whatsapp} readOnly={false} label={"WhatsApp ID"}></InputGroup>
                <InputGroup
                    placeholder={userData.email}
                    id={"emailInput"}
                    type={"email"}
                    maxLength={30}
                    errorMsg={""}
                    changeHandler={(event) => setEmail(event.target.value)}
                    width={155}
                    value={email} readOnly={false} label={"電子郵件地址"}></InputGroup>
                <InputGroup
                    placeholder={userData.phone}
                    id={"phoneInput"}
                    type={"tel"}
                    maxLength={30}
                    errorMsg={""}
                    changeHandler={(event) => setPhone(event.target.value)}
                    width={155}
                    value={phone} readOnly={false} label={"手機號碼"}></InputGroup>
                <InputGroup
                    placeholder={userData.dob}
                    id={"dobInput"}
                    type={"date"}
                    maxLength={30}
                    errorMsg={""}
                    changeHandler={(event) => {
                        setDob(event.target.value);
                        // console.log(event.target.value)
                    }}
                    width={155}
                    value={dob} readOnly={false} label={"出生年月日"}></InputGroup>
                <SelectGroup
                    width={155}
                    errorMsg={""}
                    options={[
                        {
                            value: "",
                            label: "請選擇"
                        },
                        {
                            value: "tw",
                            label: "中華民國"
                        },
                        {
                            value: "cn",
                            label: "中華人民共和國"
                        },
                        {
                            value: "us",
                            label: "美國"
                        },
                        {
                            value: "my",
                            label: "馬來西亞"
                        },
                        {
                            value: "sg",
                            label: "新加坡"
                        },
                        {
                            value: "jp",
                            label: "日本"
                        },
                        {
                            value: "kr",
                            label: "韓國"
                        },
                        {
                            value: "vn",
                            label: "越南"
                        },
                        {
                            value: "ph",
                            label: "菲律賓"
                        },
                        {
                            value: "fr",
                            label: "法國"
                        },
                        {
                            value: "en",
                            label: "英國"
                        },
                        {
                            value: "de",
                            label: "德國"
                        },
                        {
                            value: "au",
                            label: "澳洲"
                        },
                    ]}
                    label={"國家"} defaultValue={userData.country} id={"countrySelect"}></SelectGroup>
                <SelectGroup
                    width={155}
                    errorMsg={""}
                    options={[
                        {
                            value: "",
                            label: "請選擇"
                        },
                        {
                            value: "klc",
                            label: "基隆市"
                        },
                        {
                            value: "ntpc",
                            label: "新北市"
                        },
                        {
                            value: "tpc",
                            label: "臺北市"
                        },
                        {
                            value: "tyc",
                            label: "桃園市"
                        },
                        {
                            value: "hsinchu",
                            label: "新竹縣"
                        },
                        {
                            value: "xzc",
                            label: "新竹市"
                        },
                        {
                            value: "miaoli",
                            label: "苗栗縣"
                        },
                        {
                            value: "tcc",
                            label: "臺中市"
                        },
                        {
                            value: "changhua",
                            label: "彰化縣"
                        },
                        {
                            value: "nantou",
                            label: "南投縣"
                        },
                        {
                            value: "yunlin",
                            label: "雲林縣"
                        },
                        {
                            value: "chiayi",
                            label: "嘉義縣"
                        },
                        {
                            value: "cyc",
                            label: "嘉義市"
                        },
                        {
                            value: "tnc",
                            label: "臺南市"
                        },
                        {
                            value: "ksc",
                            label: "高雄市"
                        },
                        {
                            value: "pingtung",
                            label: "屏東縣"
                        },
                        {
                            value: "taitung",
                            label: "屏東縣"
                        },
                        {
                            value: "hualien",
                            label: "花蓮縣"
                        },
                        {
                            value: "yilan",
                            label: "宜蘭縣"
                        },
                    ]}
                    label={"地區"} defaultValue={userData.locale} id={"localeSelect"}></SelectGroup>

                {/* Save error */}
                <div style={{ marginTop: "1em", fontSize: "20px", color: "rgb(255, 180, 68)", textAlign: "center" }}>
                    {/* {saveError} */}
                </div>

                {/* 
            <label htmlFor="email">個人頭像</label>
            <Image src={userData.profile_pic_path} alt={"Profile Pic"} width={50} height={50}></Image>
            <input type="file" name="profPic" id="profPic" value={userData.profile_pic_path}/>

            預設可選的頭像 (如果不上傳)
            <Image src={"/icons/role_admin.png"} alt={"admin"} width={100} height={100}></Image> ^ 管理員才看得到/可選這個
            <Image src={"/icons/role_user_m.png"} alt={"userM"} width={100} height={100}></Image>
            <Image src={"/icons/role_user_f.png"} alt={"userF"} width={100} height={100}></Image>
             */}


                {/* Form submit */}
                <button type="submit" style={{
                    // width: "80px",
                    fontSize: "24px",
                    display: "flex", alignItems: "center", justifyContent: "space-around",
                    fontWeight: "bold",
                    background: "saddlebrown",
                    border: "white 1px solid",
                    borderRadius: "5px",
                    padding: "2px"
                }}>
                    儲存
                </button>
                <br></br>
                {/* Other buttons */}
                <button style={{
                    // width: "80px",
                    fontSize: "24px",
                    display: "flex", alignItems: "center", justifyContent: "space-around",
                    fontWeight: "bold",
                    background: "#3EA99F",
                    border: "white 1px solid",
                    borderRadius: "5px",
                    padding: "2px"}}
                    onClick={() => createNotification("授權成功", "使用者授予了显示通知的权限", false)}
                >我想收到網站的通知</button>
                {/* <button style={{
            // width: "80px",
            fontSize: "24px",
            display: "flex", alignItems: "center", justifyContent: "space-around",
            fontWeight: "bold",
            background: "#4863A0",
            border: "white 1px solid",
            borderRadius: "5px",
            padding: "2px"
          }}>
            變更密碼
          </button>
          <br></br>
          <button style={{
            // width: "80px",
            fontSize: "24px",
            display: "flex", alignItems: "center", justifyContent: "space-around",
            fontWeight: "bold",
            background: "#C24641",
            border: "white 1px solid",
            borderRadius: "5px",
            padding: "2px"
          }}>刪除賬戶</button> */}

            </form>




        </section>
    )
}
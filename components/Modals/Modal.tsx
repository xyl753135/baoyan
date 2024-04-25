'use client'

import Image from "next/image";
import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        width: "100vw",
        height: "100vh",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        padding: "5px",
        position: "fixed",
        background: "rgba(49,49,49,0.8)",
        zIndex: "3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "20px",

        borderRadius: "5px",

        maxWidth: "600px",
        minWidth: "330px",

        display: "flex",
        flexDirection: "column",
        gap: "10px",

        zIndex: "4",
        color: "black"
    },
    modalCloseBtn: {
        padding: "2px 4px",
        fontSize: "16px",
        border: "black 2px solid",
        borderRadius: "5px",
        color: "black",
    }
};

type Props = {
    bgColor?: string,
    showCloseBtn: boolean,
    title: string,
    body: string,
    showBtnLeft: boolean,
    btnLeftLabel: string,
    btnLeftOnClick: Function,
    showBtnRight: boolean,
    btnRightLabel: string,
    btnRightOnClick: Function,
}

export const Modal = ({
    bgColor = "#f1f1f1",
    showCloseBtn,
    title,
    body,
    showBtnLeft,
    btnLeftLabel,
    btnLeftOnClick,
    showBtnRight,
    btnRightLabel,
    btnRightOnClick,
}: Props) => {

    const [showModal, setShowModal] = useState<Boolean>(true);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            {
                showModal ?
                    <div style={Style.container}>
                        <div style={{ ...Style.modalCard, background: bgColor, }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h2>{title}</h2>
                                {
                                    showCloseBtn ?
                                        <button style={{ ...Style.modalCloseBtn, background: "rgb(248, 131, 121)" }} onClick={toggleModal}>
                                            關掉
                                        </button>
                                        :
                                        <></>
                                }
                            </div>
                            <p>
                                {body}
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {
                                    showBtnLeft ?
                                        <button style={{ ...Style.modalCloseBtn, background: "yellowgreen" }} onClick={() => btnLeftOnClick()}>
                                            {btnLeftLabel}
                                        </button>
                                        :
                                        <></>
                                }
                                {
                                    showBtnRight ?
                                        <button style={{ ...Style.modalCloseBtn, background: "orange" }} onClick={() => btnRightOnClick()}>
                                            {btnRightLabel}
                                        </button>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                    </div >
                    :
                    <></>
            }
        </>

    );

};
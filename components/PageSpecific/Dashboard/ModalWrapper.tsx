'use client'

import { Modal } from "@/components/shared/Modals/Modal";
import { useRouter } from "next/navigation";



export const ModalWrapper = () => {

    const router = useRouter();

    return (
        <div>
            <Modal showCloseBtn={true}
                title={"警告"}
                body={"目前帳號沒要電子郵件地址，如果忘記密碼系統會無法協助找回帳號"}
                showBtnLeft={true}
                btnLeftLabel={"立即處理"} btnLeftOnClick={() => {
                    router.push("/profile");
                }}
                showBtnRight={false}
                btnRightLabel={"暫時不處理"}
                btnRightOnClick={() => {
                }}>
            </Modal>
        </div>
    )
}
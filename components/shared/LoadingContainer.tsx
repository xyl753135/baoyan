import Image, { StaticImageData } from "next/image";

import { useEffect, useState } from "react";


const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "black 2px solid",
    },
};

type Props = {
    showTitlecard: boolean,
    showLoading: boolean,
    showChildren: boolean,
    width: number,
    height: number,
    children: React.ReactNode
}

export const LoadingContainer = ({
    showTitlecard = false,
    showLoading = false,
    showChildren = false,
    width,
    height,
    children
}: Props) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoading = () => {
        setIsLoading(false);
    }

    useEffect(() => {
        window.addEventListener("load", handleLoading);
        return () => window.removeEventListener("load", handleLoading);
    }, [])
    return (
        <div style={Style.container}>
            {
                showTitlecard ? 
                <>
                    <Image src={"/placeholders/app_placeholder.gif"} alt={"Placeholder"} width={width} height={height}></Image>
                </>
                :
                <></>
            }
            {
                showLoading ? 
                <div style={{background:"white"}}>
                    <Image src={"/placeholders/gif_loading.gif"} alt={"准備中，請稍後。。。"}  width={width} height={height}></Image>
                </div>
                :
                <></>
            }
            {
                showChildren ? 
                <div style={{
                    width:width, height:height, 
                    display:"flex", flexDirection:"column",
                    justifyContent: "center", alignItems: "center" }}>
                    {children}
                </div>
                :
                <></>
            }
        </div>
    );
};
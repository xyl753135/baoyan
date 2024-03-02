'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "10rem",
    paddingBottom: "13rem",
    minHeight: "100%",
    // border: "red 2px dotted",
  },
  containerRevealed: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "10rem",
    paddingBottom: "13rem",
    // border: "red 2px dotted",
    
  },
  image: {
    // border: "white 2px solid",
    filter: "blur(5px) opacity(0%)",
    transform: "rotateY(90deg)",
  },
  imageRevealed: {
    // border: "white 2px solid",
    transition: "all 5s ease-out",
  },
};

type Props = {
    h: number,
    w: number,
    altText: string,
    link: string,
}

export const Centerpiece = ({
    h,
    w,
    altText,
    link,
}: Props) => {
  const [hovered, setHovered] = useState<Boolean>(false);
  useEffect(() => {
    setHovered(true)
  });
  return (
    <div style={hovered ? Style.containerRevealed : Style.container}>
        <Image style={hovered ? Style.imageRevealed : Style.image} src={link} alt={altText} width={w} height={h}></Image>
    </div>
  );

};
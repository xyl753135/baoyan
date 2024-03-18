'use client'

import Image, { StaticImageData } from "next/image";

// Image assets
import bg from "@/public/mantraWheel/images/mantra_bg.png"
import { useRef } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  button: {
    background: "none",
    border: "none",
    position: "relative",
    width: "220px",
    height: "220px",
    margin: "1em"
  },
  static: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
  }
};

type Props = {
  degree: number,
  overlaySrc: string | StaticImageData,
}

export const MantraWheel = ({
  degree,
  overlaySrc,
}: Props) => {

  const prevDegree = useRef(degree);
  let isRewind = prevDegree.current > degree;
  prevDegree.current = degree;
  // console.log("isRewind?", isRewind);
  
  return (
    <button style={Style.button}>
      {/* Background, Wheel */}
      <Image src={bg}
        style={Style.static}
        alt={"Mantra wheel"}
        height={220}
        width={220}
        loading={"eager"}
        priority={true}>
      </Image>
      {/* Overlay, Mantra text */}
      <Image
        style={ isRewind ?
          // Rewind animation
          {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2",
            rotate: `${degree}deg`,
            transition: "all 0ms linear",
          } :
          // Rotate animation
          {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2",
            rotate: `${degree}deg`,
            transition: "all 500ms linear",
          }
        }
        src={overlaySrc}
        alt={"Shurangama mantra"}
        height={220}
        width={220}
        loading={"eager"}>
      </Image>
    </button>
  );
};
'use client'

import Image, { StaticImageData } from "next/image";

// Image assets
import bg from "@/public/mantraWheel/images/mantra_bg.png"

const Style: { [key: string]: React.CSSProperties } = {
  button: {
    background: "none",
    border: "none",
    position: "relative",
    width: "220px",
    height: "220px",
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
        style={ degree == 0 ?
          // Rewind animation
          {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2",
            rotate: `${degree}deg`,
            transition: "all 3000ms ease-out",
          } :
          // Rotate animation
          {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2",
            rotate: `${degree}deg`,
            transition: "all 300ms linear",
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
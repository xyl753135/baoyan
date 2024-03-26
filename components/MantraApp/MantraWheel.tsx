'use client'

import Image, { StaticImageData } from "next/image";

const Style: { [key: string]: React.CSSProperties } = {
};

type Props = {
  degree: number,
  overlaySrc: string | StaticImageData,
  isRewind: boolean,
  wheelSize: number
}

export const MantraWheel = ({
  degree,
  overlaySrc,
  isRewind,
  wheelSize
}: Props) => {
  
  return (
    <button style={{
      background: "none",
      borderRadius: "50%",
      position: "relative",
      width: wheelSize,
      height: wheelSize,
    }}>
      {/* Background, Wheel
      <Image src={bg}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "1",
        }}
        alt={"Mantra wheel"}
        height={wheelSize}
        width={wheelSize}
        loading={"eager"}
        priority={true}>
      </Image> */}
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
            transition: "0s",
          } :
          // Rotate animation
          {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2",
            rotate: `${degree}deg`,
            transition: "all 900ms linear",
          }
        }
        src={overlaySrc}
        alt={"Shurangama mantra"}
        height={wheelSize}
        width={wheelSize}
        loading={"eager"}>
      </Image>
    </button>
  );
};
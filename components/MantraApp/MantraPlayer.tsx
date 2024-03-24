import { useEffect, useRef, useState } from "react";
import Image from 'next/image'
// Components
import { MantraWheel } from "./MantraWheel";

// Assets
import overlay_shurangama_glow from "@/public/mantraWheel/images/mantra_text_shurangama_glow.png"
import { GenericButton } from "../GenericButton";

import { LRCContent } from "@/types/LRC"

function convertTimeToDegree(currentTime : number, totalTime : number) {
  return Math.round((currentTime / totalTime * 360 + Number.EPSILON) * 10000) / 10000;
}


const Style: { [key: string]: React.CSSProperties } = {
  row: {
    display: "flex",
    flexDirection: "row",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
};

type Props = {
  showSkip: boolean,
  showSubtitles: boolean,
  sfx: HTMLAudioElement,
  subtitles: LRCContent,
  wheelSize: number,
}

export const MantraPlayer = ({
  showSkip,
  showSubtitles,
  sfx,
  subtitles,
  wheelSize
}: Props) => {

  // useStates
  const [playing, setPlaying] = useState(false);
  const [degree, setDegree] = useState<number>(0);
  const [subtitle, setSubtitle] = useState<string>();
  const [intervalID, setIntervalID] = useState<null | NodeJS.Timeout>(null)

  const index = useRef<number>(0)

  useEffect(() => {
    if (intervalID != null && sfx.currentTime == sfx.duration) {
      console.log("Playback complete, resetting overlay and audio")
      setPlaying(false);
      setDegree(0);
      clearInterval(intervalID);
      setIntervalID(null);
    }
  });







  const handleWheelClick = () => {
    sfx.pause();
    if (intervalID === null) {  // Prevent starting multiple intervals
      setIntervalID(setInterval(() => {
        setDegree(convertTimeToDegree(sfx.currentTime, sfx.duration));
        
        if (subtitles.lyrics[index.current].time < sfx.currentTime) {
          setSubtitle(subtitles.lyrics[index.current].text);
          index.current = index.current + 1;
        }

      }, 1000));
    } else {
      clearInterval(intervalID);
      setIntervalID(null);
    }

    if (playing === false) {
      sfx.play();
    }
    setPlaying(!playing)
  }

  const skipToSection = (time: number) => {
    if (sfx != undefined) {
      sfx.play();
      sfx.currentTime = time;
      setPlaying(true);
      setDegree(sfx.currentTime / sfx.duration * 360);
    }
  }

  return (
    <div style={{
      // margin: "1em",
      display: "flex",
      flexDirection: "column",
      // alignItems: "center",
      width: wheelSize,
      // border: "black 2px solid",
    }}>
      {
        showSkip ?
          <>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <GenericButton label={"開經偈"} handleClick={() => { skipToSection(0) }}></GenericButton>
              <GenericButton label={"第一會"} handleClick={() => { skipToSection(189) }}></GenericButton>
              <GenericButton label={"第二會"} handleClick={() => { skipToSection(412) }}></GenericButton>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <GenericButton label={"第三會"} handleClick={() => { skipToSection(455) }}></GenericButton>
              <GenericButton label={"第四會"} handleClick={() => { skipToSection(583) }}></GenericButton>
              <GenericButton label={"第五會"} handleClick={() => { skipToSection(664) }}></GenericButton>
            </div>
          </>
          :
          <></>
      }
      {/* Mantra Wheel */}
      <div style={{position: "relative"}} onClick={() => handleWheelClick()}>
        {/* Overlay */}
        <MantraWheel degree={degree} overlaySrc={overlay_shurangama_glow} isRewind={false} wheelSize={wheelSize}></MantraWheel>
        {/* Background, Wheel */}
        <Image src="/mantraWheel/images/mantra_bg.png"
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
        </Image>
        {/* <MantraWheelCanvas degree={overlayRotationDegree} overlaySrc={overlay.src}></MantraWheelCanvas> */}
      </div>

      {/* Mantra Lyrics display */}
      {
        showSubtitles ?
          <section style={{fontSize: "19px", textAlign: "center"}}>
            {subtitle}
          </section> :
          <></>
      }
    </div>
  );
};
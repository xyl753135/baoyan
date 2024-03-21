import Image, { StaticImageData } from "next/image";

import { MutableRefObject, useEffect, useRef, useState } from "react";

// Components
import { MantraWheel } from "./MantraWheel";

// Assets
import overlay_shurangama from "@/public/mantraWheel/images/mantra_text_shurangama.png"
import overlay_shurangama_glow from "@/public/mantraWheel/images/mantra_text_shurangama_glow.png"
import { GenericButton } from "../GenericButton";

import { Lyric, Metadata, LRCContent } from "@/types/LRC"

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    // margin: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "black 2px solid",
  },
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
  sfx: HTMLAudioElement | undefined,
  subtitles: LRCContent
}

export const MantraPlayer = ({
  showSkip,
  showSubtitles,
  sfx,
  subtitles
}: Props) => {
  
  // useStates
  const [playing, setPlaying] = useState(false);
  const [overlay, setOverlay] = useState<StaticImageData>(overlay_shurangama_glow);
  const [audioSrc, setAudioSrc] = useState<HTMLAudioElement | undefined>();
  const [overlayRotationDegree, setOverlayRotationDegree] = useState<number>(0);
  const [displayedLyrics, setDisplayedLyric] = useState<string>();
  const [intervalID, setIntervalID] = useState<null | NodeJS.Timeout>(null)

  const index = useRef<number>(0)

  useEffect(() => {
    if (intervalID != null && audioSrc?.currentTime == audioSrc?.duration) {
      console.log("Playback complete, resetting overlay and audio")
      setPlaying(false);
      setOverlayRotationDegree(0);
      clearInterval(intervalID);
      setIntervalID(null);
    }

    if (audioSrc?.currentTime) {
      if (subtitles.lyrics[index.current].time < audioSrc?.currentTime) {
        setDisplayedLyric(subtitles.lyrics[index.current].text);
        index.current = index.current + 1;
      }
    }
  });







  const handleWheelClick = () => {
    audioSrc?.pause();
    if (intervalID === null) {  // Prevent starting multiple intervals
      setIntervalID(setInterval(() => {
        if (audioSrc) {
          // console.log("duration", audioSrc.current.duration);
          // console.log("time", audioSrc.current.currentTime);
          // const percent = (audioSrc.current.currentTime / audioSrc.current.duration * 100);
          const degree = Math.round((audioSrc.currentTime / audioSrc.duration * 360 + Number.EPSILON) * 10000) / 10000;
          // console.log("progress", `${percent}%`);
          // console.log("degree", `${degree}deg`);
          setOverlayRotationDegree(degree);
        } else {
          console.error("calcProgress audioSrc.current is null/undefined");
        }
      }, 1000));
    } else {
      clearInterval(intervalID);
      setIntervalID(null);
    }

    if (playing === false) {
      // if pausing is not allowed, reset audio time/progress to 0 before playing
      if (!allowPause) {
        if (audioSrc != undefined) {
          audioSrc.currentTime = 0;
        }
      }
      audioSrc?.play();
    }
    setPlaying(!playing)
  }

  const skipToSection = (time: number) => {
    if (audioSrc != undefined) {
      // audioSrc.current.pause();
      audioSrc.currentTime = time;
      // setPlaying(false);
      // setOverlayRotationDegree(audioSrc.current.currentTime / audioSrc.current.duration * 360);
      // if (intervalID != null) {
      //   clearInterval(intervalID);
      //   setIntervalID(null);
      // }
    }
  }

  return (
    <div style={Style.container}>
      {/* Mantra Wheel */}
      <div onClick={() => handleWheelClick()}>
        <MantraWheel degree={overlayRotationDegree} overlaySrc={overlay} isRewind={false}></MantraWheel>
        {/* <MantraWheelCanvas degree={overlayRotationDegree} overlaySrc={overlay.src}></MantraWheelCanvas> */}
      </div>

      {/* Mantra Lyrics display */}
      <section>
        {displayedLyrics}
      </section>



 
        
    </div>
  );
};
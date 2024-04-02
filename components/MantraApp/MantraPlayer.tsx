import { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from 'next/image'
// Components
import { MantraWheel } from "./MantraWheel";

// Assets
import overlay_shurangama_glow from "@/public/mantraWheel/images/mantra_text_shurangama_glow.png"
import { GenericButton } from "../GenericButton";

import { LRCContent } from "@/types/LRC"
import { convertTimeToSeconds } from "@/utils/LyricsParser"

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
  audio: HTMLAudioElement,
  subtitles: LRCContent,
  wheelSize: number,
  localCount: number
  setLocalCount: Function,
  globalCount: number
  setGlobalCount: Function,
}

export const MantraPlayer = ({
  showSkip,
  showSubtitles,
  audio,
  subtitles,
  wheelSize,
  localCount,
  setLocalCount,
  globalCount,
  setGlobalCount
}: Props) => {
  // useStates
  // const [playing, setPlaying] = useState(false);
  const [degree, setDegree] = useState<number>(0);
  const [subtitle, setSubtitle] = useState<string>();
  const [intervalID, setIntervalID] = useState<null | NodeJS.Timeout>(null)

  // useRef
  const index = useRef<number>(0);

  useEffect(() => {
    if (intervalID != null && audio.currentTime == audio.duration) {
      console.log("Playback complete, resetting overlay and audio")
      // setPlaying(false);
      setDegree(0);
      clearInterval(intervalID);
      setIntervalID(null);
      setLocalCount(localCount + 1);
      index.current = 0;

      // Update global count

      const name = audio.src.substring(audio.src.lastIndexOf("/")+1, audio.src.indexOf("."));
      console.log("MantraPlayer useEffect calling ", `/api/counters/update-counter?app=mantraapp&name=${name}&count=${globalCount + 1}`);
      (async () => {
        try {
          const resp = await fetch(`/api/counters/update-counter?app=mantraapp&name=${name}&count=${globalCount + 1}`, {
            method: "GET",
            cache: 'no-store' })
          if (resp.status == 200) {
            const json = await resp.json();
            console.log("fetch returned result: ", json.result.rows);
            console.log("update ui to display new global count:", json.result.rows[0].count);  
            setGlobalCount(Number(json.result.rows[0].count));
          } else {
            console.error("status", resp.status, "statusText", resp.statusText);
              const json = await resp.json();
              console.log("fetch returned counters: ", json.result.rows)
          }
        } catch (error) {
          console.error("MantraPlayer useEffect threw error:", error);
        }
      })();
    }
  });

  useEffect(() => {
    // validate sfx and lrc match
    console.log("Loaded LRC file contents: ", subtitles);
    // try {
    //     // check if sfx duration matches metadata length
    //     // in sss.mmmmmm (6 units for miliseconds)
    //     const sfxDuration = sfx.duration;  
    //     // metadata.length is in MM:ss
    //     const subtitlesDuration = convertTimeToSeconds(subtitles.metadata.length); 
    //     if (Math.floor(sfxDuration) != Math.floor(subtitlesDuration)) {
    //       console.error("Warning: LRC file metadata length and SFX duration are mismatched, errors may occur during use.");
    //     }
    // } catch (error) {
    //     alert(error);
    // }
  }, []);

  const handleWheelClick = () => {
    if (intervalID === null) {  // Prevent starting multiple intervals
      setIntervalID(setInterval(() => {
        setDegree(convertTimeToDegree(audio.currentTime, audio.duration));
        
        if (subtitles.lyrics[index.current] != undefined) {
          if (subtitles.lyrics[index.current].time < audio.currentTime) {
            setSubtitle(subtitles.lyrics[index.current].text);
            index.current = index.current + 1;
          }
        }

      }, 1000));
      audio.play();
    } else {
      clearInterval(intervalID);
      setIntervalID(null);
      audio.pause();
    }

    // if (playing === false) {
    // }
    // setPlaying(!playing)
  }

  const skipToSection = (time: number, newIndex: number) => {
    audio.currentTime = time;
    index.current = newIndex;

    if (intervalID === null) {  // Prevent starting multiple intervals
      setIntervalID(setInterval(() => {
        setDegree(convertTimeToDegree(audio.currentTime, audio.duration));
        
        if (subtitles.lyrics[index.current] != undefined) {
          if (subtitles.lyrics[index.current].time < audio.currentTime) {
            setSubtitle(subtitles.lyrics[index.current].text);
            index.current = index.current + 1;
          }
        }

      }, 1000));
      audio.play();
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
              <GenericButton label={"完整版"} handleClick={() => { skipToSection(0, 0); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
              <GenericButton label={"第一會"} handleClick={() => { skipToSection(189, 21); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
              <GenericButton label={"第二會"} handleClick={() => { skipToSection(412, 134); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <GenericButton label={"第三會"} handleClick={() => { skipToSection(455, 159); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
              <GenericButton label={"第四會"} handleClick={() => { skipToSection(583, 222); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
              <GenericButton label={"第五會"} handleClick={() => { skipToSection(664, 263); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
            </div>
          </>
          :
          <></>
      }
      {/* Mantra Wheel */}
      <div style={{position: "relative", marginTop: "0.5em"}} onClick={() => handleWheelClick()}>
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
import Image, { StaticImageData } from "next/image";

import { MutableRefObject, useEffect, useRef, useState } from "react";

// Components
import { MantraUI } from "./MantraPlayerControls";
import { MantraWheel } from "./MantraWheel";
import { MantraWheelCanvas } from "./MantraWheelCanvas";

// Assets
import overlay_shurangama from "@/public/mantraWheel/images/mantra_text_shurangama.png"
import overlay_shurangama_glow from "@/public/mantraWheel/images/mantra_text_shurangama_glow.png"


const Style: { [key: string]: React.CSSProperties } = {
  container: {
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
  allowPause: boolean,
}

export const MantraPlayer = ({
  allowPause = false,
}: Props) => {
  // Audio assets
  let shurangamaFull = useRef<HTMLAudioElement>();
  let shurangamaShort = useRef<HTMLAudioElement>();  // Waiting on assets
  useEffect(() => {
    shurangamaFull.current = new Audio("/mantraWheel/audio/shurangama.mp3");
    shurangamaShort.current = new Audio("/mantraWheel/audio/testing_laughterSFX.mp3");
  }, [])

  // console.log("rendering mantraPlayer");

  const [playing, setPlaying] = useState(false);
  const [overlay, setOverlay] = useState<StaticImageData>(overlay_shurangama);
  const [audioSrc, setAudioSrc] = useState<MutableRefObject<HTMLAudioElement | undefined>>(shurangamaFull);
  const [overlayRotationDegree, setOverlayRotationDegree] = useState<number>(0);

  const [intervalID, setIntervalID] = useState<null | NodeJS.Timeout>(null)
  
  /**
   * When user selects another option from the dropdown/select menu 選擇神咒/Pick your mantra,
   * Change the mantra words img that is overlayed over the mantra wheel image
   * Change the mantra audio file being played
   * @param mantraOption Value of the selected option
   */
  const handleMantraDropdown = (mantraOption: string) => {
    console.log(`Triggered MantraPlayer.handleMantraDropdown(mantraOption:'${mantraOption}')`);
    // Stop audio when dropdown changes audio source
    audioSrc.current?.pause();
    if (audioSrc.current != undefined) {
      audioSrc.current.currentTime = 0;
    }
    setPlaying(false);
    if (mantraOption == "shurangamaFull" || mantraOption == "shurangamaShort") {
      // Set mantra overlay img
      setOverlay(overlay_shurangama);
      // Set audio
      if (mantraOption == "shurangamaFull") {
        setAudioSrc(shurangamaFull);
      } else if (mantraOption == "shurangamaShort") {
        setAudioSrc(shurangamaShort);
      } else {
        // Expandible
      }
    } else {
      // Expandible
    }
  }

  // const interval = setInterval(() => {
  //   calcProgress();
  // }, 500);

  useEffect(() => {
    if(intervalID != null && audioSrc.current?.currentTime == audioSrc.current?.duration) {
      console.log("Playback complete, resetting overlay and audio")
      setPlaying(false);
      setOverlayRotationDegree(0);
      clearInterval(intervalID);
      setIntervalID(null);
    }
  })

  const handleAudio = () => {
    audioSrc.current?.pause();
    if (intervalID === null) {  // Prevent starting multiple intervals
      setIntervalID(setInterval(() => {
          if (audioSrc.current) {
            // console.log("duration", audioSrc.current.duration);
            // console.log("time", audioSrc.current.currentTime);
            // const percent = (audioSrc.current.currentTime / audioSrc.current.duration * 100);
            const degree = Math.round((audioSrc.current.currentTime / audioSrc.current.duration * 360  + Number.EPSILON) * 10000) / 10000;
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
      if (!allowPause) {
        if (audioSrc.current != undefined) {
          audioSrc.current.currentTime = 0;
        }
      }
      audioSrc.current?.play();
    }
    setPlaying(!playing)
  }
  const resetMantra = () => {
    if (audioSrc.current != undefined) {
      audioSrc.current.pause();
      audioSrc.current.currentTime = 0;
      setPlaying(false);
      setOverlayRotationDegree(0);
      if(intervalID != null) {
        clearInterval(intervalID);
        setIntervalID(null);
      }
    }
  }

  return (
    <div style={Style.container}>
      <div style={Style.row}>
        <div onClick={() => handleAudio()}>
          <MantraWheel degree={overlayRotationDegree} overlaySrc={overlay_shurangama_glow}></MantraWheel>
          <MantraWheelCanvas degree={overlayRotationDegree} overlaySrc={overlay.src}></MantraWheelCanvas>
        </div>
        <div>
          <MantraUI handleMantraDropdown={handleMantraDropdown}></MantraUI>
          {allowPause ?
            <button onClick={resetMantra}>Reset</button>
            :
            <></>
          }
          <br></br>
          <button onClick={() => {if(audioSrc.current != null) {audioSrc.current.currentTime = 775}}}>Skip to almost end</button>
        </div>
      </div>
      <div style={Style.col}>
        WIP: LRC File, LRC Parser, Sync Lyric, Simple music player<br></br>
        https://dev.to/mcanam/javascript-lyric-synchronizer-4i15<br></br>
      </div>
    </div>
  );
};
import Image, { StaticImageData } from "next/image";

import { MutableRefObject, useEffect, useRef, useState } from "react";

// Components
import { MantraWheel } from "./MantraWheel";
import { MantraWheelCanvas } from "./MantraWheelCanvas";
import { parseLRCFile } from "@/utils/LyricsParser";

// Assets
import overlay_shurangama from "@/public/mantraWheel/images/mantra_text_shurangama.png"
import overlay_shurangama_glow from "@/public/mantraWheel/images/mantra_text_shurangama_glow.png"
import { GenericButton } from "../GenericButton";
import { MantraLyricsDisplay } from "./MantraLyricsDisplay";


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
  uiSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "black 2px solid",
  },
  counter: {
    width: "100%",
  }
};

type Props = {
  allowPause: boolean,
}

export const MantraPlayer = ({
  allowPause = false,
}: Props) => {
  
  // useRefs
  let shurangamaFull = useRef<HTMLAudioElement>();
  let shurangamaShort = useRef<HTMLAudioElement>();  // Waiting on assets
  let lyricsContent = useRef<{ 
    metadata: {
      artist: string,
      album: string,
      title: string,
      length: string
    },
    lyrics: {
      text: string,
      time: number,
    }[],
  }>({ metadata: { artist: "", album: "", title: "", length: "" }, lyrics: []});

  // useStates
  const [playing, setPlaying] = useState(false);
  const [overlay, setOverlay] = useState<StaticImageData>(overlay_shurangama_glow);
  const [audioSrc, setAudioSrc] = useState<MutableRefObject<HTMLAudioElement | undefined>>(shurangamaFull);
  const [overlayRotationDegree, setOverlayRotationDegree] = useState<number>(0);
  const [displayedLyrics, setDisplayedLyric] = useState<string>();

  const [intervalID, setIntervalID] = useState<null | NodeJS.Timeout>(null)
  useEffect(() => {
    // console.log("Rendering mantraPlayer");
    shurangamaFull.current = new Audio("/mantraWheel/audio/shurangama.mp3");
    shurangamaShort.current = new Audio("/mantraWheel/audio/testing_laughterSFX.mp3");
    
    lyricsContent.current = parseLRCFile("./mantraWheel/lyrics/shurangamaFull.lrc");

    
    // .then((resp) => resp.text())
    // .then(text => {
    //   lyricsContent.current = parseLRCFile(text);
    // })
  }, []);

  useEffect(() => {
    if (intervalID != null && audioSrc.current?.currentTime == audioSrc.current?.duration) {
      console.log("Playback complete, resetting overlay and audio")
      setPlaying(false);
      setOverlayRotationDegree(0);
      clearInterval(intervalID);
      setIntervalID(null);
    }

    if (audioSrc.current?.currentTime) {
      if (lyricsContent.current.lyrics[0].time < audioSrc.current?.currentTime) {
        setDisplayedLyric(lyricsContent.current.lyrics[0].text);
        lyricsContent.current.lyrics.shift();
      }
    }
  });



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
      if (mantraOption == "shurangamaFull") {
        setAudioSrc(shurangamaFull);
        setOverlay(overlay_shurangama_glow);
      } else if (mantraOption == "shurangamaShort") {
        setAudioSrc(shurangamaShort);
        setOverlay(overlay_shurangama);
      } else {
        // Expandible
      }
    } else {
      // Expandible
    }
  }



  const handleWheelClick = () => {
    audioSrc.current?.pause();
    if (intervalID === null) {  // Prevent starting multiple intervals
      setIntervalID(setInterval(() => {
        if (audioSrc.current) {
          // console.log("duration", audioSrc.current.duration);
          // console.log("time", audioSrc.current.currentTime);
          // const percent = (audioSrc.current.currentTime / audioSrc.current.duration * 100);
          const degree = Math.round((audioSrc.current.currentTime / audioSrc.current.duration * 360 + Number.EPSILON) * 10000) / 10000;
          // console.log("progress", `${percent}%`);
          // console.log("degree", `${degree}deg`);
          setOverlayRotationDegree(degree);
        } else {
          console.error("calcProgress audioSrc.current is null/undefined");
        }
      }, 500));
    } else {
      clearInterval(intervalID);
      setIntervalID(null);
    }

    if (playing === false) {
      // if pausing is not allowed, reset audio time/progress to 0 before playing
      if (!allowPause) {
        if (audioSrc.current != undefined) {
          audioSrc.current.currentTime = 0;
        }
      }
      audioSrc.current?.play();
    }
    setPlaying(!playing)
  }

  const skipToSection = (time: number) => {
    if (audioSrc.current != undefined) {
      // audioSrc.current.pause();
      audioSrc.current.currentTime = time;
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
      <section style={Style.uiSection}>
        <fieldset>
          <label>選擇神咒: </label>
          <select onChange={(event) => handleMantraDropdown(event.currentTarget.value)}>
            <option value="shurangamaFull">楞嚴神咒(正常版)</option>
            <option value="shurangamaFullPt1">楞嚴神咒(正常版-第一會)</option>
            <option value="shurangamaFullPt2">楞嚴神咒(正常版-第二會)</option>
            <option value="shurangamaFullPt3">楞嚴神咒(正常版-第三會)</option>
            <option value="shurangamaFullPt4">楞嚴神咒(正常版-第四會)</option>
            <option value="shurangamaFullPt5">楞嚴神咒(正常版-第五會)</option>
            <option value="shurangamaShort">楞嚴神咒(簡介版)</option>
          </select>
        </fieldset>
        

      </section>
      {/* Mantra Lyrics display */}
      <section>
        {displayedLyrics}
      </section>



      <div style={Style.row}>
        <div onClick={() => handleWheelClick()}>
          <MantraWheel degree={overlayRotationDegree} overlaySrc={overlay}></MantraWheel>
          {/* <MantraWheelCanvas degree={overlayRotationDegree} overlaySrc={overlay.src}></MantraWheelCanvas> */}
        </div>
        <div>
          跳到:
          <GenericButton label={"開經偈"} handleClick={() => { skipToSection(0) }} hoverStyle={"light"}></GenericButton>
          <GenericButton label={"第一會"} handleClick={() => { skipToSection(100) }} hoverStyle={"light"}></GenericButton>
          <GenericButton label={"第二會"} handleClick={() => { skipToSection(200) }} hoverStyle={"light"}></GenericButton>
          <GenericButton label={"第三會"} handleClick={() => { skipToSection(300) }} hoverStyle={"light"}></GenericButton>
          <GenericButton label={"第四會"} handleClick={() => { skipToSection(400) }} hoverStyle={"light"}></GenericButton>
          <GenericButton label={"第五會"} handleClick={() => { skipToSection(500) }} hoverStyle={"light"}></GenericButton>
        </div>
      </div>



      <fieldset style={Style.counter}>
        <label>統計: </label>
        <span>本次: 0</span><br></br>
        <span>累計: 0</span><br></br>
        <span>全球總計: 0</span><br></br>
      </fieldset>


      <div style={Style.col}>
        {/* WIP: LRC File, LRC Parser, Sync Lyric, Simple music player<br></br>
        https://dev.to/mcanam/javascript-lyric-synchronizer-4i15<br></br> */}
      </div>
    </div>
  );
};
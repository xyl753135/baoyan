import Image, { StaticImageData } from "next/image";

import { MutableRefObject, useRef, useState } from "react";

import { MantraWheel } from "./MantraWheel";
import { MantraWheelCanvas } from "./MantraWheelCanvas";

import shurangama from "@/public/mantraWheel/mantra_text_shurangama.png"
import lang from "@/public/language.png"

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
  let shurangamaFull = useRef<HTMLAudioElement>(new Audio("/mantraWheel/shurangama.mp3"));
  let shurangamaShort = useRef<HTMLAudioElement>(new Audio("/mantraWheel/shurangama.mp3"));  // Waiting on assets
  let laughTest = useRef<HTMLAudioElement>(new Audio("/mantraWheel/testing_laughterSFX.mp3"));  // Waiting on assets

  const [playing, setPlaying] = useState(false);
  const [overlay, setOverlay] = useState<StaticImageData>(shurangama);
  const [audioSrc, setAudioSrc] = useState<MutableRefObject<HTMLAudioElement>>(shurangamaFull);
  const [mantraProgress, setMantraProgress] = useState<number>(0);

  
  /**
   * When user selects another option from the dropdown/select menu 選擇神咒/Pick your mantra,
   * Change the mantra words img that is overlayed over the mantra wheel image
   * Change the mantra audio file being played
   * @param mantraOption Value of the selected option
   */
  const handleMantraDropdown = (mantraOption: string) => {
    console.log(`Triggered MantraPlayer.handleMantraDropdown(mantraOption:'${mantraOption}')`);
    // Stop audio when dropdown changes audio source
    audioSrc.current.pause();
    audioSrc.current.currentTime = 0;
    setPlaying(false);
    if (mantraOption == "shurangamaFull" || mantraOption == "shurangamaShort") {
      // Set mantra overlay img
      setOverlay(shurangama);
      // Set audio
      if (mantraOption == "shurangamaFull") {
        setAudioSrc(shurangamaFull);
      } else if (mantraOption == "shurangamaShort") {
        setAudioSrc(shurangamaShort);
      } else {
        // Expandible
      }
    } else if (mantraOption == "testing") {
      // Expandible
      alert("testing")
      setAudioSrc(laughTest);
    }
  }

  const handleAudio = () => {
    audioSrc.current.pause();
    if (playing === false) {
      if (allowPause) {
        audioSrc.current.play();
      } else {
        audioSrc.current.currentTime = 0;
        audioSrc.current.play();
      }
    }
    setPlaying(!playing)
  }
  const resetMantra = () => {
    audioSrc.current.currentTime = 0;
  }

  return (
    <div style={Style.container}>
      <div style={Style.row}>
        <div onClick={() => handleAudio()}>
          <MantraWheel rotating={playing} position={mantraProgress} overlaySrc={overlay}></MantraWheel>
          <MantraWheelCanvas rotating={playing} position={mantraProgress} overlaySrc={overlay}></MantraWheelCanvas>
        </div>
        <div>
          <fieldset>
            <label>選擇神咒: </label>
            <select onChange={(event) => handleMantraDropdown(event.currentTarget.value)}>
              <option value="shurangamaFull">楞嚴神咒(正常版)</option>
              <option value="shurangamaShort">楞嚴神咒(簡介版)</option>
              <option value="testing">NegativeTesting</option>
            </select>
          </fieldset>
          <fieldset>
            <label>選擇語言: </label>
            <select>
              <option value="zhHANT">繁體中文</option>
              <option value="zhHANS">簡體中文</option>
              <option value="en">English</option>
              <option value="de">Deutsche</option>
            </select>
          </fieldset>
          <fieldset>
            <label>統計: </label>
            <span>本次: 0</span><br></br>
            <span>累計: 0</span><br></br>
            <span>全球總計: 0</span><br></br>
          </fieldset>
          {allowPause ?
            <button onClick={resetMantra}>Reset</button>
            :
            <></>
          }
        </div>
      </div>
      <div style={Style.col}>
        WIP: LRC File, LRC Parser, Sync Lyric, Simple music player<br></br>
        https://dev.to/mcanam/javascript-lyric-synchronizer-4i15<br></br>
      </div>
    </div>
  );
};
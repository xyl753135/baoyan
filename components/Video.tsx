import Image from 'next/image';
import { Suspense } from 'react'
import suspenseImg from "../public/suspense_video.jpg"

const Style: { [key: string]: React.CSSProperties } = {
  video: {
    // paddingLeft: "1rem",
    // paddingRight: "1rem",
  },
};

type Props = {
  h: string,
  w: string,
  showControls?: boolean,
  notSupportedMessage?: string,
  link: string,
  captions?: {
    lang?: "zh-hans" | "zh-hant" | "en", // https://en.wikipedia.org/wiki/IETF_language_tag
    src: string, // must be a url string that points to a .vtt file
  },
}

export const Video = ({
    h,
    w,
    showControls = true,
    notSupportedMessage = "Your browser does not support the video tag.",
    link,
    captions = {
      lang: "en",
      src: "" 
    }
}: Props) => {
  let filetype = "invalidFileType";
  try {
    switch (link.split(".")[1]) {
      case "mp4":
        filetype = "video/mp4";
        break;
      case "ogg":
        filetype = "video/ogg";
        break;
      case "webm":
        filetype = "video/webm";
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Invalid link value passed to Video component, unsupported file type.");
    alert("Invalid link value passed to Video component, unsupported file type.");
  }
  return (
    <Suspense fallback={<Image src={suspenseImg} alt={'Video Loading...'}></Image>}>
    {
      filetype == "invalidFileType" ?
      <p>INVALID FILE TYPE - Video component was passed {link}, must be mp4, ogg, or webm.</p> 
      :
      <video style={Style.video} height={h}  width={w} controls={showControls}>
        <source src={link} type={filetype}></source>
        { // Optional caption tag that links a .vtt file to the video
          (captions.src.trim() != "") ?
          <track default kind="captions" srcLang={captions.lang} src={captions.src} />
          :
          null 
        }
        <span>{notSupportedMessage}</span>
      </video>
    }
    </Suspense>
  );

};
import Image from 'next/image';
import { Suspense } from 'react'
import suspense from "../public/suspense_video.jpg"

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
  filetype: "video/mp4" | ""
}

export const Video = ({
    h,
    w,
    showControls = true,
    notSupportedMessage = "Your browser does not support the video tag.",
    link,
    filetype = "video/mp4",
}: Props) => {
  return (
    <Suspense fallback={<Image src={suspense} alt={'Video Loading...'}></Image>}>
      <video 
      style={Style.video}
      height={h} 
      width={w} 
      controls={showControls}>
      <source src={link} type={filetype}></source>
      <span>{notSupportedMessage}</span>
    </video>
    </Suspense>
    
  );

};
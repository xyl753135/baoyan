import Image, { StaticImageData } from "next/image";

import { MutableRefObject, useEffect, useRef, useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    // margin: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "black 2px solid",
  },
};

type Props = {
  allowPause: boolean,
}

export const MantraLyricsDisplay = ({
  allowPause = false,
}: Props) => {

  useEffect(() => {
   
  }, []);

  return (
    <div style={Style.container}>
  
    </div>
  );
};


'use client'

import Image, { StaticImageData } from "next/image";

import { useEffect, useRef, useState } from "react";

// Image assets
import bg from "@/public/mantraWheel/mantra_bg.png"

const Style: { [key: string]: React.CSSProperties } = {
  button: {
    background: "none",
    // border: "none",
    border: "black 2px solid",
    position: "relative",
    width: "220px",
    height: "220px",
  },
  rotate: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "2",
    // rotate: "4662deg",  // song length = 12m57s, 360deg per 1min, 4462deg for 12m57s
    rotate: "360deg",  // 1 rotation per song playback
    transition: "all 777s linear",  // song length = 12m57s, 12m * 60s + 57s = 720s + 57 = 777s
    // transition: "all 3s linear",  // 12mins * 60secs = 720s (spin for total 12mins)
  },
  static: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "2",
    rotate: "0deg", // comment out for instant reset
    // transition: "all 13s ease-out", // comment out for instant reset
    // transition: "all 0s linear", // comment out for instant reset
  }
};

type Props = {
  rotating: boolean,
  position: number,
  overlaySrc: string | StaticImageData,
}

export const MantraWheelCanvas = ({
  rotating,
  position,
  overlaySrc,
}: Props) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');  
            if (context == null) {
                throw new Error('Could not get context');
            } else {
                // Draw
                const imgData = context.createImageData(220, 220);
                context.putImageData(bg, 220, 220)
                
                
                const image = new Image();
                image.src = "/my-image.png"

                context.drawImage(image, 0, 0);
                context.beginPath();
                context.arc(50, 50, 50, 0, 2 * Math.PI);
                context.fill(); 
            }
        }       
    },[]);


  return (
    <button style={Style.button}>
        <canvas ref={canvasRef} height={220} width={220}></canvas>
      {/* Overlay */}
      <Image
        style={rotating ? {...Style.rotate, } : Style.static}
        src={overlaySrc}
        alt={"Shurangama mantra"}
        height={220}
        width={220}
        loading={"eager"}>
      </Image>
    </button>
  );
};
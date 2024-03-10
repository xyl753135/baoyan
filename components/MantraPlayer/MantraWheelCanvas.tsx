'use client'

import { useEffect, useRef, useState } from "react";

import { StaticImageData } from "next/image";

const Style: { [key: string]: React.CSSProperties } = {
  button: {
    background: "none",
    border: "none",
    // border: "black 2px solid",
    position: "relative",
    width: "220px",
    height: "220px",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "2",
  },
  bg: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
  }
};

type Props = {
  degree: number,
  overlaySrc: string,
}

export const MantraWheelCanvas = ({
  degree,
  overlaySrc,
}: Props) => {
  const prevDegree = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx == null) {
        console.error('MantraWheelCanvas context was null');
      } else {
        // Reset canvas between redraws
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define overlay
        const overlay = new Image();
        overlay.src = overlaySrc;
        
        // console.log("prev", prevDegree.current)
        // console.log("curr", degree)
        // console.log("diff", degree - prevDegree.current);
        
        ctx.translate(110, 110);
        // ctx.rotate((degree * Math.PI) / 180);
        ctx.rotate(((degree - prevDegree.current)* Math.PI) / 180);
        ctx.translate(-110, -110)
        
        // Keep track of difference between prev & curr degree
        prevDegree.current = degree;

        // Draw overlay
        overlay.onload = () => {
          ctx.drawImage(overlay, 0, 0, 350, 350, 0, 0, 220, 220);
        }
      }
    } else {
      console.error("MantraWheelCanvas canvas.current is not available");
    }
  });


  return (
    <button style={{ ...Style.button, }}>
      <img style={Style.bg} src="/mantraWheel/images/mantra_bg.png" height={220} width={220}></img>
      <canvas style={Style.overlay} ref={canvasRef} height={220} width={220}></canvas>
      {/* Overlay */}

    </button>
  );
};
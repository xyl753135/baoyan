'use client'

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  navButton: {
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    flexShrink: "1",
    cursor: "pointer",
    // borderRadius: "1rem",
    transition: "1s"
  },
  label: {
    color: "rgb(240, 240, 255)",
    fontFamily: "georgia",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "all 1s ease-in"
  },
  hoverButtonLight: {
    backgroundColor: "#4EB1BA",
    // border: "1px solid white",
    transition: "all 1s ease-out"
  },
  hoverButtonDark: {
    backgroundColor: "#214468",
    // border: "1px solid white",
    transition: "all 1s ease-out"
  },
  hoverLabelLight: {
    color: "black",
    fontSize: "1.5rem",
    fontWeight: "900",
    transition: "all 0.5s"
  },
  hoverLabelDark: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "900",
    transition: "all 0.5s"
  },
};

type Props = {
  label: string,
  link: string,
  hoverStyle?: "none" | "dark" | "light"
}

export const NavbarButton = ({
    label,
    link,
    hoverStyle = "none",
}: Props) => {
    const [hovered, setHovered] = useState<Boolean>(false);
  return (
    <a href={link}
      style={{
        ...Style.navButton, 
        ...(hovered && hoverStyle != "none" ? (hoverStyle == "light" ? Style.hoverButtonLight : Style.hoverButtonDark) : undefined)}}
      target="_self"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}>
      <h2 style={{
        ...Style.label, 
        ...(hovered && hoverStyle != "none" ? (hoverStyle == "light" ? Style.hoverLabelLight : Style.hoverLabelDark) : undefined)}}>{label}</h2>
    </a>);
};
'use client'

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    width: "var(--navbarHamburgerContainerWidth)",
    height: "var(--navbarHamburgerContainerHeight)",
    background: "var(--background-start-rgb)",
    border: "none", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "right",
    gap: "var(--navbarHamburgerBarGap)",
    paddingLeft: "var(--navbarHamburgerLRPadding)",
    paddingRight: "var(--navbarHamburgerLRPadding)",
    paddingTop: "var(--navbarHamburgerTBPadding)",
    paddingBottom: "var(--navbarHamburgerTBPadding)",
    cursor: "pointer",
    zIndex: "2",
  },
  line: {
    backgroundColor: "white",
    // border: "1px solid black", 
    // boxShadow: "0 0 0 1px white",
    width: "var(--navbarHamburgerBarWidth)",
    height: "var(--navbarHamburgerBarHeight)",
    // borderRadius: "10px",
    transformOrigin: "left center",
    transition: "translate var(--navbarHamburgerAnimation), rotate var(--navbarHamburgerAnimation), backgroundColor var(--navbarHamburgerAnimation), width var(--navbarHamburgerAnimation)",
    // transformOrigin: "left center",
    zIndex: "2",
  },
  hiddenLine: {
    backgroundColor: "none",
    width: "0px",
    height: "10px",
    borderRadius: "10px",
    transition: "backgroundColor 200ms ease-in-out, width 200ms ease-in-out"
  },
  topLine: {
    backgroundColor: "white",
    border: "1px solid black", 
    boxShadow: "0 0 0 1px white",
    rotate: "45deg",
    width: "var(--navbarHamburgerBarDiagonal)",
    height: "var(--navbarHamburgerBarHeight)",
    // borderRadius: "10px",
    transformOrigin: "left center",
    translate: "5px -2.5px",
    transition: "translate var(--navbarHamburgerAnimation), rotate var(--navbarHamburgerAnimation), backgroundColor var(--navbarHamburgerAnimation), width var(--navbarHamburgerAnimation)",
    zIndex: "2",
    // position: "fixed",
  },
  bottomLine: {
    backgroundColor: "white",
    border: "1px solid black", 
    boxShadow: "0 0 0 1px white",
    rotate: "-45deg",
    width: "var(--navbarHamburgerBarDiagonal)",
    height: "var(--navbarHamburgerBarHeight)",
    // borderRadius: "10px",
    transformOrigin: "left center",
    translate: "5px 2.5px",
    transition: "translate var(--navbarHamburgerAnimation), rotate var(--navbarHamburgerAnimation), backgroundColor var(--navbarHamburgerAnimation), width var(--navbarHamburgerAnimation)",
    zIndex: "2",
    // position: "fixed",
  },
  show: {
    position: "fixed",
    left: "0",
    top: "0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    visibility: "visible",
    transition: "all var(--navbarHamburgerAnimation)",
    backgroundColor: "rgb(24, 39, 51)",
    zIndex: "1",
    opacity: "85%",
  },
  hide: {
    position: "fixed",
    left: "0",
    top: "0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "0%",
    width: "100%",
    visibility: "hidden",
    opacity: "0%",
    zIndex: "-1",
    transition: "all var(--navbarHamburgerAnimation)",
  }
};

type Props = {
    children: JSX.Element[],
}

export const Hamburger = ({
    children,
}: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
        <button style={Style.container} onClick={() => setToggle(!toggle)}>
            <div style={toggle? Style.topLine : Style.line}></div>
            <div style={toggle? Style.hiddenLine : Style.line}></div>
            <div style={toggle? Style.bottomLine : Style.line}></div>
        </button>
        <div style={toggle? Style.show : Style.hide}>
          { children }
        </div>
    </>
  );

};
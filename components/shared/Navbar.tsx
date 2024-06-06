import { NavbarButton } from "@/components/shared/NavbarButton";
import { NavbarHamburgerButton } from "@/components/shared/NavbarHamburgerButton";
import { Hamburger } from "@/components/shared/Hamburger";
import { Logo } from "../shared/Logo";
import Image from "next/image";
import loginIcon from "@/public/icons/login.png";

const navbarMarginTop = 10;
const buttonFontSize = "23px";
const loginContainerWidth = "9.5em";
//const loginButtonWidth = 100.87;
//const loginButtonHeight = 42;
const logoHeight = 100;
const logoWidth = 125;

const Style: { [key: string]: React.CSSProperties } = {
  logoContainer: {
    //position: 'absolute',
    //left: '50%',
    //transform: 'translate(-50%, 50%)',
    //marginTop: navbarMarginTop,
    //flexGrow: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    fontSize: buttonFontSize,
    position: "absolute",
    right: "1vw",
    width: loginContainerWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  leftColumn: {
    flexGrow: "0",
    display: "flex",
    alignItems: "center",
  },
  rightColumn: {
    flexGrow: "1",
    display: "flex",
    justifyContent: "right",
  },
  centerColumn: {
    position: "absolute",
    top: 0,
    right: 0,
    //flexGrow: "1",
    //display: "flex",
    //justifyContent: "center",
    //alignItems: "center",
  },
  fullMode: {
    //flexGrow: "1",
    display: "var(--navbarFullDisplay)",  // flex over 700px, none under 700px
    position: "relative",
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: navbarMarginTop,
  },
  hamburgerMode: {
    flexGrow: "0",
    display: "var(--navbarHamburgerDisplay)",  // none over 700px, flex under 700px
    flexDirection: "row",
    alignItems: "center"
  },
  signIn: {
    letterSpacing: "0.7em",
    textIndent: "0.7em",
    border: "white 0.12em solid",
    borderRadius: "1.2em",
    color: "white",
    width: "4.5em",
    height: "1.8em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

type Props = {
  userSystemLabel: string,
  buttonDatas: Array<{ label: string, link: string, key: string}>,
}



export const Navbar = ({
  userSystemLabel,
  buttonDatas
}: Props) => {
  const navbarItems = buttonDatas.map((eachButtonData) => <NavbarButton key={eachButtonData.key} label={eachButtonData.label} link={eachButtonData.link} hoverStyle="dark"></NavbarButton>);
  const hamburgerItems = buttonDatas.map((eachButtonData) => <NavbarHamburgerButton key={eachButtonData.key} label={eachButtonData.label} link={eachButtonData.link} hoverStyle="light"></NavbarHamburgerButton>);

  return (
    <div>
      <nav style={Style.fullMode}>
        <div>
          <Logo h={logoHeight} w={logoWidth} altText="Official logo" />
        </div>
        <div style={Style.loginContainer}>
          <a href="/login?action=register" target="_self" style={Style.signIn}>
            {userSystemLabel ? userSystemLabel : "註冊"}
          </a>
          <a href="/login?action=login" target="_self" style={Style.signIn}>
            {userSystemLabel ? userSystemLabel : "登入"}
          </a>
        </div>
      </nav>
      <nav style={Style.hamburgerMode}>
        <div style={Style.logoContainer}>
          <Logo h={logoHeight} w={logoWidth} altText="Official logo" />
        </div>
        <div style={Style.rightColumn}>
          <a href="/login" target="_self" style={Style.signIn}>
            {userSystemLabel ? userSystemLabel : "登入"}
          </a>
        </div>
      </nav>
    </div>
  );

  return (<div style={Style.navbar}>
    <div style={Style.leftColumn}>
      <Logo h={105} w={105} altText="Official logo"></Logo>
    </div>
    <div style={Style.rightColumn}>
      {/* hidden under width 700px*/}
      <nav style={Style.fullMode}>
        {/* {navbarItems} */}
        <a href={"/login"} target="_self" style={Style.signIn}>
          {userSystemLabel}
        </a>
      </nav>
      {/* hidden over width 700px*/}
      <nav style={Style.hamburgerMode}>
        {/* <Hamburger>
          {hamburgerItems}
        </Hamburger> */}
        {/* Login / Profile */}
        <a href={"/login"} target="_self" style={Style.signIn}>
          {userSystemLabel}
        </a>
      </nav>
    </div>
  </div>);
};
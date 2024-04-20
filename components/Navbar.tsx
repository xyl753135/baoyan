import { NavbarButton } from "@/components/NavbarButton";
import { NavbarHamburgerButton } from "@/components/NavbarHamburgerButton";
import { Hamburger } from "@/components/Hamburger";
import { Logo } from "./Logo";
import Image from "next/image";
import loginIcon from "@/public/icons/login.png";

const Style: { [key: string]: React.CSSProperties } = {
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
  fullMode: {
    flexGrow: "1",
    display: "var(--navbarFullDisplay)",  // flex over 700px, none under 700px
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "center"
  },
  hamburgerMode: {
    flexGrow: "0",
    display: "var(--navbarHamburgerDisplay)",  // none over 700px, flex under 700px
    flexDirection: "row",
    alignItems: "center"
  },
  signIn: {
    marginLeft: "1em",
    border: "white 3px solid",
    borderRadius: "5px",
    padding: "3px",
    color: "white"
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

  return (<div style={Style.navbar}>
    <div style={Style.leftColumn}>
      <Logo h={105} w={105} altText="Official logo"></Logo>
    </div>
    <div style={Style.rightColumn}>
      {/* hidden under width 700px*/}
      <nav style={Style.fullMode}>
        {navbarItems}
        <a href={"/login"} target="_self" style={Style.signIn}>
          {userSystemLabel}
        </a>
      </nav>
      {/* hidden over width 700px*/}
      <nav style={Style.hamburgerMode}>
        <Hamburger>
          {hamburgerItems}
        </Hamburger>
        {/* Login / Profile */}
        <a href={"/login"} target="_self" style={Style.signIn}>
          {userSystemLabel}
        </a>
      </nav>
    </div>
  </div>);

};
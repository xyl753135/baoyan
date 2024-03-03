import { NavbarButton } from "@/components/NavbarButton";
import { NavbarHamburgerButton } from "@/components/NavbarHamburgerButton";
import { Hamburger } from "@/components/Hamburger";
import { Logo } from "./Logo";

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
  },
  hamburgerMode: {
    flexGrow: "0",
    display: "var(--navbarHamburgerDisplay)",  // none over 700px, flex under 700px
    flexDirection: "column",
  },
};

type Props = {
  buttonDatas: Array<{ label: string, link: string, key: string}>,
}

export const Navbar = ({
  buttonDatas
}: Props) => {
  const navbarItems = buttonDatas.map((eachButtonData) => <NavbarButton key={eachButtonData.key} label={eachButtonData.label} link={eachButtonData.link} hoverStyle="dark"></NavbarButton>);
  const hamburgerItems = buttonDatas.map((eachButtonData) => <NavbarHamburgerButton key={eachButtonData.key} label={eachButtonData.label} link={eachButtonData.link} hoverStyle="light"></NavbarHamburgerButton>);

  return (<div style={Style.navbar}>
    <div style={Style.leftColumn}>
      <Logo h={75} w={75} altText="Official logo"></Logo>
    </div>
    <div style={Style.rightColumn}>
      {/* hidden under width 700px*/}
      <nav style={Style.fullMode}>
        {navbarItems}
      </nav>
      {/* hidden over width 700px*/}
      <nav style={Style.hamburgerMode}>
        <Hamburger>
          {hamburgerItems}
        </Hamburger>
      </nav>
    </div>
  </div>);

};
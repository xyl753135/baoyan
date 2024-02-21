import { NavbarButton } from "@/components/NavbarButton";
import { Logo } from "./Logo";

const Style: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexGrow: "1",
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
  }
};

type Props = {
  buttonDatas: Array<{ label: string, link: string, key: string}>,
}

export const Navbar = ({
  buttonDatas
}: Props) => {
  const navbarItems = buttonDatas.map((eachButtonData) => <NavbarButton key={eachButtonData.key} label={eachButtonData.label} link={eachButtonData.link} hoverStyle="dark"></NavbarButton>);

  return (<div style={Style.navbar}>
    <div style={Style.leftColumn}>
      <Logo h={75} w={75} altText="Official logo"></Logo>
    </div>
    <div style={Style.rightColumn}>
      {navbarItems}
    </div>
  </div>);

};
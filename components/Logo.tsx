import Image from "next/image";
import logoSource from "../public/logo.webp"

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
  },
};

type Props = {
  h: number,
  w: number,
  altText: string,
}

export const Logo = ({
  h,
  w,
  altText,
}: Props) => {
  return (
    <a style={Style.container} href="/" target="_self">
        <Image src={logoSource} 
            alt={altText} 
            height={h} 
            width={w} 
            loading={"eager"}>
        </Image>
    </a>
  );

};
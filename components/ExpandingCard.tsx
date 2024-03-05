"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  card: {
    border: "white 2px solid",
    borderRadius: "5px",
    margin: "1em",
    padding: "1rem",
    overflow: "hidden",
  },
  visible: {
    display: "block",
  },
  hidden: {
    display: "none",
  },
  cardTitle: {
    color: "white",
    marginBottom: "1rem",
  },
  cardDescription: {
    color: "white",
    fontSize: "1.2rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  foldingSection: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
};

type Props = {
  title: string;
  imgSrc: string | StaticImport;
  imgAlt: string;
  w: number;
  h: number;
  description: string;
  children: JSX.Element[] | JSX.Element;
  link?: string;
  label?: string;
};

export const ExpandingCard = ({
  title,
  imgSrc,
  imgAlt,
  w,
  h,
  description,
  children,
  link,
  label,
}: Props) => {
  const [visibility, setVisibility] = useState<Boolean>(false);

  return (
    <section style={Style.card} onClick={() => setVisibility(!visibility)}>
      <h2 style={Style.cardTitle}>{title}</h2>
      <div style={Style.cardDescription}>{description}</div>
      <div
        style={{
          ...Style.foldingSection,
          ...(visibility ? Style.visibile : Style.hidden),
        }}
      >
        {children}
        <div style={Style.cardContentsText}>
          {children}
          <a href={link} target="_self">
            {label}
          </a>
          <br></br>
          <Image src={imgSrc} alt={imgAlt} width={w} height={h}></Image>
        </div>
      </div>
    </section>
  );
};

'use client'

import { getDistinctRandomIntegers, getRandomColors, getRandomInteger } from "@/utils/RandomGenerator";
import { MeritCard } from "./MeritCard";
import { useEffect, useState } from "react";

type Props = {
    width: number | string,
    height: number | string,
    author: string,
    meritSource?: string,
    timestamp: string,
    text: string,
    privacyOn?: boolean,
}

const angles = [
    'to bottom',
    'to right'
];

export function MeritCardRandomWrapper({
    width : widthProp,
    height : heightProp,
    author,
    meritSource = '',
    timestamp,
    text,
    privacyOn = true,

}: Props) {
    const [color0, setColor0] = useState("");
    const [color1, setColor1] = useState("");
    const [angle, setAngle] = useState("");

    useEffect(() => {
        const colors = getRandomColors(true, false, 2);
        const angle = angles[getRandomInteger(0, angles.length)];
        setColor0(colors[0]);
        setColor1(colors[1]);
        setAngle(angle);
    }, [])

    return (
        <MeritCard 
            width={widthProp}
            height={heightProp}
            author={author}
            meritSource={meritSource}
            timestamp={timestamp}
            text={text}
            privacyOn={privacyOn}
            colorLeft={color0}
            colorRight={color1} 
            angle={angle}>
        </MeritCard>
    );
};














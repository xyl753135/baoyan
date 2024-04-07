'use client'

import { getDistinctRandomIntegers, getRandomInteger } from "@/utils/RandomGenerator";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        border: "black 2px solid",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
    },
    author: {
        color: "black"
    },
    timestamp: {
        color: "black"
    },
    text: {
        color: "black"
    },
};

type Props = {
    width: number | string,
    height: number | string,
    author: string,
    meritSource?: string,
    timestamp: string,
    text: string
}

export function MeritCard({
    width : widthProp,
    height : heightProp,
    author,
    meritSource = '',
    timestamp,
    text,
}: Props) {
    let colors = [
        'rgba(255, 150, 150, 1)', // Light Red
        // 'rgba(200, 50, 50, 1)', // Dark Red
        'rgba(150, 255, 150, 1)', // Light Green
        // 'rgba(50, 200, 50, 1)', // Dark Green
        'rgba(150, 150, 255, 1)', // Light Blue
        // 'rgba(50, 50, 200, 1)', // Dark Blue
        'rgba(255, 235, 150, 1)', // Light Yellow
        // 'rgba(230, 180, 100, 1)', // Dark Yellow
        'rgba(255, 150, 255, 1)', // Light Purple
        // 'rgba(200, 50, 200, 1)', // Dark Purple
        'rgba(150, 255, 255, 1)', // Light Teal
        // 'rgba(50, 200, 200, 1)', // Dark Teal
        'rgba(255, 205, 150, 1)', // Light Orange
        // 'rgba(250, 140, 50, 1)', // Dark Orange

    ];
    let angles = [
        'to bottom',
        'to right'
    ]
    let indexes = getDistinctRandomIntegers(0, colors.length - 1, 2);

    let colorLeft = colors[indexes[0]];
    let colorRight = colors[indexes[1]];
    let angle = angles[getRandomInteger(0, angles.length)]
    // console.log(`linear-gradient(${angle}, ${colorLeft}, ${colorRight})`);

    return (
        <div style={{
            ...Style.container,
            width: widthProp,
            height: heightProp,
            background: "linear-gradient(to bottom, rgba(255,150,150,1), rgba(255, 205, 150, 1))", // light/dark reds
            // background: `linear-gradient(${angle}, ${colorLeft}, ${colorRight})`, // random colors
            }}>

            <h5 style={Style.author}>{author}</h5>
            <h6 style={Style.timestamp}>{meritSource} {timestamp}</h6>
            <br></br>
            <p style={Style.text}>{text}</p>
            

        </div>
    );
};














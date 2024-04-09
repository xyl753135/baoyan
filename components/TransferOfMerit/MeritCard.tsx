'use client'

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        border: "black 2px solid",
        paddingLeft: "1em",
        paddingRight: "1em",
    },
    author: {
        color: "black",
        fontSize: "20px",
        textAlign: "center"
    },
    timestamp: {
        color: "black",
        fontSize: "16px",
        textAlign: "center"
    },
    text: {
        color: "black",
        fontSize: "16px",
        textAlign: "center"
    },
};

type Props = {
    width: number | string,
    height: number | string,
    author: string,
    meritSource?: string,
    timestamp: string,
    text: string,
    privacyOn?: boolean,
    colorLeft?: string,
    colorRight?: string,
    angle?: string
}

export function MeritCard({
    width : widthProp,
    height : heightProp,
    author,
    meritSource = '',
    timestamp,
    text,
    privacyOn = true,
    colorLeft = 'rgba(255,150,150,1)', // light red
    colorRight = 'rgba(255, 205, 150, 1)', // dark red
    angle = 'to bottom'
}: Props) {

    return (
        <div style={{
            ...Style.container,
            width: widthProp,
            height: heightProp,
            background: `linear-gradient(${angle}, ${colorLeft}, ${colorRight})`, // random colors
            }}>

            <h5 style={Style.author}>{`${author.substring(0, author.length> 20 ? 20 : author.length)}${author.length > 20 ? "..." : ""}`}</h5>

            <h6 style={Style.timestamp}>{meritSource}, {timestamp}</h6>

            <p style={Style.text}>{`${privacyOn ? text.substring(0, 30) : text}${privacyOn && text.length > 30 ? "..." : ""}`}</p>
        </div>
    );
};














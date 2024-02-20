import Link from 'next/link'

const Style: { [key: string]: React.CSSProperties } = {
    section: {
        borderTop: "white 1px solid",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        display: "flex",
    },
    titleText: {
        fontFamily: "georgia",
        fontSize: "1.2rem",
        color: "white",
        fontWeight: "normal",
        paddingBottom: "1rem",
    },
    date: {
        fontFamily: "georgia",
        fontSize: "1rem",
        color: "white",
        fontWeight: "normal",
        paddingRight: "3rem",
    },
    rightColumn: {
        display: "flex",
        flexDirection: "column",
        flexGrow: "1"
    },
    readMoreButton: {
        textAlign: "right",
        background: "transparent",
        border: "none",
        color: "white",
        fontFamily: "georgia",
        fontSize: "1.2rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    },
};

type Props = {
    year: number,
    month: number,
    day: number,
    title: string,
    readMoreLabel?: string,
    // onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
    // className: string,
    route: string,
}

export const NewsItem = ({
    year,
    month,
    day,
    title,
    readMoreLabel = "Read More",
    route,
} : Props) => {
    return (<section style={Style.section}>
        <div style={Style.date}>
            <span>{year}年{month}月{day}日</span>
        </div>
        <div style={Style.rightColumn}>
            <h2 style={Style.titleText}>{title}</h2>
            <Link style={Style.readMoreButton} href={route}>{readMoreLabel}</Link>
        </div>
        
    </section>);
    
};
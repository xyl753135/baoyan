import Image from "next/image";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        flexBasis: "600px",
        flexGrow: "1",
        justifyContent: "space-around",
        alignItems: "center",
        // border: "black 2px solid",
    },
};

export default function Page() {
    return <main style={Style.container}>
        <div style={Style.container}>
            <h1>Profile page!</h1>
            <Image src={"/placeholders/wip.png"} alt={"Work in Progress"} width={300} height={300}></Image>
        </div>
        
    </main>
}
import { NewsItem } from "@/components/NewsItem";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        paddingLeft: "9rem",
        paddingRight: "9rem",
    },
    header: {
        fontFamily: "georgia",
        fontSize: "2rem",
        color: "white",
        fontWeight: "normal",
        textAlign: "center",
        paddingBottom: "1rem",
    },
    date: {
        textAlign: "right",
    },
    body: {
        fontFamily: "georgia",
        fontSize: "1rem",
        color: "white",
        fontWeight: "normal",
        textAlign: "justify",
    },
    link: {
        marginTop: "3rem",
        width: "100%",
        height: "100vh",
        border: "none",
    },
};

export default function Page({ params }: { params: { article: string } }) {
    return (<main style={Style.main}>
        {/* TODO change to /get fetch to get article details */}
        {params.article == "1" ? (
        <article>
            <h1 style={Style.header}>【楞嚴神咒建寶嚴】邀請您的加入</h1>
            <section style={Style.body}>
                <p style={Style.date}>2024年2月18日</p>
                <p>
                    【楞嚴神咒建寶嚴】邀請您的加入
                    <br></br>
                    百萬楞嚴立法幢，
                    <br></br>
                    百億神咒建梵剎。
                    <br></br>
                    <br></br>
                </p>
            </section>
            <section style={Style.body}>
                <p>
                    甲辰年，寶嚴禪寺即將邁入興建動土。邀請您加入持誦楞嚴神咒建寶嚴行列。
                    <br></br>
                    以萬眾一心凝聚的功德力，建造一座萬年寶剎。
                    <br></br>
                    <br></br>
                    寶嚴禪寺總住持傳塵大和尚常說：「修行是積累的功夫。」我們發起每日持咒用功，將無形的功德紀錄下來，在群組迴向，從點滴的積累帶動更多人一起參與，也讓精進的法界逐步擴增，超越至無以計數。
                    <br></br>
                    <br></br>
                    持誦楞嚴咒素來是眾多學員入門的一項困擾與挑戰，讓許多人望之卻步。即日起，邀請您響應寶嚴一系列精進課程，課程皆搭配楞嚴咒的持誦共修，包括早安禪觀心一支香、每日秒懂楞嚴1000日、周末快閃楞嚴、一日禪、例行共修、九月楞嚴法會…等，協助您練就火燒楞嚴的持咒禪力朝首楞嚴大定向前邁進。
                    <br></br>
                    <br></br>
                    適逢歲次甲辰龍年，寶嚴禪寺更推出「聚寶龍集點卡」便利您紀錄持咒計數，我們要用綿密的工夫，以實際統計數據，成就一個萬年道場住世！
                    <br></br>
                    <br></br>
                    大！家！一！起！來～願在新的一年，人人來發願，千人同心，萬人同行，持誦1080遍楞嚴神咒，回向寶嚴禪寺建設順利。
                    <br></br>
                    <br></br>
                    即刻動員，歡迎至各分院領取【楞嚴神咒-聚寶龍集點卡】，把一整年的用功累計下來。
                    <br></br>
                    <br></br>
                    預告！預告！
                    <br></br>
                    <br></br>
                    九月寶嚴禪寺將舉辦為期三天楞嚴法會，屆時楞嚴勝會上，全球聚寶龍大會師，請帶著您的積累前來共赴法筵喔！速速至各分院領取～
                    <br></br>
                    <br></br>
                    邀請您成為百萬楞嚴神咒種子團隊，報名登記連結由此入：
                    <br></br>
                </p>
                <iframe style={Style.link} src="https://docs.google.com/forms/d/e/1FAIpQLSex_BU6lOm3wSZ8C73siIEasYoJt5ZJEOqyAnp65nW1FvBdKA/viewform?embedded=true" scrolling="no">Loading…</iframe>
            </section>
        </article>) : null} 


    </main>);
}
import { NewsItem } from "@/components/NewsItem";

const Style: { [key: string]: React.CSSProperties } = {
    header: {
        fontFamily: "georgia", // branding yellow
        fontSize: "2rem",
        color: "white",
        fontWeight: "normal",
        textAlign: "center",
        paddingBottom: "1rem",
    },
};

export default function Page() {
    return (<main>
        <h1 style={Style.header}>寶嚴快訊</h1>
        <NewsItem year={2024} month={2} day={18} title={"【楞嚴神咒建寶嚴】邀請您的加入"} readMoreLabel="更多..." route={"/news/1"}></NewsItem>
        <NewsItem year={2024} month={2} day={17} title={"廣度眾生苦，禮讚新「僧」命─寶嚴禪寺2024 年2 月22 日于高雄圓道禪院舉行新佛子剃度大典"} readMoreLabel="更多..." route={""}></NewsItem>
        <NewsItem year={2024} month={2} day={9} title={"見輝法師疫情後首次赴美弘法，為華人世界帶來新的心靈啟迪"} readMoreLabel="更多..." route={""}></NewsItem>
        <NewsItem year={2024} month={1} day={12} title={"2024年甲辰龍年點【常年光明燈】開始登記"} readMoreLabel="更多..." route={""}></NewsItem>
        <NewsItem year={2024} month={1} day={12} title={"【好書推薦】《剛剛好的般若—好好讀金剛經》正式上架"} readMoreLabel="更多..." route={""}></NewsItem>
        <NewsItem year={2024} month={1} day={12} title={"2024年寶嚴禪寺新春禮三千佛曁上燈祈福大法會"} readMoreLabel="更多..." route={""}></NewsItem>
        <NewsItem year={2023} month={6} day={14} title={"【海外捐款通知】"} readMoreLabel="更多..." route={""}></NewsItem>
    </main>);
}
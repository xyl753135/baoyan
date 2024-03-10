
const Style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "black 2px solid",
    },
};

type Props = {
    handleMantraDropdown: Function,
}

export const MantraUI = ({
    handleMantraDropdown,
}: Props) => {

    return (
        <>
            <fieldset>
                <label>選擇神咒: </label>
                <select onChange={(event) => handleMantraDropdown(event.currentTarget.value)}>
                    <option value="shurangamaFull">楞嚴神咒(正常版)</option>
                    <option value="shurangamaShort">楞嚴神咒(簡介版)</option>
                </select>
            </fieldset>
            <fieldset>
                <label>選擇語言: </label>
                <select>
                    <option value="zhHANT">繁體中文</option>
                    <option value="zhHANS">簡體中文</option>
                    <option value="en">English</option>
                    <option value="de">Deutsche</option>
                </select>
            </fieldset>
            <fieldset>
                <label>統計: </label>
                <span>本次: 0</span><br></br>
                <span>累計: 0</span><br></br>
                <span>全球總計: 0</span><br></br>
            </fieldset>
        </>
    );
};
import React, { useState, useContext, createContext } from 'react';

const FontsizeContext = createContext<Fontsize>("normal");
const FontsizeUpdateContext = createContext<Function>(() => {});

type Fontsize = "normal" | "large" | "huge";

export function useFontsize() {
    return useContext(FontsizeContext);
}

export function useFontsizeUpdate() {
    return useContext(FontsizeUpdateContext);
}

export function FontsizeProvider( props:{ children: React.ReactNode }) {
    const [fontsize, setFontsize] = useState<Fontsize>("normal");

    function changeFontsize(fontsize:Fontsize) {
        console.log(`Change fontsize to ${fontsize}.`)
        setFontsize(prevFontsize => fontsize);
    }

    return (
        <FontsizeContext.Provider value={fontsize}>
            <FontsizeUpdateContext.Provider value={changeFontsize}>
                { props.children }
            </FontsizeUpdateContext.Provider>
        </FontsizeContext.Provider>
    )
}
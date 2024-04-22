'use client'

import Image, { StaticImageData } from "next/image";

import expand from "@/public/icons/expand.png"

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column"
    }
};

export default function Page() {



    return (
        <main style={Style.container}>
            <h1>Achievements</h1>
            {/*  */}
            <section>
                <h2>Watchlist</h2>
                
            </section>
            {/*  */}
            <section>
                <h2>All Achievements</h2>
                
            </section>
            {/*  */}
            <section>
                <h2></h2>
                
            </section>
        </main>
    );
}

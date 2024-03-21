
export type Lyric = {
    text: string,
    time: number,
};

export type Metadata = {
    artist: string,
    album: string,
    title: string,
    length: string
};

export type LRCContent = {
    metadata: Metadata,
    lyrics: Lyric[]
};
type Lyric = {
  text: string,
  time: number,
};
type Metadata = {
  artist: string,
  album: string,
  title: string,
  length: string,
}

/**
 * 
 * eg. "[00:00.00] example!" => true
 * eg. "[99:99:99]" => false (missing space after end square-bracket)
 * eg. "[00:00.00" => false (missing closing square-bracket)
 * eg. "[00:00200]" => false (missing dot)
 */


/**
 * Parse timeValue into seconds
 * Eg. "03:24.73" => 204.73 (total time in seconds)
 * @param time
 * @returns
 */
function parseTime(time: string | undefined) {
  try {
    if (time == undefined) {
      throw new Error();
    }
    const minsec = time.split(":");
    const min = parseInt(minsec[0]) * 60;
    const sec = parseFloat(minsec[1]);
    return min.toString() + sec;
  } catch (error) {
    console.error(`LyricsParser threw error in parseTime(time:${time})`);
    return "";
  }
}

/**
 *
 * @param lrc (string), all text content from a lrc file
 * @returns
 */
function parseLRC(line: string, metadata: Metadata, lyrics: Lyric[]) {
  // Parse metadata
  if (line.substring(1, 3) == "ar") {
    metadata.artist = line.substring(4, line.length - 1);
  } else if (line.substring(1, 3) == "al") {
    metadata.album = line.substring(4, line.length - 1);
  } else if (line.substring(1, 3) == "ti") {
    metadata.title = line.substring(4, line.length - 1);
  } else if (line.substring(1, 7) == "length") {
    metadata.length = line.substring(4, line.length - 1);
  } else {
    // Regex pattern for matching each lyrics line
    try{
      const time = line.slice(1, line.indexOf("]"));
      const text = line.slice(line.indexOf("]") + 1, line.length);
      // Convert time to seconds
      lyrics.push({
        time: convertTimeToSeconds(time),
        text: text ? text : "",
      });
    } catch(err) {
      console.log("parseLRC err", err);
    }
  }
}

export function parseLRCFile(filepath: string) {
  let contents: { metadata: Metadata, lyrics: Lyric[] } = { 
    // default values
    metadata: {
      artist: "",
      album: "",
      title: "",
      length: ""
    },
    lyrics: []
  };
  fetch(filepath)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.text();
    })
    .then(fileContents => {
      // console.log("text", lrcContents.split('\r\n'));
      // Split file content into separate individual lines based on line-break CLFR
      let lines = fileContents.split('\r\n');
      for (let index = 0; index < lines.length; index++) {
        parseLRC(lines[index], contents.metadata, contents.lyrics);
      }
    });
  return contents;
}

/**
 * Given a string, return the time (string) as seconds (number)
 * @param time // Expected format [hr:mm:ss.ms] or [mm:ss.ms]
 */
function convertTimeToSeconds(time: string) {
  const numOfSemiColons = time.split(":").length - 1;
  if (numOfSemiColons == 2) {
    // Expected format [hr:mm:ss.ms]
    console.log("convertTimeToSeconds unimplemented hours format");
    return 0;
  } else if (numOfSemiColons == 1) {
    // Expected format [mm:ss.ms]
    const minutes = time.slice(0, time.indexOf(":"));
    const seconds = time.slice(time.indexOf(":") + 1, time.indexOf("."));
    return parseInt(seconds) + (parseInt(minutes) * 60);
  } else {
    // Format error
    console.log("convertTimeToSeconds format error");
    return 0;
  }
}
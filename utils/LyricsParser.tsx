type Lyric = {
  text: string;
  time: string;
};

/**
 * Regex pattern will match each line in lrc file: format [time] sometext
 * eg. "[00:00.00] example!" => true
 * eg. "[99:99:99]" => false (missing space after end square-bracket)
 * eg. "[00:00.00" => false (missing closing square-bracket)
 * eg. "[00:00200]" => false (missing dot)
 */
function parseLRCLine(line: string) {
  const regex = /^\[(?<time>\d{2}:\d{2}\.\d{2})\] (?<text>(.*)+)/;
  const time = line.match(regex)?.groups?.time;
  const text = line.match(regex)?.groups?.text;

  const result = {
    time: line.match(regex)?.groups?.time,
    text: line.match(regex)?.groups?.text,
  };
  return result;
}

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
function parseLRC(lrc: string) {
  const lyrics: Lyric[] = [];

  // Split file content into separate individual lines based on line-break CLFR
  const lines = lrc.split("\n");

  // Push each line (skip push if invalid data)
  lines.forEach((line) => {
    const eachData = parseLRCLine(line);
    const timeValue = eachData.time;
    const textValue = eachData.text;

    if (
      !(
        timeValue == null ||
        timeValue == undefined ||
        timeValue.trim() == ""
      ) &&
      !(textValue == null || textValue == undefined || textValue.trim() == "")
    ) {
      lyrics.push({
        time: parseTime(timeValue),
        text: textValue.trim(),
      });
    }
  });
  return lyrics;
}

export default function parseLRCFile(filepath:string) {
    // filepath
    parseLRC("");
}
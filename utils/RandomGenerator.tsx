/**
 * Given a range, return a random integer from between min and max
 * @param min 
 * @param max 
 * @returns 
 */
export function getRandomInteger(min: number, max: number) {
    // Validate input
    try {
        if (max < min) {
            throw new Error("Invalid inputs provided: min can't be greater than max");
        }
        return Math.floor(Math.random() * (max - min)) + min;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export function getDistinctRandomIntegers(min: number, max: number, howMany: number) {
    if (howMany >= (max - min + 1) || max == min) {
        throw new Error('getDistinctRandomIntegers(...) was given invalid variables');
    }

    let possibilities: Array<number> = [];
    for (let index = 0; index < (max - min + 1); index++) {
        possibilities.push(min + index);
    }
    // console.log("possibilities", possibilities);

    let result: Array<number> = [];
    for (let index = 0; index < howMany; index++) {
        const randomIndex = getRandomInteger(0, possibilities.length);
        result.push(possibilities[randomIndex]);
        possibilities.splice(randomIndex, 1);
    }
    // console.log("result", result);

    return result;
}

export function getRandomColors(
    lightColors: boolean,
    darkColors: boolean,
    num: 2 | 3 | 4 | 5 | 6) {
    const colorsLight = [
        {
            family: "red",
            value: "rgba(255, 150, 150, 1)"
        },
        {
            family: "green",
            value: "rgba(150, 255, 150, 1)"
        },
        {
            family: "blue",
            value: "rgba(150, 150, 255, 1)"
        },
        {
            family: "yellow",
            value: "rgba(255, 235, 150, 1)"
        },
        {
            family: "purple",
            value: "rgba(255, 150, 255, 1)"
        },
        {
            family: "teal",
            value: "rgba(150, 255, 255, 1)"
        },
        {
            family: "orange",
            value: "rgba(255, 205, 150, 1)"
        },
    ];
    const colorsDark = [
        {
            family: "red",
            value: "rgba(200, 50, 50, 1)"
        },
        {
            family: "green",
            value: "rgba(50, 200, 50, 1)"
        },
        {
            family: "blue",
            value: "rgba(50, 50, 200, 1)"
        },
        {
            family: "yellow",
            value: "rgba(230, 180, 100, 1)"
        },
        {
            family: "purple",
            value: "rgba(200, 50, 200, 1)"
        },
        {
            family: "teal",
            value: "rgba(50, 200, 200, 1)"
        },
        {
            family: "orange",
            value: "rgba(250, 140, 50, 1)"
        },
    ];

    let colors: { family: string; value: string; }[] = [];
    if (lightColors && darkColors) {
        colors = colorsLight.concat(colorsDark);
    } else if (lightColors) {
        colors = colorsLight;
    } else if (darkColors) {
        colors = colorsDark;
    }
    // console.log("colors", colors);

    let indexes = getDistinctRandomIntegers(0, colors.length - 1, num);
    // console.log("indexes", indexes);

    let results = []
    for (let i = 0; i < indexes.length; i++) {
        const color = colors[indexes[i]].value;
        results.push(color);
    }

    // console.log("results", results)
    return results;
}
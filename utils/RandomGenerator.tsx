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
        return Math.floor(Math.random() * (max - min) ) + min;
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
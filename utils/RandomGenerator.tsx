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
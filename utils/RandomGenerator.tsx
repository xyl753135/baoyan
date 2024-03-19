/**
 * Given a range, return a random integer from between min and max
 * @param min 
 * @param max 
 * @returns 
 */
export function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
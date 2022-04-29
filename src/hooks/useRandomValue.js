/**
 * params order is not mandatory
 * @param {Number} first 
 * @param {Number} second 
 * @returns a random number between two numbers
 */
const getRandomValue = (first, second) => {
    let max = Math.max(first, second)
    let min = Math.min(first, second)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const useRandomValue = () => {
    return getRandomValue
}
export default useRandomValue

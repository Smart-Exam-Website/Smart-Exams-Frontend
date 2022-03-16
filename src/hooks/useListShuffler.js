/**
 * random the order of a list
 * @param {Array} list 
 * @returns shuffled list
 */
const shuffler = (list) => {
    return list.sort(() => Math.random() - 0.5)
}

const useListShuffler = () => {
    return shuffler
}

export default useListShuffler

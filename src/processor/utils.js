export function getAverage(array, divider) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / divider;
}

export function arrayToChunks(array, size = 4) {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        result.push(chunk)
    }
    return result
}

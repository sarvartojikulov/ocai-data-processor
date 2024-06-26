export function arrayToChunks<T>(array : T[], size = 4) : T[][] {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        result.push(chunk)
    }
    return result
}

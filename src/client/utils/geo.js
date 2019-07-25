

export function strToLonAndLat(str) {
    let seperated = str.split(', ');
    return seperated.map(parseFloat);
}
export function idToString(id: string): string {
    if (id.length > 4) id = id.slice(0, 4);
    while (id.length < 4) {
        id = "0" + id;
    }
    return id;
}

export function idToStringArray(array: string[]): string[] {
    let newArray = [];
    for (let id of array) {
        if (id.length > 4) id = id.slice(0, 4);
        while (id.length < 4) {
            id = "0" + id;
        }
        newArray.push(id);
    }
    return newArray;
}

export default {idToString, idToStringArray}
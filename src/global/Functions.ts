export function idToString(id: number): string {
    let str: string = id.toString();
    if (str.length > 4) str = str.slice(0, 4);
    while (str.length < 4) {
        str = "0" + str;
    }
    return str;
}
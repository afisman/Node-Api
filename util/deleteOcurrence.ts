

export const deleteOcurrence = (arr: any, id: number): any => {
    var j = 0;
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] !== id) {
            arr[j++] = arr[i];
        }
    }
    return arr
}
export default function flatten(...items) {
    let arr = [];
    items.forEach(item => {
        if (item instanceof Array) {
            arr = arr.concat(flatten(...item));
        } else {
            arr.push(item);
        }
    });
    return arr;
}

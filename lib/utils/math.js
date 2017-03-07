
export function percent(obj, factor) {

    for (var i in obj) {

        if (obj[i].constructor === Array) {
            percent(obj[i], factor)
        } else if (obj[i].constructor === Object) {
            percent(obj[i], factor)
        } else if (obj[i].constructor === Number) {
            i === 'x' && (obj[i] = (obj[i] - 0.5) * factor + 0.5);
        }

    }

    return obj
}

export function minus(obj, num) {

    for (var i in obj) {

        if (obj[i].constructor === Array) {
            minus(obj[i], num)
        } else if (obj[i].constructor === Object) {

            minus(obj[i], num)
        } else if (obj[i].constructor === Number) {
            i === 'x' && (obj[i] = num - obj[i]);
        }
    }

    return obj

}

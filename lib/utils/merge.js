export function mergeJSON(baseObj, diyObj) {
    var obj = Object.assign({}, baseObj);

    for (var i in diyObj) {
        obj[i] = diyObj[i]
    }

    return obj;
};


// this will decrease flexible
// for Shisan to use only
export function mergeArr(baseArr, diyArr) {
    var finalArr = []

    for (var i in baseArr) {
        finalArr[i] = mergeJSON(baseArr[i], diyArr[i])
    }

    return finalArr
}



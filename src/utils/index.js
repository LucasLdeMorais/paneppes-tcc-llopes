function roundDouble(value, places) {
    let factor = Math.pow(10, places);
    value = value * factor;
    let tmp = Math.round(value);
    return tmp / factor;
}

function removeItemAll(arr1, arr2, value) {
    arr1.forEach((item,index) => {
        if (item === value) {
            arr1.splice(index, 1);
            arr2.splice(index, 1);
        }
    })
    return arr1
}

export {roundDouble, removeItemAll};
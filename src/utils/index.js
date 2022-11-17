function roundDouble(value, places) {
    let factor = Math.pow(10, places);
    value = value * factor;
    let tmp = Math.round(value);
    return tmp / factor;
}

export {roundDouble};
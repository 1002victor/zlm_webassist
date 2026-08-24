function findDifferentProperties(objA, objB, prefix = '') {
    const differentProps = {};

    for (const key in objA) {
        if (objA.hasOwnProperty(key)) {
            const propPath = prefix ? `${prefix}.${key}` : key;
            if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
                const nestedDifferences = findDifferentProperties(objA[key], objB[key], propPath);
                if (Object.keys(nestedDifferences).length > 0) {
                    differentProps[key] = nestedDifferences;
                }
            } else if (objA[key] !== objB[key]) {
                // differentProps[key] = {
                //     oldValue: objA[key],
                //     newValue: objB[key],
                // };
                differentProps[key] = objB[key];
            }
        }
    }
    return differentProps;
}

function flattenObject(obj, parentKey = '') {
    const result = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                const flattened = flattenObject(obj[key], newKey);
                Object.assign(result, flattened);
            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
}

function byteString(value) {
    const GB = 1024 * 1024 * 1024;
    const MB = 1024 * 1024;
    if (value >= GB) {
        return (value / GB).toFixed(2).toString() + "GB"
    }
    else if (value >= MB) {
        return (value / MB).toFixed(2).toString() + "MB"
    }
    else if (value >= 1024) {
        return (value / 1024).toFixed(2).toString() + "KB"
    }
    else {
        return value.toString() + "byte"
    }
}

function bitsString(value) {
    const Gbit = 1000 * 1000 * 1000;
    const Mbit = 1000 * 1000;
    if (value >= Gbit) {
        return (value / Gbit).toFixed(2).toString() + "Gbit"
    }
    else if (value >= Mbit) {
        return (value / Mbit).toFixed(2).toString() + "Mbit"
    }
    else if (value >= 1000) {
        return (value / 1000).toFixed(2).toString() + "Kbit"
    }
    else {
        return value.toString() + "bit"
    }
}

function durationFormat(seconds) {
    seconds = Math.floor(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
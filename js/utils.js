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
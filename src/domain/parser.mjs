async function getNegativeDataFrom(fileContent) {
    // Get spaces and tabs from each line
    const result = [];
    const lines = fileContent.split('\n');
    lines.forEach(line => {
        const spaces = line.match(/^\s*/)[0];
        const tabs = line.match(/^\t*/)[0];
        if (spaces.length > 0) {
            result.push(spaces.length);
        } else if (tabs.length > 0) {
            result.push(tabs.length);
        } else {
            result.push(0);
        }
    });
    return result;
}

function normalizeNegativeData(negativeData) {
    const maxHeigth = Math.max(...negativeData);
    const result = [];

    for (let i = 0; i <= maxHeigth; i++) {
        result.push([]);
    }

    negativeData.forEach(line => {
        const actualHeight = parseInt(line, 10);

        for (let i = 0; i <= maxHeigth; i++) {
            if (actualHeight === 0 && i === 0) {
                result[i].push('_');
            } else if (i === 0) {
                result[i].push('I');
            } else if (i <= line && i > 0) {
                result[i].push('¡');
            } else if (i >= actualHeight) {
                result[i].push('#');
            }
        }
    });

    const reversedArray = result.reverse();
    let returnValue = '';
    reversedArray.forEach(line => {
        const swap = returnValue.concat(`${line.join('')}\n`);
        returnValue = swap;
    });

    return returnValue;
}

export {
    getNegativeDataFrom,
    normalizeNegativeData,
};

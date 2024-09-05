export function emojiConverter({output}) {
    return {
        async getNegativeDataFrom(fileContent) {
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
        },
        // [0,0,4,8,4,0]
        normalizeNegativeData(negativeData) {
            const maxHeigth = Math.max(...negativeData);
            const result = new Array(maxHeigth + 1).fill(0).map(() => []);

            negativeData.forEach(line => {
                const actualHeight = parseInt(line, 10);
                for (let i = 0; i <= maxHeigth; i++) {
                    if (actualHeight === 0 && i === 0) {
                        result[i].push(output.chars.street);
                    } else if (i === 0) {
                        result[i].push(output.chars.foundation);
                    } else if (i <= line && i > 0) {
                        result[i].push(output.chars.building);
                    } else if (i >= actualHeight) {
                        result[i].push(output.chars.cloud);
                    }
                }
            });
            const reversedArray = result.reverse();
            let returnValue = '';

            reversedArray.forEach((line, index) => {
                const lastChar = index === reversedArray.length - 1 ? '' : '\n';
                const swap = line.join('') + lastChar;
                returnValue += swap;
            });

            return returnValue;
        },
    };
}

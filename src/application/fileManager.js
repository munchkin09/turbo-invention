
const path = require('path');
const fs = require('fs-extra');

module.exports = { 
    getNegativeDataFrom: async (fileContent) => {
        //Get spaces and tabs from each line
        const result = [];
        const lines = fileContent.split("\n")
        lines.forEach(line => {
            const spaces = line.match(/^\s*/)[0];
            const tabs = line.match(/^\t*/)[0];
            if(spaces.length > 0) {
                result.push(spaces.length);
            } else if(tabs.length > 0) {
                result.push(tabs.length);
            } else {
                result.push(0);
            } 
        })
        return result;
    },
    normalizeNegativeData: async (negativeData) => {
        //From an array to horizontal lines representation
        const maxHeigth = Math.max(...negativeData);
        const result = [];

        for(let i = 0; i <= maxHeigth; i++) {
            result.push([]);
        }

        negativeData.forEach(line => {
            const actualHeight = parseInt(line);

            for(let i = 0; i <= maxHeigth; i++) {
                if(actualHeight === 0 && i === 0) {
                    result[i].push('_');
                } else if(i === 0) {
                    result[i].push('¡');
                } else if(i <= line && i > 0) {
                    result[i].push('I');
                } else if(i >= actualHeight) {
                    result[i].push('#');
                }
            }

        });

        const reversedArray = result.reverse();
        let returnValue = '';
        reversedArray.forEach(line => returnValue+=`${line.join('')}\n`);
        return returnValue;
    }
}
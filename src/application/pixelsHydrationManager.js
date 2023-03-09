module.exports = {
    async hydrateHorizontalData(horizontalData) {
        return xPromise.all(horizontalData.split('\n').map(async (line, index) => {
            const regefHash = line.match(/#/g);
            const numberOfHash = regefHash !== null ? regefHash.length : 0;
            const regexI = line.match(/I/g);
            const numberOfI = regexI !== null ? regexI.length : 0;
            const regexExclamation = line.match(/¡/g);
            const numberOfExclamation =  regexExclamation !== null ? regexExclamation.length : 0;
            const regextUnderscore = line.match(/_/g);
            const numberOfUnderscore = regextUnderscore !== null ? regextUnderscore.length : 0;
            const numberOfTotalCharacters = line.length;

            return { line, 
                index,
                numberOfI,
                numberOfHash,
                numberOfExclamation,
                numberOfUnderscore,
                numberOfTotalCharacters, 
                indivdualPixeldData: line.split('') };
        }));
    },
};
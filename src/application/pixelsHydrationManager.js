module.exports = {
    async hydrateHorizontalData(horizontalData) {
        return Promise.all(horizontalData.split('\n').map(async (line, index) => {
            const regefHash = line.match(/#/g);
            const numberOfHash = regefHash === null ? 0 : regefHash.length;
            const regexI = line.match(/I/g);
            const numberOfI = regexI === null ? 0 : regexI.length;
            const regexExclamation = line.match(/¡/g);
            const numberOfExclamation = regexExclamation === null ? 0 : regexExclamation.length;
            const regextUnderscore = line.match(/_/g);
            const numberOfUnderscore = regextUnderscore === null ? 0 : regextUnderscore.length;
            const numberOfTotalCharacters = line.length;

            return {
                line,
                index,
                numberOfI,
                numberOfHash,
                numberOfExclamation,
                numberOfUnderscore,
                numberOfTotalCharacters,
                indivdualPixeldData: line.split(''),
            };
        }));
    },
};

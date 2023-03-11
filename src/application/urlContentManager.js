const axios = require('axios');

// _ = space between lines
// \t = tab
// \s = space

module.exports = {
    async getFileFromUrl(url) {
        // Retrieve file from given url using axios
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });
        if (response.status !== 200) {
            throw new Error('The file could not be retrieved');
        }

        // Convert response to plain text
        let fileContent;
        try {
            fileContent = new TextDecoder('utf-8').decode(response.data);
        } catch (error) {
            throw new Error('The file is not a text file', error);
        }

        return fileContent;
    },
};

import axios from 'axios';

export default function () {
    return {
        async getFileFromUrl(url) {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
            });
            if (response.status !== 200) {
                throw new Error('The file could not be retrieved');
            }

            return response.data;
        },
        readFileContent(data) {
            let fileContent;
            try {
                fileContent = new TextDecoder('utf-8').decode(data);
            } catch (error) {
                throw new Error('The file is not a text file', error);
            }

            return fileContent;
        },
    };
}

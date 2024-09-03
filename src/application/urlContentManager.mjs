// _ = space between lines
// \t = tab
// \s = space

export async function getFileFromUrl(url) {
    // Retrieve file from given url using fetch
    const response = await fetch(url);

    if (response.status !== 200) {
        throw new Error('The file could not be retrieved');
    }

    let fileContent;
    try {
        fileContent = response.data;
    } catch (error) {
        throw new Error('The file is not a text file', error);
    }

    return fileContent;
}


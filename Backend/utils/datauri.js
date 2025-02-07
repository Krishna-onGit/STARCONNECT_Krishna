import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (files) => {
    const parser = new DataUriParser();
    const extName = path.extname(files.originalname).toString();
    return parser.format(extName, files.buffer);
}

export default getDataUri;
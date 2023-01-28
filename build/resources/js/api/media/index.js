"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaSignedURL = exports.uploadToS3 = exports.getS3Token = void 0;
const __1 = require("../");
const getS3Token = async (data) => {
    return __1.instance.post('/get_media_token', data).then((response) => {
        return response.data;
    });
};
exports.getS3Token = getS3Token;
const uploadToS3 = async (data, setProgress) => {
    let p = 0;
    return __1.instance
        .put(data.url, data.file, {
        headers: {
            'Content-Type': data.file.type,
        },
        onUploadProgress: (progressEvent) => {
            p = progressEvent.progress;
            setProgress(p);
        },
    })
        .then(async (response) => {
        return response.data;
    });
};
exports.uploadToS3 = uploadToS3;
const getMediaSignedURL = async (data) => {
    return __1.instance.post('/get_signed_url', data).then((response) => {
        return response.data;
    });
};
exports.getMediaSignedURL = getMediaSignedURL;
//# sourceMappingURL=index.js.map
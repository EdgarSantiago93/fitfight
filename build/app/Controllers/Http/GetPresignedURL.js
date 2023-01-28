"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class GetPresignedURL {
    async apiHandle({ auth, request, response }) {
        await auth.use('web').authenticate();
        const fileKey = request.input('file_key');
        const live = request.input('is_live');
        const fileType = request.input('file_type');
        const res = await this.controllerAction({ fileKey: fileKey, live: live, fileType: fileType });
        if (res == 'error') {
            return response.badRequest('Error generando el URL');
        }
        return response.json({
            success: true,
            data: res,
        });
    }
    async controllerAction({ fileKey, fileType, live = false }) {
        aws_sdk_1.default.config.update({
            accessKeyId: Env_1.default.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: Env_1.default.get('AWS_SECRET_ACCESS_KEY'),
        });
        const S3_BUCKET = live ? 'fitfight' : 'fitfight-temp';
        const REGION = 'us-west-1';
        const URL_EXPIRATION_TIME = 3600;
        const myBucket = new aws_sdk_1.default.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });
        const res = new Promise((resolve, _reject) => {
            myBucket.getSignedUrl('getObject', {
                Key: fileKey,
                Expires: URL_EXPIRATION_TIME,
            }, async (_err, url) => {
                if (_err) {
                    console.log('error', _err);
                    resolve('error');
                }
                console.log('SIGNED URL  ', url);
                resolve(url);
            });
        });
        return await res;
    }
}
exports.default = GetPresignedURL;
//# sourceMappingURL=GetPresignedURL.js.map
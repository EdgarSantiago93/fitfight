"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Media_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Media"));
const path_1 = __importDefault(require("path"));
class GetUploadToken {
    async handle({ auth, request, response }) {
        const mimeTypes = [
            'image/png',
            'image/gif',
            'image/jpeg',
            'image/svg+xml',
            'image/webp',
            'image/heif',
            'image/heic',
        ];
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        const fileName = request.input('file_name');
        const fileType = request.input('file_type');
        const fileSize = request.input('file_size') / 1000 / 1000;
        const fileExtension = path_1.default.extname(fileName);
        if (fileSize > 10) {
            return response.badRequest('Archivo mayor a 10MB');
        }
        if (!mimeTypes.includes(fileType)) {
            return response.badRequest('Solo se permiten imágenes');
        }
        const newName = `${user.id}-${Date.now()}${fileExtension}`;
        aws_sdk_1.default.config.update({
            accessKeyId: Env_1.default.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: Env_1.default.get('AWS_SECRET_ACCESS_KEY'),
        });
        const S3_BUCKET = 'fitfight-temp';
        const REGION = 'us-west-1';
        const URL_EXPIRATION_TIME = 180;
        const myBucket = new aws_sdk_1.default.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });
        const res = new Promise((resolve, _reject) => {
            myBucket.getSignedUrl('putObject', {
                Key: newName,
                ContentType: fileType,
                Expires: URL_EXPIRATION_TIME,
            }, async (_err, url) => {
                if (_err) {
                    resolve(response.badRequest('Error getting signed URL'));
                }
                const dbMedia = await Media_1.default.create({
                    name: newName,
                    type: fileType,
                    url: url,
                    status: 'pending',
                    description: '',
                    userId: user.id,
                });
                resolve(response.json({ data: { url: url, key: newName, id: dbMedia.id }, success: true }));
            });
        });
        return await res;
    }
}
exports.default = GetUploadToken;
//# sourceMappingURL=GetUploadToken.js.map
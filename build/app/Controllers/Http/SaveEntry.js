"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Entry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Entry"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const moment_1 = __importDefault(require("moment"));
const Media_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Media"));
const luxon_1 = require("luxon");
class SaveEntry {
    async handle({ auth, request, response }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        aws_sdk_1.default.config.update({
            accessKeyId: Env_1.default.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: Env_1.default.get('AWS_SECRET_ACCESS_KEY'),
        });
        const S3_BUCKET = 'fitfight-temp';
        const REGION = 'us-west-1';
        const S3instance = new aws_sdk_1.default.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });
        const dbUser = await User_1.default.find(user.id);
        const sod = (0, moment_1.default)().startOf('day').format();
        const eod = (0, moment_1.default)().endOf('day').format();
        const todaysEntry = await dbUser
            ?.related('entries')
            .query()
            .where('created_at', '>=', sod)
            .where('created_at', '<=', eod);
        if (todaysEntry && todaysEntry.length > 0) {
            return response.badRequest('Ya subiste una entrada hoy');
        }
        const sow = (0, moment_1.default)().startOf('isoWeek').format();
        const eow = (0, moment_1.default)().endOf('isoWeek').format();
        const thisWeeksActiveEntries = await dbUser
            ?.related('entries')
            .query()
            .where('is_rest_day', false)
            .where('created_at', '>=', sow)
            .where('created_at', '<=', eow);
        if (thisWeeksActiveEntries &&
            thisWeeksActiveEntries.length == 5 &&
            request.input('is_rest_day') == false) {
            return response.conflict('Ya tienes 5 días activos. Hoy puede ser tu día de descanso');
        }
        if (request.input('is_rest_day') == true) {
            const restDay = await dbUser
                ?.related('entries')
                .query()
                .where('is_rest_day', true)
                .where('created_at', '>=', sow)
                .where('created_at', '<=', eow);
            if (restDay && restDay.length > 0) {
                return response.badRequest('Ya tienes un día de descanso esta semana');
            }
            await Entry_1.default.create({
                is_rest_day: true,
                is_validated: true,
                user_id: user.id,
            });
        }
        else {
            await Entry_1.default.create({
                pose_file: request.input('pose_img') ? request.input('pose_img') : null,
                tracker_file: request.input('tracker_img') ? request.input('tracker_img') : null,
                calories: request.input('calories'),
                minutes: request.input('minutes'),
                user_id: user.id,
            });
            const mediaFiles = [];
            if (request.input('pose_img')) {
                mediaFiles.push(request.input('pose_img'));
            }
            if (request.input('tracker_img')) {
                mediaFiles.push(request.input('tracker_img'));
            }
            const handleMovingMedia = async (media) => {
                const dbMedia = await Media_1.default.find(media);
                if (dbMedia) {
                    dbMedia.status = 'live';
                    await dbMedia.save();
                    S3instance.copyObject({
                        Bucket: 'fitfight',
                        CopySource: 'fitfight-temp/' + dbMedia.name,
                        Key: dbMedia.name,
                    }, (err, data) => {
                        console.log('err', err);
                        console.log('⭐data  moving ', data);
                    });
                }
            };
            mediaFiles.map(async (media) => {
                return await handleMovingMedia(media);
            });
            await Promise.all(mediaFiles);
        }
        const thisWeekEntries = await dbUser
            ?.related('entries')
            .query()
            .where('created_at', '>=', sow)
            .where('created_at', '<=', eow);
        const daysUntilEndOfWeek = (0, moment_1.default)().endOf('isoWeek').diff((0, moment_1.default)(), 'days');
        if (thisWeekEntries && thisWeekEntries.length == 6 && daysUntilEndOfWeek == 1) {
            await Entry_1.default.create({
                is_rest_day: false,
                is_validated: true,
                status: 'forced_rest',
                user_id: user.id,
                createdAt: luxon_1.DateTime.now().endOf('week'),
            });
        }
        return response.json({ success: true });
    }
}
exports.default = SaveEntry;
//# sourceMappingURL=SaveEntry.js.map
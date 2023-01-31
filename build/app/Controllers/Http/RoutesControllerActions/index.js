"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Entry"));
const moment_1 = __importDefault(require("moment"));
class RoutesControllerActions {
    async getUserTodaysEntries({ user }) {
        const entries = await Entry_1.default.query()
            .where('user_id', user.id)
            .where('created_at', '>=', (0, moment_1.default)().startOf('day').format())
            .where('created_at', '<=', (0, moment_1.default)().endOf('day').format());
        return entries;
    }
    async getTodaysEarliestEntry() {
        return await new Promise(async (resolve, _reject) => {
            const entry = await Entry_1.default.query()
                .where('created_at', '>=', (0, moment_1.default)().startOf('day').format())
                .where('created_at', '<=', (0, moment_1.default)().endOf('day').format())
                .preload('user')
                .orderBy('created_at', 'asc')
                .first();
            entry?.pose_file && (await entry.load('pose_file_model'));
            entry?.tracker_file && (await entry.load('tracker_file_model'));
            resolve(entry);
        });
    }
    async getUsersEntriesToVoteOn({ user }) {
        const entries = await Entry_1.default.query()
            .where('status', 'pending')
            .where('is_validated', 0)
            .whereNot('user_id', user.id)
            .where('created_at', '>=', (0, moment_1.default)().startOf('day').format())
            .where('created_at', '<=', (0, moment_1.default)().endOf('day').format())
            .whereNotExists((query) => {
            query.from('votes').whereRaw('votes.entry_id = entries.id').where('votes.user_id', user.id);
        })
            .preload('user')
            .orderBy('created_at', 'asc');
        const serializedEntries = [];
        for (let index = 0; index < entries.length; index++) {
            const entry = entries[index];
            entry?.pose_file && (await entry.load('pose_file_model'));
            entry?.tracker_file && (await entry.load('tracker_file_model'));
            const serialized = entry.serialize();
            entry.tracker_file &&
                (serialized.tracker_file_signed_url = await entry.tracker_file_model.presignedUrl());
            entry.pose_file &&
                (serialized.pose_file_signed_url = await entry.pose_file_model.presignedUrl());
            serializedEntries.push(serialized);
        }
        return serializedEntries;
    }
    async getValidatedEntries({ user }) {
        const entries = await user
            .related('entries')
            .query()
            .where('status', 'validated')
            .where('is_validated', 1)
            .where('created_at', '>=', (0, moment_1.default)().startOf('month').format())
            .where('created_at', '<=', (0, moment_1.default)().endOf('month').format());
        return entries;
    }
    async getUserThisWeeksEntries({ user }) {
        const sow = (0, moment_1.default)().startOf('isoWeek').format();
        const eow = (0, moment_1.default)().endOf('isoWeek').format();
        const entries = await user
            ?.related('entries')
            .query()
            .where('created_at', '>=', sow)
            .where('created_at', '<=', eow)
            .preload('votes', (query) => {
            query.preload('user');
        });
        return entries;
    }
}
exports.default = RoutesControllerActions;
//# sourceMappingURL=index.js.map
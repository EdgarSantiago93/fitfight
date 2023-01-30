"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Entry"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const moment_1 = __importDefault(require("moment"));
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
class RoutesController {
    async getLoginView({ auth, inertia, response }) {
        await auth.use('web').authenticate();
        if (auth.use('web').isLoggedIn) {
            return response.redirect('/');
        }
        const users = await User_1.default.all();
        return inertia.render('Login', {
            users: users,
        });
    }
    async getVotingView({ auth, inertia }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        const userCanVote = await Entry_1.default.query()
            .where('user_id', user.id)
            .where('created_at', '>=', (0, moment_1.default)().startOf('day').format())
            .where('created_at', '<=', (0, moment_1.default)().endOf('day').format());
        if (userCanVote.length == 0) {
            console.log('user CANNOT vote');
            return inertia.render('NoParticipation', { user: user });
        }
        const earliestEntry = await Entry_1.default.query()
            .where('created_at', '>=', (0, moment_1.default)().startOf('day').format())
            .where('created_at', '<=', (0, moment_1.default)().endOf('day').format())
            .preload('pose_file_model')
            .preload('tracker_file_model')
            .preload('user')
            .orderBy('created_at', 'asc')
            .first();
        let earliestJson = {};
        if (earliestEntry) {
            earliestJson = await new Promise(async (resolve, _reject) => {
                let serializedEarliest = earliestEntry?.serialize();
                if (earliestEntry.pose_file) {
                    await earliestEntry?.load('pose_file_model');
                    serializedEarliest.pose_file_signed_url =
                        await earliestEntry.pose_file_model?.presignedUrl();
                }
                if (earliestEntry.tracker_file) {
                    await earliestEntry?.load('tracker_file_model');
                    serializedEarliest.tracker_file_signed_url =
                        await earliestEntry.tracker_file_model?.presignedUrl();
                }
                resolve(serializedEarliest);
            });
        }
        const entriesToVote = await Entry_1.default.query()
            .where('status', 'pending')
            .where('is_validated', 0)
            .whereNot('user_id', user.id)
            .where('created_at', '>=', (0, moment_1.default)().startOf('day').format())
            .where('created_at', '<=', (0, moment_1.default)().endOf('day').format())
            .whereNotExists((query) => {
            query.from('votes').whereRaw('votes.entry_id = entries.id').where('votes.user_id', user.id);
        })
            .preload('user')
            .preload('pose_file_model')
            .preload('tracker_file_model');
        console.log(earliestEntry);
        return inertia.render('Vote', {
            user: user,
            entriesToVoteOn: entriesToVote,
            earliestEntry: earliestJson,
        });
    }
    async getLeaderBoardView({ auth, inertia }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        const users = await User_1.default.all();
        const userswithEntries = await Promise.all(users.map(async (user) => {
            let serialized = user.serialize();
            const entries = await user
                .related('entries')
                .query()
                .where('status', 'validated')
                .where('is_validated', 1)
                .where('created_at', '>=', (0, moment_1.default)().startOf('month').format())
                .where('created_at', '<=', (0, moment_1.default)().endOf('month').format());
            serialized.entries = entries;
            serialized.hasEntries = true;
            if (entries.length == 0) {
                serialized.hasEntries = false;
            }
            return serialized;
        }));
        return inertia.render('Leaderboard', { user: user, userswithEntries: userswithEntries });
    }
    async getDashboardView({ auth, inertia }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        const dbUser = await User_1.default.find(user.id);
        const sow = (0, moment_1.default)().startOf('isoWeek').format();
        const eow = (0, moment_1.default)().endOf('isoWeek').format();
        const weeksEntries = await dbUser
            ?.related('entries')
            .query()
            .where('created_at', '>=', sow)
            .where('created_at', '<=', eow)
            .preload('votes', (query) => {
            query.preload('user');
        });
        const weeksEntriesJson = await Promise.all(weeksEntries &&
            weeksEntries.map(async (entry) => {
                let serialized = entry.serialize();
                if (entry.pose_file) {
                    await entry.load('pose_file_model');
                    serialized.pose_file_signed_url = await entry.pose_file_model?.presignedUrl();
                }
                if (entry.tracker_file) {
                    await entry.load('tracker_file_model');
                    serialized.tracker_file_signed_url = await entry.tracker_file_model?.presignedUrl();
                }
                return serialized;
            }));
        return inertia.render('Home', { user: user, entries: weeksEntriesJson });
    }
    async entryShareCard({ request, response }) {
        if (!request.params().id) {
            return response.redirect('/');
        }
        const entry = await Entry_1.default.query().where('id', request.params().id).preload('user').first();
        moment_1.default.locale('es');
        const html = await View_1.default.render('share', {
            entryUser: entry?.$preloaded.user,
            date: `FitFight | ${(0, moment_1.default)().format('MMMM').charAt(0).toUpperCase() + (0, moment_1.default)().format('MMMM').slice(1)} ${(0, moment_1.default)().format('DD')}`,
        });
        return html;
    }
}
exports.default = RoutesController;
//# sourceMappingURL=RoutesController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Entry"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
const moment_1 = __importDefault(require("moment"));
const RoutesControllerActions_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Http/RoutesControllerActions"));
class RoutesController {
    constructor() {
        this.routesControllerActions = new RoutesControllerActions_1.default();
    }
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
        const userCanVote = await this.routesControllerActions.getUserTodaysEntries({ user });
        if (userCanVote.length == 0) {
            return inertia.render('NoParticipation', { user: user });
        }
        const earliestEntry = await this.routesControllerActions.getTodaysEarliestEntry();
        let earliestJson = {};
        if (earliestEntry) {
            earliestJson = await new Promise(async (resolve, _reject) => {
                let serializedEarliest = earliestEntry?.serialize();
                earliestEntry.pose_file &&
                    (serializedEarliest.pose_file_signed_url =
                        await earliestEntry.pose_file_model.presignedUrl());
                earliestEntry.tracker_file &&
                    (serializedEarliest.tracker_file_signed_url =
                        await earliestEntry.tracker_file_model.presignedUrl());
                resolve(serializedEarliest);
            });
        }
        const entriesToVoteOn = await this.routesControllerActions.getUsersEntriesToVoteOn({ user });
        return inertia.render('Vote', {
            user: user,
            entriesToVoteOn: entriesToVoteOn,
            earliestEntry: earliestJson,
        });
    }
    async getLeaderBoardView({ auth, inertia }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        const users = await User_1.default.all();
        const userswithEntries = await Promise.all(users.map(async (user) => {
            let serialized = user.serialize();
            const entries = await this.routesControllerActions.getValidatedEntries({ user });
            serialized.entries = entries;
            serialized.hasEntries = true;
            entries.length == 0 && (serialized.hasEntries = false);
            return serialized;
        }));
        return inertia.render('Leaderboard', { user: user, userswithEntries: userswithEntries });
    }
    async getDashboardView({ auth, inertia }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        const weeksEntries = await this.routesControllerActions.getUserThisWeeksEntries({ user });
        const entriesToVoteOn = await this.routesControllerActions.getUsersEntriesToVoteOn({ user });
        const earliestEntry = await this.routesControllerActions.getTodaysEarliestEntry();
        let earliestJson = {};
        if (earliestEntry) {
            earliestJson = await new Promise(async (resolve, _reject) => {
                let serializedEarliest = earliestEntry?.serialize();
                earliestEntry.pose_file &&
                    (serializedEarliest.pose_file_signed_url =
                        await earliestEntry.pose_file_model?.presignedUrl());
                earliestEntry.tracker_file &&
                    (serializedEarliest.tracker_file_signed_url =
                        await earliestEntry.tracker_file_model?.presignedUrl());
                resolve(serializedEarliest);
            });
        }
        const weeksEntriesJson = await Promise.all(weeksEntries &&
            weeksEntries.map(async (entry) => {
                let serialized = entry.serialize();
                entry?.pose_file && (await entry.load('pose_file_model'));
                entry?.tracker_file && (await entry.load('tracker_file_model'));
                entry.pose_file &&
                    (serialized.pose_file_signed_url = await entry.pose_file_model.presignedUrl());
                entry.tracker_file &&
                    (serialized.tracker_file_signed_url = await entry.tracker_file_model.presignedUrl());
                return serialized;
            }));
        return inertia.render('Home', {
            user: user,
            entries: weeksEntriesJson,
            entriesToVoteOn: entriesToVoteOn,
            earliestEntry: earliestJson,
        });
    }
    async entryShareCard({ request, response }) {
        if (!request.params().id) {
            return response.redirect('/');
        }
        const entry = await Entry_1.default.query().where('id', request.params().id).preload('user').first();
        if (!entry) {
            return response.redirect('/');
        }
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
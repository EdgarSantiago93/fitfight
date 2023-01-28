"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const moment_1 = __importDefault(require("moment"));
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
            .where('created_at', '<=', eow);
        const weeksEntriesJson = weeksEntries && weeksEntries.map((entry) => entry.serialize());
        return inertia.render('Home', { user: user, entries: weeksEntriesJson });
    }
}
exports.default = RoutesController;
//# sourceMappingURL=RoutesController.js.map
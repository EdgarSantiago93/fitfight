"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
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
        return inertia.render('Home', { user: user });
    }
}
exports.default = RoutesController;
//# sourceMappingURL=RoutesController.js.map
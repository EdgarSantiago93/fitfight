"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogoutAction {
    async handle({ auth, response }) {
        await auth.use('web').logout();
        response.redirect('/login');
    }
}
exports.default = LogoutAction;
//# sourceMappingURL=LogoutAction.js.map
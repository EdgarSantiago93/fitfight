"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogoutController {
    async handle({ auth, response }) {
        await auth.use('web').logout();
        response.redirect('/login');
    }
}
exports.default = LogoutController;
//# sourceMappingURL=LogoutController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
class AttemptLoginAction {
    async handle({ auth, request, response }) {
        const email = request.input('email');
        const password = request.input('password');
        const user = await User_1.default.query().where('email', email).firstOrFail();
        if (!(await Hash_1.default.verify(user.password, password))) {
            return response.unprocessableEntity('Password incorrecto');
        }
        console.log('Passed verification');
        await auth.use('web').attempt(email, password);
        return response.json({
            success: true,
        });
    }
}
exports.default = AttemptLoginAction;
//# sourceMappingURL=AttemptLoginAction.js.map
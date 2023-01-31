"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vote_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Vote"));
class VoteOnEntryAction {
    async handle({ auth, request, response }) {
        await auth.use('web').authenticate();
        const user = auth.use('web').user;
        await Vote_1.default.updateOrCreate({
            user_id: user.id,
            entry_id: request.input('entry_id'),
        }, {
            type: request.input('type'),
        });
        return response.json({ success: true });
    }
}
exports.default = VoteOnEntryAction;
//# sourceMappingURL=VoteOnEntryAction.js.map
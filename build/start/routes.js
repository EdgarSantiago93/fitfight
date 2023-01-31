"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/login', 'RoutesController.getLoginView');
Route_1.default.get('/entry/:id', 'RoutesController.entryShareCard');
Route_1.default.get('/logout', 'LogoutAction');
Route_1.default.post('/login', 'AttemptLoginAction');
Route_1.default.group(() => {
    Route_1.default.get('/', 'RoutesController.getDashboardView');
    Route_1.default.get('/lb', 'RoutesController.getLeaderBoardView');
    Route_1.default.get('/vote', 'RoutesController.getVotingView');
    Route_1.default.get('/cal', 'RoutesController.getVotingView');
    Route_1.default.post('/get_media_token', 'GetUploadTokenAction');
    Route_1.default.post('/get_signed_url', 'GetPresignedURL.apiHandle');
    Route_1.default.post('/create_entry', 'SaveEntryAction');
    Route_1.default.post('/vote_on_entry', 'VoteOnEntryAction');
}).middleware('auth');
//# sourceMappingURL=routes.js.map
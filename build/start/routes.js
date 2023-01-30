"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/login', 'RoutesController.getLoginView');
Route_1.default.get('/logout', 'LogoutController');
Route_1.default.post('/login', 'AttemptLoginController');
Route_1.default.get('/', 'RoutesController.getDashboardView').middleware('auth');
Route_1.default.get('/lb', 'RoutesController.getLeaderBoardView').middleware('auth');
Route_1.default.get('/vote', 'RoutesController.getVotingView').middleware('auth');
Route_1.default.get('/cal', 'RoutesController.getVotingView').middleware('auth');
Route_1.default.post('/get_media_token', 'GetUploadToken').middleware('auth');
Route_1.default.post('/get_signed_url', 'GetPresignedURL.apiHandle').middleware('auth');
Route_1.default.post('/create_entry', 'SaveEntry').middleware('auth');
//# sourceMappingURL=routes.js.map
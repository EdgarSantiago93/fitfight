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
//# sourceMappingURL=routes.js.map
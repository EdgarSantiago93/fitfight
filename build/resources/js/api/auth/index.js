"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const __1 = require("../");
const login = async (data) => {
    return __1.instance
        .post('/login', data)
        .then((response) => {
        return response.data;
    });
};
exports.login = login;
//# sourceMappingURL=index.js.map
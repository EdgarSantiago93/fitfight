"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteOnEntry = void 0;
const __1 = require("../");
const voteOnEntry = async (data) => {
    return __1.instance.post('/vote_on_entry', data).then((response) => {
        return response.data;
    });
};
exports.voteOnEntry = voteOnEntry;
//# sourceMappingURL=index.js.map
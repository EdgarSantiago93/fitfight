"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntry = void 0;
const __1 = require("../");
const createEntry = async (data) => {
    return __1.instance.post('/create_entry', data).then((response) => {
        return response.data;
    });
};
exports.createEntry = createEntry;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
class Awardpoints extends standalone_1.BaseCommand {
    async run() {
        this.logger.info('Hello world!');
    }
}
exports.default = Awardpoints;
Awardpoints.commandName = 'awardpoints';
Awardpoints.description = '';
Awardpoints.settings = {
    loadApp: true,
    stayAlive: false,
};
//# sourceMappingURL=Awardpoints.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const moment_1 = __importDefault(require("moment"));
class Awardpoints extends standalone_1.BaseCommand {
    async run() {
        this.logger.info('Hello world!');
        const { default: Entry } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Models/Entry')));
        const yesterday = (0, moment_1.default)().utcOffset(-6).subtract(1, 'days');
        console.log('OFFSEEET', yesterday.format());
        this.logger.info('Yesterday was: ' + yesterday.format());
        const entriesForTheDay = await Entry.query()
            .whereNot('status', 'validated')
            .where('is_rest_day', false)
            .where('created_at', '>=', yesterday.startOf('day').format())
            .where('created_at', '<=', yesterday.endOf('day').format());
        this.logger.info('Awarding points to users for: ' + yesterday.format('YYYY-MM-DD'));
        console.log(entriesForTheDay.length);
        for (const entry of entriesForTheDay) {
            const votes = await entry.related('votes').query();
            const votesFor = votes.filter((vote) => vote.type === 'for');
            const votesAgainst = votes.filter((vote) => vote.type === 'against');
            this.logger.info('Entry: ' + entry.id + ' has ' + votesFor.length + ' votes for');
            this.logger.info('Entry: ' + entry.id + ' has ' + votesAgainst.length + ' votes against');
            if (votesFor.length > votesAgainst.length ||
                (votesFor.length == 0 && votesAgainst.length == 0)) {
                this.logger.success('Entry: ' + entry.id + ' was validated');
                entry.status = 'validated';
                entry.is_validated = true;
                await entry.save();
            }
            if (votesFor.length === votesAgainst.length) {
                this.logger.action('Entry: ' + entry.id + ' was a tie');
                entry.status = 'validated';
                entry.is_validated = true;
                await entry.save();
            }
            if (votesFor.length < votesAgainst.length) {
                this.logger.error('Entry: ' + entry.id + ' was rejected');
                entry.status = 'rejected';
                entry.is_validated = false;
                await entry.save();
            }
            this.logger.info('');
        }
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
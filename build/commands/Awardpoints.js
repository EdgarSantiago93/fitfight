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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const moment_1 = __importDefault(require("moment"));
class Awardpoints extends standalone_1.BaseCommand {
    async run() {
        this.logger.info('->FITFIGHT<-');
        const { default: Entry } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Models/Entry')));
        let yesterday = (0, moment_1.default)().utcOffset(-6).subtract(1, 'days');
        if ((0, moment_1.default)().utcOffset(-6).hour() === 0 ||
            (0, moment_1.default)().utcOffset(-6).hour() === 1 ||
            this.forceUpdate) {
            if (this.forceUpdate) {
                this.logger.info('Running awardpoints with forced flag');
            }
            if (this.day) {
                this.logger.info('Running awardpoints with day flag');
                yesterday = (0, moment_1.default)(this.day.toString());
            }
            this.logger.info('Yesterday was: ' + yesterday.format());
            const entriesForTheDay = await Entry.query()
                .whereNot('status', 'validated')
                .whereNot('status', 'forced_rest')
                .where('is_rest_day', false)
                .where('created_at', '>=', yesterday.startOf('day').format())
                .where('created_at', '<=', yesterday.endOf('day').format());
            this.logger.info('Awarding points to users for: ' + yesterday.format('YYYY-MM-DD'));
            this.logger.info(entriesForTheDay.length.toString());
            for (const entry of entriesForTheDay) {
                const votes = await entry.related('votes').query();
                const votesFor = votes.filter((vote) => vote.type === 'for');
                const votesAgainst = votes.filter((vote) => vote.type === 'against');
                this.logger.info('Entry: ' + entry.id + ' has ' + votesFor.length + ' votes for');
                this.logger.info('Entry: ' + entry.id + ' has ' + votesAgainst.length + ' votes against');
                if (votesFor.length > votesAgainst.length ||
                    (votesFor.length === 0 && votesAgainst.length === 0)) {
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
        else {
            this.logger.info('Not running awardpoints');
            this.logger.info('Current hour: ' + (0, moment_1.default)().utcOffset(-6).hour());
            return;
        }
    }
}
Awardpoints.commandName = 'awardpoints';
Awardpoints.description = 'Award points to users for the day';
Awardpoints.settings = {
    loadApp: true,
    stayAlive: false,
};
__decorate([
    standalone_1.flags.boolean({ alias: 'f', description: 'force' }),
    __metadata("design:type", Boolean)
], Awardpoints.prototype, "forceUpdate", void 0);
__decorate([
    standalone_1.flags.string({ alias: 'd', description: 'day' }),
    __metadata("design:type", String)
], Awardpoints.prototype, "day", void 0);
exports.default = Awardpoints;
//# sourceMappingURL=Awardpoints.js.map
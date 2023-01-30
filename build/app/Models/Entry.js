"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const uuid_1 = require("uuid");
const Media_1 = __importDefault(require("./Media"));
const Vote_1 = __importDefault(require("./Vote"));
const User_1 = __importDefault(require("./User"));
class Entry extends Orm_1.BaseModel {
    static assignUuid(entry) {
        entry.id = (0, uuid_1.v4)();
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Entry.prototype, "id", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        serialize: (value) => {
            return { day: value?.day, month: value?.month, year: value?.year };
        },
    }),
    __metadata("design:type", luxon_1.DateTime)
], Entry.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Entry.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.column)({
        serializeAs: null,
    }),
    __metadata("design:type", String)
], Entry.prototype, "pose_file", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Entry.prototype, "calories", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Entry.prototype, "type", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Entry.prototype, "minutes", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Entry.prototype, "is_validated", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Entry.prototype, "is_rest_day", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Entry.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)({
        serializeAs: null,
    }),
    __metadata("design:type", String)
], Entry.prototype, "tracker_file", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Media_1.default, {
        foreignKey: 'id',
        localKey: 'tracker_file',
    }),
    __metadata("design:type", Object)
], Entry.prototype, "tracker_file_model", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Media_1.default, {
        foreignKey: 'id',
        localKey: 'pose_file',
    }),
    __metadata("design:type", Object)
], Entry.prototype, "pose_file_model", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Vote_1.default, {
        foreignKey: 'entry_id',
    }),
    __metadata("design:type", Object)
], Entry.prototype, "votes", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Entry.prototype, "user_id", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, {
        foreignKey: 'user_id',
        localKey: 'id',
    }),
    __metadata("design:type", Object)
], Entry.prototype, "user", void 0);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Entry]),
    __metadata("design:returntype", void 0)
], Entry, "assignUuid", null);
exports.default = Entry;
//# sourceMappingURL=Entry.js.map
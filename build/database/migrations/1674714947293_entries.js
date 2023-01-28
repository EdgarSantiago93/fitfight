"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'entries';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.uuid('user_id').nullable();
            table.uuid('pose_file').nullable();
            table.uuid('tracker_file').nullable();
            table.string('calories', 255).nullable();
            table.string('minutes', 255).nullable();
            table.boolean('is_validated').defaultTo(false);
            table.string('status', 255).defaultTo('pending');
            table.boolean('is_rest_day').defaultTo(false);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
        this.schema.alterTable('entries', (table) => {
            table.foreign('user_id', 'id').references('users.id');
            table.foreign('pose_file').references('media.id');
            table.foreign('tracker_file').references('media.id');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1674714947293_entries.js.map
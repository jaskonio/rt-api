"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Race = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const raceSchema = new mongoose_1.default.Schema({
    processed: {
        type: Boolean,
        required: true
    },
    day_celebrate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    collection_name: {
        type: String,
        required: true
    },
});
raceSchema.statics.build = (attr) => {
    return new Race(attr);
};
const Race = mongoose_1.default.model('Races', raceSchema);
exports.Race = Race;
//# sourceMappingURL=raceModel.js.map
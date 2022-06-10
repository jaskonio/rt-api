"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewRaceEntry = void 0;
const toNewRaceEntry = (object) => {
    const newEntry = {
        name: object.name,
        collection_name: object.collection_name,
        day_celebrate: object.day_celebrate,
        processed: object.processed,
        url: object.url
    };
    return newEntry;
};
exports.toNewRaceEntry = toNewRaceEntry;
exports.default = exports.toNewRaceEntry;
//# sourceMappingURL=utils.js.map
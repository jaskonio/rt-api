"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRace = exports.addRace = exports.findByRaces = exports.getRaces = void 0;
const races_1 = __importDefault(require("./races"));
const races = races_1.default;
const getRaces = () => races;
exports.getRaces = getRaces;
const findByRaces = (race_id) => {
    const race = races.find(race => race._id === race_id);
    return race;
};
exports.findByRaces = findByRaces;
const addRace = (newRaceEntry) => {
    const newRace = Object.assign({ _id: Math.max(...races.map(race => race._id)) + 1 }, newRaceEntry);
    races.push(newRace);
    return newRace;
};
exports.addRace = addRace;
const updateRace = () => null;
exports.updateRace = updateRace;
//# sourceMappingURL=racesServices.js.map
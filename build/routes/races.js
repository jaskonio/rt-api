"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const raceModel_1 = require("../models/raceModel");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Get all');
        const races = yield raceModel_1.Race.find({});
        res.send(races);
    }
    catch (e) {
        res.status(404).send(e);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Get by race');
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" });
        return;
    }
    const race = yield raceModel_1.Race.findById(id);
    res.send(race);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Save race');
        const { processed, day_celebrate, name, url, collection_name } = req.body;
        const newrace = raceModel_1.Race.build({ processed, day_celebrate, name, url, collection_name });
        yield newrace.save();
        res.json(newrace);
    }
    catch (e) {
        res.status(404).send(e);
    }
}));
router.put('/:id', (req, res) => {
    console.log('update race');
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" });
        return;
    }
    const { processed, day_celebrate, name, url, collection_name } = req.body;
    raceModel_1.Race.findById(id, function (err, doc) {
        console.log(err);
        console.log(doc);
        if (err)
            throw res.status(404).send(err);
        if (doc == null) {
            res.status(404).send({ message: "no data exist for this id" });
            return;
        }
        doc.updateOne({ processed, day_celebrate, name, url, collection_name }, function (err, result) {
            console.log(err);
            console.log(result);
            if (err)
                throw err;
            res.json(result);
        });
    });
});
router.delete('/:id', (req, res) => {
    console.log('delete race');
    const id = req.params.id;
    raceModel_1.Race.deleteOne({ id: id }, function (err) {
        console.log(err);
        if (err)
            throw err;
        res.status(200).send();
    });
});
router.post('/process/all', (_req, res) => {
    res.send('process all Race');
});
router.post('/process/:id', (_req, res) => {
    res.send('proces by Race');
});
exports.default = router;
//# sourceMappingURL=races.js.map
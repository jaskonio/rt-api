"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const races_1 = __importDefault(require("./routes/races"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('Date: ' + new Date().toLocaleDateString());
    res.send('Pong!');
});
app.use('/api/races', races_1.default);
app.use(logErrors);
app.use(errorHandler);
function logErrors(err, _req, _res, next) {
    console.error("logErrors");
    console.error(err.stack);
    next(err);
}
function errorHandler(err, _req, res, _next) {
    console.error("errorHandler");
    res.status(500).send({ error: err });
}
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
});
const uri = "mongodb+srv://jaskonio:jASKONIO.1994@cluster0.9fbetb1.mongodb.net/test-jaskonio";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to database');
    }
});
//# sourceMappingURL=index.js.map
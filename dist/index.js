"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config"));
var app = (0, express_1.default)();
var routes_1 = __importDefault(require("./routes"));
app.use('/', routes_1.default);
app.listen(config_1.default.port, function () {
    console.log("Application is running on port " + config_1.default.port + ".");
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http = __importStar(require("http"));
var config_1 = __importDefault(require("./config"));
var socketServer_1 = require("./modules/socketServer");
var socketClient_1 = require("./modules/socketClient");
var discordBot_1 = require("./modules/discordBot");
var routes_1 = __importDefault(require("./routes"));
var discord_1 = __importDefault(require("./routes/discord"));
var app = (0, express_1.default)();
var server = http.createServer(app);
// configure the socketIO
(0, socketServer_1.initializeSocket)(server);
(0, discordBot_1.initializeBot)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// routings
app.use('/discord', discord_1.default);
app.use('/', routes_1.default);
// store internal socket client as app local variable.
app.locals.internalSocket = socketClient_1.internalSocket;
server.listen(config_1.default.port, function () {
    console.log("The server is running on port " + config_1.default.port + ".");
});

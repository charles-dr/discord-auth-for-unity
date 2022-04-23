"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalSocket = void 0;
var socket_io_client_1 = require("socket.io-client");
var config_1 = __importDefault(require("../config"));
var constants_1 = require("../constants");
exports.internalSocket = (0, socket_io_client_1.io)("http://localhost:" + config_1.default.port);
exports.internalSocket.on('connect', function () {
    console.log('[internal] connected', exports.internalSocket.id);
});
exports.internalSocket.on(constants_1.SocketEvent.AUTHORIZE, function (args) {
    console.log('[Internal] authorize', args);
});

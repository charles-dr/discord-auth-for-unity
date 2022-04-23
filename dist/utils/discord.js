"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRedirectUrl = exports.getGuildList = exports.getOAuth2Token = void 0;
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
var config_1 = __importDefault(require("../config"));
var getOAuth2Token = function (code, socketId) {
    var data = {
        client_id: config_1.default.discord.clientId,
        client_secret: config_1.default.discord.clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: (0, exports.getAuthRedirectUrl)(socketId),
        scope: config_1.default.discord.scopes.join(' '),
    };
    return (0, axios_1.default)({
        method: 'post',
        url: 'https://discordapp.com/api/v6/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs_1.default.stringify(data),
    })
        .then(function (res) { return res.data; })
        .then(function (res) { return res.access_token; });
};
exports.getOAuth2Token = getOAuth2Token;
var getGuildList = function (token) {
    return (0, axios_1.default)({
        method: 'GET',
        url: 'https://discordapp.com/api/v6/users/@me/guilds',
        headers: {
            Authorization: "Bearer " + token,
        }
    })
        .then(function (res) { return res.data; });
};
exports.getGuildList = getGuildList;
var getAuthRedirectUrl = function (socketId) {
    return "http://localhost:" + config_1.default.port + "/discord/authorize/" + socketId;
};
exports.getAuthRedirectUrl = getAuthRedirectUrl;

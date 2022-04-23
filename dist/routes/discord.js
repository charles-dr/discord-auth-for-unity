"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import { Validator } from 'node-input-validator';
var config_1 = __importDefault(require("../config"));
var constants_1 = require("../constants");
var discord_1 = require("../utils/discord");
var discordBot_1 = require("../modules/discordBot");
var router = express_1.default.Router();
router.route('/check-user-in/:userId').get(function (req, res) {
    return (0, discordBot_1.checkUserInCommunity)(req.params.userId)
        .then(function (user) {
        return res.json({
            status: true,
            user: user,
        });
    })
        .catch(function (error) {
        return res.json({
            status: false,
            message: error.message,
            user: null,
        });
    });
});
router.route('/authorize/:socketId').get(function (req, res) {
    var authorizationCode = req.query.code;
    var socketId = req.params.socketId;
    var socketClient = req.app.locals.internalSocket;
    return (0, discord_1.getOAuth2Token)(authorizationCode, socketId)
        .then(function (token) { return (0, discord_1.getGuildList)(token); })
        .then(function (guilds) {
        var guild = guilds.find(function (g) { return g.id === config_1.default.discord.communityServerId; });
        if (!guild) {
            throw new Error('You are not the member of the community server!');
        }
        // process success response
        // to-do: database or session process.
        socketClient.emit(constants_1.SocketEvent.INTERNAL_AUTHORIZE, {
            status: true,
            socketId: socketId,
        });
        res.send("\n        <html>\n          <head><title>Authorization</title></head>\n          <body>\n            <h3>Success</h3>\n          </body>\n        </html>\n      ");
    })
        .catch(function (error) {
        // response to the unity application.
        socketClient.emit(constants_1.SocketEvent.INTERNAL_AUTHORIZE, {
            status: false,
            message: error.message,
            socketId: socketId,
        });
        // response to the browser.
        res.send("\n      <html>\n        <head><title>Authorization</title></head>\n        <body>\n          <h3>Authorization Failed!</h3>\n          <p>message: " + error.message + "</p>\n        </body>\n      </html>\n    ");
    });
});
/**
 * @description generate an authorization url according to the socket Id.
 * @param { string } socketId the ID of the unity application socket Id.
 * @returns { string } authorization url
 */
router.route('/generate-url').post(function (req, res) {
    var socketId = req.body.socketId;
    var redirectUri = (0, discord_1.getAuthRedirectUrl)(socketId);
    var url = "https://discord.com/api/oauth2/authorize?client_id=" + config_1.default.discord.clientId + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&response_type=code&scope=" + config_1.default.discord.scopes.join('%20');
    // https://discord.com/api/oauth2/authorize?client_id=695192092061859850&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauthorize%2FW56TQTarRltevOnvAAAB&response_type=code&scope=guilds%20identify
    // https://discord.com/api/oauth2/authorize?client_id=695192092061859850&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauthorize%2F814uX2p32DgQ-3DsAAAB&response_type=code&scope=identity%20guilds
    res.json({ url: url });
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__error = void 0;
function __error(res, error, statusCode) {
    if (statusCode === void 0) { statusCode = 400; }
    res.status(400).json({
        status: false,
        message: error.message,
        details: error.details || [],
    });
}
exports.__error = __error;

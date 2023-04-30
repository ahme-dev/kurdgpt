"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = exports.env = void 0;
var ts_dotenv_1 = require("ts-dotenv");
var schema = {
    BOT_TOKEN: String,
    AI_KEY: String,
    TRANSL_KEY: String,
    DB_URL: String,
    DB_NAME: String,
    DB_PASS: String,
    DB_USER: String,
    DB_PORT: Number,
};
// import env variables
function loadEnv() {
    exports.env = (0, ts_dotenv_1.load)(schema);
}
exports.loadEnv = loadEnv;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var env_1 = require("./env");
var middleware_1 = require("./middleware");
var handlers_1 = require("./handlers");
var pg_1 = require("@telegraf/session/pg");
var utils_1 = require("./utils");
// load env variables
(0, env_1.loadEnv)();
// make the bot
var bot = new telegraf_1.Telegraf(env_1.env.BOT_TOKEN);
// connect db for session
var store = (0, pg_1.Postgres)({
    host: env_1.env.DB_URL,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASS,
    database: env_1.env.DB_NAME,
    port: env_1.env.DB_PORT,
    config: {
        ssl: true,
    },
});
bot.use((0, telegraf_1.session)({
    store: store,
    defaultSession: function () { return ({
        dailyMessages: 4,
        messagesLeft: 4,
        lastDate: (0, utils_1.getToday)(),
    }); },
}));
bot.use(middleware_1.logRequests, middleware_1.limitRequests);
// add handlers
bot.start(handlers_1.handleStart);
bot.on("message", handlers_1.handleMessage);
bot.catch(handlers_1.handleErrors);
// launch the bot
bot.launch();
// for shutdown
process.once("SIGINT", function () { return bot.stop("SIGINT"); });
process.once("SIGTERM", function () { return bot.stop("SIGTERM"); });

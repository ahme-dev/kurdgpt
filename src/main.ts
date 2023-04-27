import { Telegraf } from "telegraf";
import { env, loadEnv } from "./env";
import { logRequests } from "./middleware";
import { handleErrors, handleMessage, handleStart } from "./handlers";

// load env variables
loadEnv();

// make the bot
const bot = new Telegraf(env.BOT_TOKEN);

// add middleware
bot.use(logRequests);

// add handlers
bot.start(handleStart);
bot.on("message", handleMessage);
bot.catch(handleErrors);

// launch the bot
bot.launch();

// for shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

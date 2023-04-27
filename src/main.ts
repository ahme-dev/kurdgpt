import { Telegraf, session } from "telegraf";
import { env, loadEnv } from "./env";
import { limitRequests, logRequests } from "./middleware";
import { handleErrors, handleMessage, handleStart } from "./handlers";
import { ContextExt } from "./types";

// load env variables
loadEnv();

// make the bot
const bot = new Telegraf<ContextExt>(env.BOT_TOKEN);

bot.use(session({ defaultSession: () => ({ count: 0 }) }));
bot.use(logRequests, limitRequests);

// add handlers
bot.start(handleStart);
bot.on("message", handleMessage);
bot.catch(handleErrors);

// launch the bot
bot.launch();

// for shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

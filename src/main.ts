import { Telegraf, session } from "telegraf";
import { env, loadEnv } from "./env";
import { limitRequests, logRequests } from "./middleware";
import { handleErrors, handleMessage, handleStart } from "./handlers";
import { ContextExt } from "./types";
import { Postgres } from "@telegraf/session/pg";

// load env variables
loadEnv();

// make the bot
const bot = new Telegraf<ContextExt>(env.BOT_TOKEN);

// connect db for session
const store = Postgres<{}>({
	host: env.DB_URL,
	user: env.DB_USER,
	password: env.DB_PASS,
	database: env.DB_NAME,
	port: env.DB_PORT,
	config: {
		ssl: true,
	},
});

bot.use(
	session({
		store,
		defaultSession: () => ({
			requestCount: 0,
		}),
	}),
);
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

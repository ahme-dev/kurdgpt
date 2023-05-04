import { env, loadEnv } from "./env";
import { limitRequests, logRequests } from "./middleware";
import { handleErrors, handleMessage, handleStart } from "./handlers";
import { ContextExt } from "./types";
import { getToday } from "./utils";
import { Bot, session } from "grammy";

// load env variables
loadEnv();

// make the bot
const bot = new Bot<ContextExt>(env.BOT_TOKEN);

bot.use(
	session({
		initial: () => ({
			dailyMessages: 4,
			lastDate: getToday(),
			messagesLeft: 4,
		}),
	}),
);

bot.use(logRequests, limitRequests);

// add handlers
bot.command("start", handleStart);
bot.on("message", handleMessage);
bot.catch(handleErrors);

// launch the bot
bot.start({
	onStart: () => console.log("bot started!"),
});

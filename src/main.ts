import { env, loadEnv } from "./env";
import { limitRequests, logRequests } from "./middleware";
import { handleErrors, handleMessage, handleStart } from "./handlers";
import { ContextExt } from "./types";
import { getToday } from "./utils";
import { Bot, Context, session } from "grammy";
import { PsqlAdapter } from "@grammyjs/storage-psql";
import { Client } from "pg";

// load env variables
loadEnv();

async function bootstrap() {
	// connect the database
	const client = new Client({
		connectionString: env.DB_URL,
	});
	await client.connect();

	// make the bot
	const bot = new Bot<ContextExt>(env.BOT_TOKEN);

	bot.use(
		session({
			initial: () => ({
				dailyMessages: 4,
				lastDate: getToday(),
				messagesLeft: 4,
			}),
			getSessionKey: (ctx: Context) => ctx.from?.id.toString(),
			storage: await PsqlAdapter.create({ tableName: "sessions", client }),
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
}

bootstrap();

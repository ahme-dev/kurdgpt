import { env, loadEnv } from "./env";
import { limitRequests, logRequests } from "./middleware";
import { handleErrors, handleMessage, handleStart } from "./handlers";
import { ContextExt, SessionData } from "./types";
import { getToday } from "./utils";
import { Bot, Context, session } from "grammy";
import { PsqlAdapter } from "@grammyjs/storage-psql";
import { Client } from "pg";
import { UserFromGetMe } from "grammy/types";
import { DAILY_MESSAGE_LIMIT } from "./constants";

// load env variables
loadEnv();

// encapsulates all the bot logic
async function beginBotProcess() {
	// connect the database
	const client = new Client({
		connectionString: env.DATABASE_URL,
	});

	// catch database connection errors
	try {
		await client.connect();
	} catch (e: unknown) {
		console.log(`error connecting to database :: ${JSON.stringify(e)}`);
		process.exit(1);
	}

	// log database connection
	console.log("database connected :: using", client.database);

	// make the bot
	const bot = new Bot<ContextExt>(env.BOT_TOKEN);

	// add session middleware for storing user data
	bot.use(
		session({
			initial: () =>
				({
					dailyMessages: DAILY_MESSAGE_LIMIT,
					lastDate: getToday(),
					messagesLeft: DAILY_MESSAGE_LIMIT,
					conversation: [],
				} satisfies SessionData),
			getSessionKey: (ctx: Context) => ctx.from?.id.toString(),
			storage: await PsqlAdapter.create({ tableName: "sessions", client }),
		}),
	);

	// add middleware for logging and limiting requests
	bot.use(logRequests, limitRequests);

	// add handlers
	bot.command("start", handleStart);
	bot.on("message", handleMessage);
	bot.catch(handleErrors);

	// start the bot
	bot.start({
		onStart: (info: UserFromGetMe) =>
			console.log(`bot started :: using ${info.username}`),
	});
}

beginBotProcess();

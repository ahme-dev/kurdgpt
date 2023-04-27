import { load } from "ts-dotenv";
import { Telegraf } from "telegraf";
import { translateToEnglish, translateToKurdish } from "./translation";
import { promptAI } from "./ai";

// import env variables
const env = load({
	BOT_TOKEN: String,
	AI_KEY: String,
	TRANSL_KEY: String,
	DB_CON: String,
});

// make the bot

const bot = new Telegraf(env.BOT_TOKEN);

// handler for /start command

bot.start((ctx) =>
	ctx.reply(
		"بەخێربێیت بۆ بۆتی کورد جی پی تی!\nتکایە ئاگاداربە کە من تەنها یەک نامەی تۆم بیرئەبێ.",
	),
);

// middleware to time and log requests

bot.use(async (ctx, next) => {
	console.time(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
	await next();
	console.timeEnd(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
});

// handler for messages from users

bot.on("message", async (ctx) => {
	// translate user message to english
	const messageInEnglish = await translateToEnglish(ctx.message.text);

	// prompt the ai with the message
	const replyMessage = await promptAI(
		messageInEnglish,
		ctx.from?.id?.toString(),
	);

	// translate the reply to kurdish
	const replyInKurdish = await translateToKurdish(replyMessage);

	// send the reply to the user
	await ctx.reply(replyInKurdish);
});

// catch all errors

bot.catch(async (err, ctx) => {
	console.log("error :: ", JSON.stringify(err));
	await ctx.reply("زۆر ببورە! کێشەیەکم بۆ دروستبووە");
});

// launch the bot

bot.launch();

// for shutdown

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
